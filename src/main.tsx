import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes } from 'react-router'
import { Route } from 'react-router'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import HomePage from './pages/HomePage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import ViewArtworkPage from './pages/ViewArtworkPage.tsx'
import ViewCollectionPage from './pages/ViewCollectionPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<LoginPage />}></Route>
          <Route path='register' element={<RegisterPage />}></Route>
          <Route path='home' element={<HomePage />}></Route>
          <Route path='profile' element={<ProfilePage />}></Route>
          <Route path='/artwork/:id' element={<ViewArtworkPage />}></Route>
          <Route path='/collections/:id' element={<ViewCollectionPage />}></Route>
        </Route>
        <Route path='*' element={<div>404 Error</div>}></Route>
      </Routes>
  </BrowserRouter>
  </StrictMode>,
)
