import {useNavigate, useParams} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Layout from "../layout/Layout.jsx";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNotify from "../hooks/useNotify.js";

export default function Recipe() {

  const params = useParams();
  const navigate = useNavigate();
  let api_key = "fb2cb468b86fc5a957acc498506a2247";
  let api_id = 'f3b47abe';
  let api = `https://api.edamam.com/api/recipes/v2/${params.slug}?type=public&app_id=${api_id}&app_key=${api_key}`
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipe')) || []

    return recipes.some(recipe => params.slug === recipe)
  });
  const { notify } = useNotify();

  useEffect(() => {
    document.title = data?.label || "Recipe"
  }, [data])


  useEffect(() => {

    let isMounted = true;

    async function getRecipe() {
      const response = await fetch(api);
      if (!response.ok) {
        navigate('/not-found');
        return
      }
      // setLoading(true)
      const data = await response.json();
      if (isMounted) {
        setLoading(false);
        setData(data.recipe);
      }
    }

    getRecipe();
    return () => {
      isMounted = false
    }
  }, [api, navigate, params.slug]);


  useEffect(() => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipe')) || [];
    if (favorite && !favoriteRecipes.includes(params.slug)) {
      favoriteRecipes.push(params.slug);
      localStorage.setItem('favoriteRecipe', JSON.stringify(favoriteRecipes));
    } else if (!favorite && favoriteRecipes.includes(params.slug)) {
      favoriteRecipes = favoriteRecipes.filter(recipe => recipe !== params.slug)
      localStorage.setItem('favoriteRecipe', JSON.stringify(favoriteRecipes));
    }
  }, [favorite]);

  function handleAddToFavorites(toggle) {
    if (toggle) {
      // toast.success('The Recipe Has Been Added To Favorites!', {});
      notify('success', 'The Recipe Has Been Added To Favorites!');
    } else {
      notify('info', 'The Recipe Has Been Removed From Favorites!');
      // toast.info('The Recipe Has Been Removed From Favorites!', {});
    }
    setFavorite(toggle)
  }


  return (
    <Layout>
      {loading ?
        <>
          {Array.from({length: 1}).map((index) => (
            <div key={index} className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-24">
              <Skeleton height={400}/>
              <Skeleton count={8} height={25} className="my-2"/>
            </div>
          ))}
        </> : (
          <div className="flex lg:flex-row flex-col lg:items-start items-center justify-center mt-24 lg:gap-28 gap-10">
            <LazyLoadImage
              alt=""
              effect="blur"
              placeholder={<span>Loading...</span>}
              wrapperProps={{style: {transitionDelay: "0.3s"},}}
              className="w-[400px] object-cover rounded-md"
              src={data?.image}
            />
            <ToastContainer/>
            <div className="flex flex-col overflow-hidden">
              <div className="flex justify-between items-center">
                <p className="font-medium text-3xl dark:text-gray-200">{data?.label} - <span
                  className="text-lg font-normal">{Math.floor(data?.calories)} KCAL, {Math.floor(data?.totalWeight)} g</span>
                </p>
                <div className="cursor-pointer bg-gray-50 p-2 rounded-md"
                     onClick={() => handleAddToFavorites(!favorite)}>
                  {favorite ? <FaHeart/> : <FaRegHeart/>}
                </div>
              </div>
              <div className="flex lg:flex-row flex-col my-5 dark:text-gray-500">
                <p>Category: <span className="text-gray-900 dark:text-gray-400 font-semibold">{data?.dishType[0]}</span>
                </p>
                <p>Preparation Time: <span
                  className="text-gray-900 dark:text-gray-400 font-semibold">{data?.totalTime} min</span></p>
                <p>Type: <span className="text-gray-900 dark:text-gray-400 font-semibold">{data?.mealType[0]}</span></p>
                <p>Kitchen Type: <span
                  className="text-gray-900 dark:text-gray-400 font-semibold">{data?.cuisineType[0]}</span></p>
              </div>
              <div>
                <p className="text-xl font-medium my-3 dark:text-gray-200">Ingredients</p>
                <ol className="list-decimal ms-4 dark:text-gray-400">
                  {data?.ingredientLines.map(function (ingredient, index) {
                    return (
                      <li key={index}>
                        {ingredient}
                      </li>
                    )
                  })}
                </ol>
              </div>
              <div className="my-8">
                <p>Tags</p>
                <div className="grid grid-cols-5 gap-4 mt-3">
                  {data?.healthLabels.slice(0, 10).map(function (nutritionalValue, index) {
                    return (
                      <button key={index}
                              className="uppercase text-xs text-gray-400 py-2 rounded-md border border-gray-300">{nutritionalValue}</button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
    </Layout>
  )
}
