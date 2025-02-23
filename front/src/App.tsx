import { Outlet } from "react-router"
import ErrorServer from "./components/messages/ErrorServer"
import Success from "./components/messages/Success"
import { useDataContext } from "./components/contexts/DataContext"
import Loading from "./components/messages/Loading"
import Navbar from "./components/navbars/Navbar"

function App() {
  const {isLoading,isDarkMode} = useDataContext()
  


  return (
    <>
    <div className={`pb-10 min-h-screen z-0 duration-500 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
    {isLoading && <Loading/>}
    <Navbar/>
    <Success/>
    <ErrorServer/>
    <Outlet/>
    </div>
    </>
  )
}

export default App
