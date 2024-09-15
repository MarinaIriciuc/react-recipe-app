import {Link} from "react-router-dom";
import {FaFacebook, FaInstagram, FaPinterest} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-[130px] border-t border-gray-100 bg-gray-50 dark:bg-gray-900 dark:border-0 lg:px-28 md:px-20 sm:px-10 px-8 mt-36 sm:py-14 py-8">
      <div className="flex justify-between items-center">
        <div className="flex sm:flex-col flex-row justify-between w-full">
          <Link to="/">
            <p className="cursor-pointer dark:text-white text-xl tracking-wide">I <span className="text-[#91B243]">Recipe</span></p>
          </Link>
          <div className="flex items-center gap-3 sm:mt-5 dark:text-gray-200">
            <FaInstagram className="social-media-icon"/>
            <FaFacebook className="social-media-icon"/>
            <FaPinterest className="social-media-icon"/>
            <FaSquareXTwitter className="social-media-icon"/>
          </div>
        </div>
        <div className="sm:flex flex-col hidden gap-4 text-gray-700 text-sm dark:text-gray-200">
          <Link to="/">
            <p className="cursor-pointer hover:underline">Home</p>
          </Link>
          <Link to="/recipes">
            <p className="cursor-pointer hover:underline">Recipes</p>
          </Link>
          <Link to="/favorites">
            <p className="cursor-pointer hover:underline">Favorites</p>
          </Link>
        </div>
      </div>
      <div
        className="flex sm:flex-row flex-col sm:items-center justify-between sm:border-t border-gray-500 sm:mt-14 mt-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-3 sm:mt-10">
          <img src="/img/logo.png" className="object-cover lg:block hidden" alt=""/>
          <p> © {currentYear}</p>
          <p>IRecipe. All rights reserved.</p>
        </div>
        <p className="mt-10 cursor-pointer md:block hidden">Terms of services</p>
      </div>
    </div>
  )
}
