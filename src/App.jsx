import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './telas/HomePage'
import MostrarReceitas from './telas/MostarReceitas'
import TelaCadastro from './telas/TelaCadastro'
export default function App() {
 

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Receitas" element={<MostrarReceitas/>} />
            <Route path="/Cadastro" element={<TelaCadastro />}></Route>
        </Routes>
    </BrowserRouter>  
   )
}

