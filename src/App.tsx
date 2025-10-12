import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center space-x-8 mb-8">
            <a 
              href="https://vite.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <img 
                src={viteLogo} 
                className="h-24 w-24 transition-transform duration-300 group-hover:scale-110" 
                alt="Vite logo" 
              />
            </a>
            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <img 
                src={reactLogo} 
                className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 animate-spin-slow" 
                alt="React logo" 
              />
            </a>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Vite + React + TypeScript
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Modern  with Tailwind CSS v4+
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center">
            <div className="mb-6">
              <button 
                onClick={() => setCount((count) => count + 1)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Count is {count}
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">src/App.tsx</code> and save to test HMR
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">✓ TypeScript</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">✓ Vite</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">✓ Tailwind CSS v4+</span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">✓ Hot Reload</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
