import {Link, useLocation} from "react-router-dom";
import {IoMoonOutline, IoSunnyOutline} from "react-icons/io5";
import {useEffect, useState} from "react";


export default function Navbar() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const {pathname} = useLocation();


  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

  }, [theme]);


  return (
    <div className="flex items-center justify-between border-b dark:border-b-gray-800 pb-8 pt-10 lg:px-28 md:px-20 sm:px-10 px-8">
      <Link to="/" className="flex items-center gap-3">
        <img src="/img/logo.png" className="object-cover lg:block hidden" alt=""/>
        <p className="cursor-pointer dark:text-white">I <span className="text-[#91B243]">Recipe</span></p>
      </Link>
      <ul className="uppercase flex lg:gap-20 gap-10 text-sm cursor-pointer dark:text-gray-300">
        <li>
          <Link to="/">
            <p className={`${pathname === '/' ? 'border-b border-gray-500' : ''}`}>
              Home
            </p>
          </Link>
        </li>
        <li>
          <Link to="/recipes">
            <p className={`${pathname === '/recipes' ? 'border-b border-gray-500' : ''}`}> Recipes</p>
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <p className={`${pathname === '/favorites' ? 'border-b border-gray-500' : ''}`}>Favorites</p>
          </Link>
        </li>
      </ul>
      <div className="cursor-pointer dark:text-white">
        {theme === 'dark' ?
          <IoSunnyOutline onClick={() => setTheme('light')}/> :
          <IoMoonOutline onClick={() => setTheme('dark')}/>
        }
      </div>
    </div>
  )
}
