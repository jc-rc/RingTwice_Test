import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18next' // Initialize i18next
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
