import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRecoil from './AppRecoil'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRecoil />
  </StrictMode>,
)
