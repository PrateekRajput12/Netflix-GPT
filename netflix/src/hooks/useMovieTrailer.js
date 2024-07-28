import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch,useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";



const useMovieTrailer=(movieId)=>{
    const disPatch=useDispatch()
      const getMovieVideos = async () => {
       
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
          API_OPTIONS
        );
    
        const json = await data.json();
    
        const filterData = json.results.filter((video) => {
          return video.type === "Teaser";
        });
        const trailer = filterData.length ? filterData[1] : json.results[0];
    disPatch(addTrailerVideo(trailer))
      };
    
      useEffect(() => {
        getMovieVideos();
      }, []);
    
}
export default useMovieTrailer