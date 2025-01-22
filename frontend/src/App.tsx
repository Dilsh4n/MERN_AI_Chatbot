import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import { useAuth } from "./context/AuthContext"

function App() {
  const auth = useAuth();
  
  console.log(useAuth()?.isLoggedIn)

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        {auth?.isLoggedIn && auth?.user && (
          <Route path="/chat" element={<Chat/>}/>
        )}
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Home />}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </main>
  )
}

export default App
