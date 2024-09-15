import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


export default function Layout({children}) {
  return (
    <>
      <Navbar/>
      <div className="lg:px-28 md:px-20 sm:px-10 px-8">
        {children}
      </div>
      <Footer/>
    </>
  )
}
