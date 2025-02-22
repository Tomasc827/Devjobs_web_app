import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App'
import { AuthProvider } from './components/contexts/AuthContext'
import { DataProvider } from './components/contexts/DataContext'
import Registration from './components/authentication/Registration'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <DataProvider>
    <Routes>
      <Route path='/' element={<App/>}>

      <Route path='/registration' element={<Registration/>} />
      </Route>
    </Routes>
    </DataProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
