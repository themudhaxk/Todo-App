import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Outlet } from "react-router-dom"
import Navbar from "./pages/auth/NavBar"
import Nav from "./pages/auth/Nav"

function App() {
  return (
    <>
      <ToastContainer />
      {/* <Navbar /> */}
      <Nav />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  )
}

export default App
