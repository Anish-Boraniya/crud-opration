import React from 'react'
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'
import Home from './components/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

