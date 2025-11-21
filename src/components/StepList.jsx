import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function StepList({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/steps?limit=20`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [refreshKey])

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
      <h3 className="text-white font-semibold mb-4">Recent Entries</h3>
      {loading ? (
        <p className="text-slate-300">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-slate-300">No entries yet. Be the first!</p>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.id} className="flex items-center justify-between bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 text-slate-200">
              <div>
                <p className="font-medium text-white">{it.user}</p>
                <p className="text-xs text-slate-400">{new Date(it.date).toLocaleDateString()} {it.note ? `• ${it.note}` : ''}</p>
              </div>
              <p className="text-cyan-300 font-semibold">{it.steps.toLocaleString()} steps</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
