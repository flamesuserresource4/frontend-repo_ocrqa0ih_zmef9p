import React from 'react'

export default function Header() {
  return (
    <header className="py-8">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C7 7 17 9 12 22C19 16 14 12 17 7C18.5 4.5 15 2 12 2Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold leading-tight">Step Tracker</h1>
            <p className="text-blue-200/70 text-sm">Log steps, track progress, compete on the board</p>
          </div>
        </div>
      </div>
    </header>
  )
}
