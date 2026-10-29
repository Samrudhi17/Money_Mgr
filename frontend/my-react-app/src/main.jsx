import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ExpenseForm from './component/ExpenseForm.jsx' 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <ExpenseForm />
    
  </StrictMode>,
)
