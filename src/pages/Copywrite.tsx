import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import html2pdf from 'html2pdf.js';

type Platform = 'airbnb' | 'booking' | 'own'

interface CopyResult{
    title: string;
    description: string;
}

export default function CopywritePage() {    
    const [platform, setPlatform]= useState<Platform>('airbnb')
    const [listingTitle, setListingTitle] = useState('')
    const [listingDesc, setListingDesc] = useState('')
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState<string | null>(null);
    const [result, setResult]= useState<CopyResult | null>(null);

    const [copyId, setCopyId] = useState<string | null>(null);
    const [status, setStatus] = useState<'pending' | 'accepted' | 'review'>('pending');

    const handleReview = async () => {
        if (!copyId) return;
        try {
            const resp = await fetch('/api/requestReview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: copyId }),
            });

            const body = await resp.json();
            if (!body.ok) {
                throw new Error(body.error || `HTTP ${resp.status}`);
            }
            alert('Email sent!');
        } catch (e) {
            console.error(e);
            alert(e instanceof Error ? e.message : 'Failed to send review email');
        }
    };

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        setResult(null)
        try {
            const resp = await fetch('/api/copywrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    platform,
                    listing: `${listingTitle}\n\n${listingDesc}`
                })
            })
            const raw= await resp.text();
            if (!resp.ok) {
                let msg: string;
                try {
                    const err = JSON.parse(raw) as { error?: string }
                    msg = err.error ?? raw;
                } catch {
                    msg = raw;
                }
                throw new Error(msg);
            }
            type ServerResp= {
                id: string;
                title: string;
                description: string;
                status: 'pending' | 'accepted' | 'review';
            }
            let data: ServerResp
            try {
                data = JSON.parse(raw) as ServerResp;
            } catch {
                throw new Error('Invalid JSON from server')
            }

            setCopyId(data.id);
            setResult({ title: data.title, description: data.description });
            setStatus(data.status);

        } catch (e: unknown) {
          console.error(e)
          setError(e instanceof Error ? e.message : 'Unknown error')
        } finally {
          setLoading(false)
        }
    };

    const handleAccept = async () => {
        if(!copyId) return;
        setLoading(true);
        try{
            const resp= await fetch('/api/acceptCopy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: copyId })
            });
            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(text || `HTTP ${resp.status}`);
            }
            setStatus('accepted');
        } catch (e: unknown){
            console.error(e);
            alert(e instanceof Error ? e.message : 'Failed to accept');
        } finally {
            setLoading(false);
        }
    };

    const downloadPdf = (id: string) => {
        const element = document.getElementById('pdf-content');
        if (!element) {
            console.error('PDF container not found');
            return;
        }
        html2pdf().set({ margin:10, filename: `copy_${id}.pdf`, html2canvas:{scale:2}, jsPDF:{unit: 'mm', format: 'a4', orientation: 'portrait'}}).from(element).save();
    };

    const navigate = useNavigate();

    return(
        <div className="flex flex-col h-screen bg-gray-100 rounded-xl font-mono">
            <div className= "p-4 bg-gray-100">
                <button
                    className= "px-4 py-2 bg-white rounded-xl text-black font-semibold shadow-md transition duration-300"
                    onClick={() => navigate('/')}
                >
                    ← BACK TO HOME
                </button>
            </div>
            <div className="flex-1 overflow-auto">
                {result && (
                    <div className="bg-white p-8 mx-auto mt-8 shadow-md w-full max-w-4xl">
                        <div id="pdf-content">
                            <section className="mb-6">
                                <h2 className="text-xl font-bold rounded-xl mb-2">TITLE</h2>
                                <p className="text-gray-700 rounded-xl text-lg">
                                    {result.title}
                                </p>
                            </section>
                            <section className="mb-6">
                                <h2 className="text-xl font-bold rounded-xl mb-2">DESCRIPTION</h2>
                                <p className="whitespace-pre-wrap rounded-xl text-gray-700 text-lg">
                                    {result.description}
                                </p>
                            </section>
                        </div>
                        <div className="flex justify-end space-x-4">
                            {status === 'pending' && (
                                <>
                                    <button
                                        className="px-4 py-2 bg-[#3ab54a] rounded-xl text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
                                        onClick={handleAccept}
                                        disabled={loading}
                                    >
                                        {loading ? 'ACCEPTING…' : 'ACCEPT'}
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-[#3ab54a] rounded-xl text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
                                        onClick={handleReview}
                                        disabled={loading}
                                    >
                                        {loading ? 'PLEASE WAIT…' : 'REQUEST MANUAL REVIEW'}
                                    </button>
                                </>
                            )}
                            {status === 'accepted' && copyId && (
                                <button
                                    className= "px-4 py-2 bg-[#3ab54a] rounded-xl text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
                                    onClick={() => downloadPdf(copyId)}
                                >
                                    DOWNLOAD PDF
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-gray p-8"></div>
                <div className="w-full max-w-7xl mx-auto pb-8">
                    <div className="flex">
                        <div className="w-1/2 pr-8">
                            <h1 className="text-4xl rounded-xl font-extrabold mb-16">COPYWRITING TOOL</h1>
                            {error && <div className="text-red-600">{error}</div>}
                            <div className= "mb-6">
                                <label className="block text-xl rounded-xl font-semibold mb-2">PLATFORM:</label>
                                <select
                                    className="w-full border rounded-xl border-gray-300 p-3 text-lg focus:ring-2 focus:ring-[#3ab54a] focus:border-transparent"
                                    value={platform}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPlatform(e.target.value as Platform)}
                                >
                                    <option value="airbnb">Airbnb</option>
                                    <option value="own">Own Website</option>
                                </select>
                            </div>
                            <div className= "mb-6">
                                <label className="block text-xl rounded-xl font-semibold mb-2">LISTING TITLE:</label>
                                <input
                                    type="text"
                                    className="w-full border rounded-xl border-gray-300 p-3 text-lg focus:ring-2 focus:ring-[#3ab54a] focus:border-transparent"
                                    value={listingTitle}
                                    onChange={e => setListingTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 pl-8 flex flex-col">
                            <div className="mb-6 mt-8">
                                <label className="block text-xl rounded-xl font-semibold mb-2">LISTING DESCRIPTION:</label>
                                <textarea
                                    className="w-full border rounded-xl border-gray-300 p-3 text-lg focus:ring-2 focus:ring-[#3ab54a] focus:border-transparent"
                                    rows={6}
                                    value={listingDesc}
                                    onChange={e => setListingDesc(e.target.value)}
                                />
                            </div>
                            <button
                                className="mt-6 bg-[#3ab54a] w-full rounded-xl text-white py-2 font-semibold shadow-md hover:bg-green-600 transition duration-300 text-xl"
                                onClick={handleSubmit}
                                disabled={loading || !listingTitle.trim() || !listingDesc.trim()}
                            >
                                {loading ? 'GENERATING...' : 'IMPROVE TEXTS'}
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}