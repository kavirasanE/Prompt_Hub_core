import React from 'react'
import Open from './components/Open'
import Home from './components/Home'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Takelogs from './pages/Takelogs'
import ConnectedDevices from './pages/ConnectedDevices'
import Commands from './pages/Commands'
import DataProvider from './components/context/DataProvider'
import Contributors from './pages/Contributors'
import ShareyourThoughts from './pages/ShareyourThoughts'
import ErrorBoundaries from './components/ErrorBoundary'

function App() {
  return (
    <>
      <HashRouter>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Open />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/logs" element={<Takelogs />} />
            <Route path="/connectdevice" element={<ConnectedDevices />} />
            <Route path="/contibutors" element={<Contributors />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/thoughts" element={<ShareyourThoughts />} />
          <Route path='/error' element={<ErrorBoundaries/>}/>
          </Routes>
        </DataProvider>
      </HashRouter>
      
    </>
  )
}

export default App
