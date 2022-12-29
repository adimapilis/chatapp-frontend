import { Routes, Route, Outlet } from "react-router-dom";
import './App.css'
import Content from "./features/Content/Content";
import Home from "./features/Home/Home";
import Login from "./features/Login/Login";
import Register from "./features/Register/Register";

function App() {
  
  return (
    
      <Routes>
          <Route path ="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="content" element={<Content />}/>
          <Route path ="*" element={<Home />}/>
      </Routes>
    
  )
}

export default App
