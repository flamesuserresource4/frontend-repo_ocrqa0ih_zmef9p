import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function StepForm({ onSubmitted }) {
  const [user, setUser] = useState('')
  const [steps, setSteps] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!user || !steps) {
      setError('Please enter your name and steps')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/steps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, steps: Number(steps), date, note: note || undefined })
      })
      if (!res.ok) throw new Error('Failed to save')
      setSteps('')
      setNote('')
      onSubmitted?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input value={user} onChange={(e)=>setUser(e.target.value)} placeholder="Your name" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="number" value={steps} onChange={(e)=>setSteps(e.target.value)} placeholder="Steps" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button disabled={loading} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow hover:opacity-90 transition">
          {loading ? 'Saving...' : 'Add Steps'}
        </button>
      </div>
      <input value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Optional note" className="mt-3 w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </form>
  )
}
