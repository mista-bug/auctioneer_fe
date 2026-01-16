import { useState, type ReactNode } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router'
import { Card } from '@heroui/react'
import Navbar from './components/Navbar'

interface IApp {
}

function App() {

  return (
    <>
    <div className='h-screen w-screen flex flex-col p-3'>
      <Navbar/>
      <Outlet/>
    </div>
    </>
  )
}

export default App;
