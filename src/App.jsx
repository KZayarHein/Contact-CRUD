// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Guard from './components/Guard'
import CreateContact from './components/CreateContact'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Guard><Dashboard/></Guard>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/contact/create' element={<CreateContact/>}/>
      </Routes>
    </div>
  )
}

export default App