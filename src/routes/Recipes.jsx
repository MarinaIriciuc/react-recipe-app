import RecipeCard from "../components/RecipeCard.jsx";
import {useEffect, useState} from "react";
import Layout from "../layout/Layout.jsx";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {useDebouncedCallback} from "use-debounce";

export default function Recipes() {

  const [query, setQuery] = useState('coffee');
  const [data, setData] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(true);
  const debounced = useDebouncedCallback((value) => {
    setQuery(value)
  }, 500);


  let api_key = "fb2cb468b86fc5a957acc498506a2247";
  let api_id = 'f3b47abe';
  let api = `https://api.edamam.com/search?app_id=${api_id}&app_key=${api_key}&q=${query}&health=gluten-free&health=celery-free`;


  useEffect(() => {
    document.title = 'Recipes'
  }, [])


  function handleChange(event) {
    if (event.target.value.length === 0) {
      setQuery('coffee')
    } else {
      debounced(event.target.value);
    }
    return () => {
      clearTimeout(debounced);
    };
  }


  useEffect(() => {

    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      try {
        const response = await fetch(api, {
          signal
        });
        setLoading(true);
        if (response.status === 400) {
          setErrors("Bad Request: The server could not understand the request.");
        } else if (response.status === 404) {
          setErrors("Not Found: The requested resource could not be found");
        } else if (response.status === 500) {
          setErrors("Internal Server Error: There is a problem with the server.")
        } else if (response.status === 503) {
          setErrors("Service Unavailable: The server is currently unable to handle the request.")
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setErrors(error.message);
      }
    }

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [api, query]);


  return (
    <Layout>
      <input type="text"
             onInput={handleChange}
             className="rounded-md w-full py-3 mt-20 text-xs text-gray-500 px-3 dark:text-gray-300 dark:bg-gray-900 border dark:border-gray-800  focus:outline-none focus:border-gray-800"
             placeholder="Type one or more keywords"/>
      <p className="text-red-500 font-semibold my-5">{errors}</p>
      <p className="flex items-start mt-8 text-xl font-bold dark:text-gray-200">{data?.hits?.length} recipes found
        for <span
          className="text-[#91B243] ms-2"> {query} </span></p>
      {loading ?
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 mt-10">
          {Array.from({length: 6}).map((index) => (
            <div key={index} className="flex flex-col">
              <Skeleton className="md:h-[300px] h-[200px]"/>
              <Skeleton className="md:h-[30px]"/>
            </div>
          ))}
        </div>
        : (
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 mt-10">
            {data?.hits?.map(function (recipe, index) {
              return (
                <Link key={index} to={`/recipes/${recipe.recipe.uri.split("#")[1]}`}>
                  <RecipeCard data={recipe}/>
                </Link>
              )
            })}
            <p
              className="dark:text-gray-400">{data?.hits?.length === 0 && `There are no recipes with keyword ${query}`}</p>
          </div>
        )}
    </Layout>
  )
}
