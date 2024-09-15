import Layout from "../layout/Layout.jsx";
import {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import Skeleton from "react-loading-skeleton";
import {Link} from "react-router-dom";

export default function Favorites() {

  let api_key = "fb2cb468b86fc5a957acc498506a2247";
  let api_id = 'f3b47abe';
  const [favoriteRecipes,] = useState(JSON.parse(localStorage.getItem('favoriteRecipe')) || []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    document.title = 'My Favorite Recipes'
  }, [])

  async function getFavoriteRecipesById(id) {
    let api = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${api_id}&app_key=${api_key}`;
    const response = await fetch(api);
    const data = await response.json();
    setLoading(false);
    setData(prev => [...prev, data])
  }


  useEffect(() => {
    let isMounted = true;
    if (favoriteRecipes.length > 0) {
      favoriteRecipes.forEach(function (favRecipe) {
        if (isMounted) {
          getFavoriteRecipesById(favRecipe);
        }
      })
    } else {
      setLoading(false)
    }
    return () => {
      isMounted = false;
    };
  }, [favoriteRecipes]);


  return (
    <Layout>
      <div className="mt-16">
        <p className="text-gray-900 dark:text-gray-200 text-2xl capitalize">My favorite recipes</p>
        {loading ?
          <div className="w-72 mt-14">
            <Skeleton height={200}/>
            <div>
              <Skeleton height={25} className="my-2"/>
            </div>
          </div>
          : (
            <div className="grid lg:grid-cols-3 grid-cols-2  mt-10 gap-10">
              {data.map(function (recipe, index) {
                return (
                  <Link key={index} to={`/recipes/${recipe.recipe.uri.split("#")[1]}`}>
                    <RecipeCard key={index} data={recipe}/>
                  </Link>
                )
              })}
            </div>
          )}
        <p>{favoriteRecipes.length === 0 &&
          <p className="flex justify-center text-xl mt-12 dark:text-gray-300">You don't have a favorite recipe</p>}</p>
      </div>
    </Layout>
  )
}
