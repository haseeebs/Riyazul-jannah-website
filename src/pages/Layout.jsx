import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useFetchData from "../hooks/useFetchData"

const Layout = () => {
  useFetchData()

  return (
      <div className={`bg-lime-50`}>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout