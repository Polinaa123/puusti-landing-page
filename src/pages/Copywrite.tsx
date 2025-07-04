import React, {useState} from 'react';
import {parseSection} from '@/lib/utils';

type Platform = 'airbnb' | 'booking' | 'own'

export default function CopywritePage() {
    const [platform, setPlatform]= useState<Platform>('airbnb')
    const [listingTitle, setListingTitle] = useState('')
    const [listingDesc, setListingDesc] = useState('')
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState<string | null>(null);
    const [result, setResult]= useState<string | null>(null);


    const handleManualReview = async () => {
        if (!result) return
        try {
          const resp = await fetch(
            'http://localhost:5001/puusti-waitlist/us-central1/manualReview',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ platform, listing: `${listingTitle}\n${listingDesc}`, result }),
            }
          )
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
          alert('request sent for manual review')
        } catch (e) {
          console.error(e)
          alert('error in manual review request')
        }
      }

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        setResult(null)
        try {
          const resp = await fetch(
            'http://localhost:5001/puusti-waitlist/us-central1/copywrite',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                platform,
                listing: `${listingTitle}\n\n${listingDesc}`,
                services: ['title', 'description'],
              }),
            }
          )
          const data = await resp.json()
          if (!resp.ok || !data.success) {
            throw new Error(data.error || `HTTP ${resp.status}`)
          }
          setResult(data.result)
        } catch (e: unknown) {
          console.error(e)
          setError(e instanceof Error ? e.message : 'Unknown error')
        } finally {
          setLoading(false)
        }
      }

    return(
        <div className="flex flex-col h-screen bg-gray-100 rounded-xl font-mono">
            <div className="flex-1 overflow-auto">
                {result && (
                    <div id="copywrite-result" className="bg-white p-8 mx-auto mt-8 shadow-md w-full max-w-4xl">
                        <section className="mb-6">
                            <h2 className="text-xl font-bold rounded-xl mb-2">TITLE</h2>
                            <p className= "text-gray-700 rounded-xl text-lg">{parseSection(result, 'Title')}</p>
                        </section>
                        <section className="mb-6">
                            <h2 className="text-xl font-bold rounded-xl mb-2">DESCRIPTION</h2>
                            <p className="whitespace-pre-wrap rounded-xl text-gray-700 text-lg">
                                {parseSection(result, 'Description')}
                            </p>
                        </section>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-[#3ab54a] rounded-xl text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
                                onClick={() => navigator.clipboard.writeText(result)}
                            >
                                ACCEPT
                            </button>
                            <button
                                className="px-4 py-2 bg-[#3ab54a] rounded-xl text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
                                onClick={handleManualReview}
                            >
                                REQUEST MANUAL REVIEW
                            </button>
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
                                    <option value="booking">Booking.com</option>
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
    )
}