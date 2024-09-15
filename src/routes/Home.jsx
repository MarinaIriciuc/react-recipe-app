import Layout from "../layout/Layout.jsx";
import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function Home() {

  useEffect(()=>{
    document.title = 'Home'
  },[])


  return (
    <Layout>
      <div className="flex sm:flex-row md:items-center flex-col justify-between min-h-[400px] mt-20 antialiased">
        <div>
          <div
            className="flex flex-col lg:text-[50px] md:text-[35px] sm:text-[40px] text-[45px] dark:text-gray-200 font-medium">
            <p>The Easiest Way</p>
            <p>To Make Your</p>
            <p>Favorite Meal</p>
          </div>
          <div className="mt-10 text-gray-900 dark:text-gray-300 text-[14px]">
            <p>Discover 3000 + recipes in your hands with the best recipe.</p>
            <p>Help you to find the easiest way to cook.</p>
          </div>
          <Link to="/recipes">
            <button className="primary-button bg-green-700">Explore Recipes</button>
          </Link>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <img src="/img/food-grass-fed-beef-foodservice-products-grass-run-farms-4.png"
                 className="object-cover w-80 h-80 absolute xl:block hidden bottom-0 top-52 right-96 hover:animate-spin "
                 alt=""/>
            <img src="/img/sushi-plate.png"
                 className="object-cover lg:w-96 lg:h-96 md:w-80 md:h-80 h-60 w-60 mt-20 z-20" alt=""/>
          </div>
        </div>
      </div>
    </Layout>
  )
}
