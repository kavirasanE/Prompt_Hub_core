import './assets/main.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaries from "../src/components/ErrorBoundary"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ErrorBoundary FallbackComponent={ErrorBoundaries} onReset={() => (location.href = '/')}>
    <Toaster position="center" reverseOrder={false} />
      <App />
    </ErrorBoundary> 
  </React.StrictMode>
)
