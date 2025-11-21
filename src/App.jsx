import React, { useState } from 'react'
import Header from './components/Header'
import StepForm from './components/StepForm'
import StepList from './components/StepList'
import Leaderboard from './components/Leaderboard'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const triggerRefresh = () => setRefreshKey((k) => k + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(59,130,246,0.15),transparent_60%)]" />
      <div className="relative">
        <Header />

        <main className="max-w-5xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <StepForm onSubmitted={triggerRefresh} />
              <StepList refreshKey={refreshKey} />
            </div>
            <div className="lg:col-span-1">
              <Leaderboard refreshKey={refreshKey} />
            </div>
          </div>

          <p className="mt-10 text-center text-slate-400 text-sm">Backend URL: {import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}</p>
        </main>
      </div>
    </div>
  )
}

export default App
