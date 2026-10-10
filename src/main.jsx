// Import React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Import the main App component
import App from './App.jsx'

// Import the global CSS
import './index.css'

// Display the website inside the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)