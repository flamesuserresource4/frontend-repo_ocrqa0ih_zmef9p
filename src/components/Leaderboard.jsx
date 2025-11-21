import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Leaderboard({ refreshKey }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/leaderboard?limit=5`)
        const data = await res.json()
        setRows(data)
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
      <h3 className="text-white font-semibold mb-4">Leaderboard</h3>
      {loading ? (
        <p className="text-slate-300">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="text-slate-300">No data yet.</p>
      ) : (
        <ol className="space-y-2">
          {rows.map((r, i) => (
            <li key={r.user} className="flex items-center justify-between bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center text-sm font-bold">{i+1}</span>
                <span className="text-white font-medium">{r.user}</span>
              </div>
              <span className="text-cyan-300 font-semibold">{r.total_steps.toLocaleString()} steps</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
