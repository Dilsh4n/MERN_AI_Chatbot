import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

function App() {
  

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </main>
  )
}

export default App
