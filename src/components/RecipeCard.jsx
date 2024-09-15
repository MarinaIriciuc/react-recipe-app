import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function RecipeCard({data}) {
  return (
    <div className="flex flex-col cursor-pointer">
      <LazyLoadImage
        alt={data?.recipe?.label}
        effect="blur"
        placeholder={<span>Loading...</span>}
        wrapperProps={{style: {transitionDelay: "0.3s"},}}
        className="w-full rounded-t-md"
        src={data?.recipe?.image}
      />
      <div className="bg-white dark:bg-gray-900 dark:text-gray-400 text-blue-950 text-start p-3 rounded-b border border-gray-200 dark:border-gray-700 min-h-[50px] max-h-[50px] overflow-hidden text-ellipsis">
        <p className="font-semibold text-sm">{data?.recipe?.label}</p>
      </div>
    </div>
  )
}
