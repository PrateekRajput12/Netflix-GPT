import Header from './Header'
import useNowPlayingMovies  from '../hooks/useNowPlayingMovies'
import MainConatiner from './MainConatiner'
import SecondaryContainer from './SecondaryContainer'
 const Browse = () => {
useNowPlayingMovies()
  
  return (
    <div>
      <Header/>
      <MainConatiner/>
      <SecondaryContainer/>
      {/* 
      main container
       video
       title 
       Secondsay container
        movie list
          cards*/}
    </div>
  )
}


export default Browse