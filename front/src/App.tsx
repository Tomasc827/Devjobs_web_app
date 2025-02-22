import { Outlet } from "react-router"
import ErrorServer from "./components/messages/ErrorServer"

function App() {


  return (
    <>
    <ErrorServer/>
    <Outlet/>
    </>
  )
}

export default App
