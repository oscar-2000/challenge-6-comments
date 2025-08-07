import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@components/App.jsx'
import CommentProvider from '@context/CommentProvider'

createRoot(document.getElementById('root')).render(
  <CommentProvider>
    <App />
  </CommentProvider>
)
