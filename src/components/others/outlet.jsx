import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import FooterBtns from "../FooterBtns/FooterBtns"
function Layout(){
    return<>
            <Navbar/>
            <Outlet/>
            <FooterBtns/>
    </>
}
export default Layout