import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register('/smartphone-project/service-worker.js')
    .then((registration) => {
      if (registration.waiting) {
        console.info("실행", registration);
      }
    })
    .catch((err: unknown) => {
      if (err instanceof Error) throw new Error(err.message)
    })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
