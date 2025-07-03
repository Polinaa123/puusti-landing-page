import React, {useState} from 'react';

interface CopywriteRequest{
    platform: 'airbnb' | 'booking' | 'own';
    listing: string;
    services: Array<'description' | 'title' | 'amenities'>;
}

export default function CopywritePage() {
    const [platform, setPlatform]= useState<CopywriteRequest['platform']>('airbnb');
    const [listing, setListing]= useState('');
    const [services, setServices]= useState<CopywriteRequest['services']>([]);
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState<string | null>(null);
    const [result, setResult]= useState<string | null>(null);


    const toggleServices = (service: CopywriteRequest['services'][number]) => {
        setServices(prev=>
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const resp = await fetch('http://localhost:5001/puusti-waitlist/us-central1/copywrite', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({platform, listing, services}),
            });
            const data = await resp.json();
            if (!data.success) {
                setError(data.error || 'Unknown error');
            } else {
                setResult(data.result);
            }
        } catch {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">Copywriting Tool</h1>
            <div>
                <label className="block mb-1">Platform:</label>
                <select
                    className="w-full border rounded p-2"
                    value={platform}
                    onChange={e => setPlatform(e.target.value as CopywriteRequest['platform'])}
                >
                    <option value="airbnb">Airbnb</option>
                    <option value="booking">Booking.com</option>
                    <option value="own">Own Website</option>
                </select>
            </div>

            <div>
                <label className="block mb-1">Listing URL or Text:</label>
                <textarea
                    className="w-full border rounded p-2"
                    rows={4}
                    value={listing}
                    onChange= {e=> setListing(e.target.value)}
                />
            </div>

            <div className="flex space-x-4">
                {(['description', 'title', 'amenities'] as CopywriteRequest['services']).map(svc => (
                    <label key={svc} className="inline-flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={services.includes(svc)}
                            onChange={() => toggleServices(svc)}
                        />
                        <span className="capitalize">{svc}</span>
                    </label>
                ))}
            </div>

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={ loading || !listing.trim() || services.length === 0}
                onClick={handleSubmit}
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>

            {error && <div className="text-red-600">{error}</div>}
            {result && (
                <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                    {result}
                </pre>
            )}
        </div>
    );
}