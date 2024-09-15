import Layout from "../layout/Layout.jsx";
import {useEffect} from "react";

export default function NotFound() {


  useEffect(()=>{
    document.title = 'Page Not Found'
  },[])


  return (
    <Layout>
      <div className="flex lg:flex-row flex-col lg:mt-0 mt-20 dark:text-gray-200 items-center justify-between">
        <div className="flex flex-col items-center w-full">
          <p className="text-9xl font-extrabold">404</p>
          <p className="text-6xl font-medium">Page Not Found</p>
          <a href="/" className="mt-8 text-lg font-bold  hover:underline">
            Go back to Home
          </a>
        </div>
        <img src="/img/sushi-plate.png" className="w-[700px] object-cover" alt="Sushi plate image"/>
      </div>
    </Layout>
  )
}
