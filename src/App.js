import React, { useState, useEffect } from 'react'
import Photo from './Photo';
import { FaSearch } from 'react-icons/fa'

// unsplash
const clientID = `?client_id=WWSKTIxshgo6LcWkF4k4OdhHtND2Hb1DXWio77BWf5I`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {

  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  //* The problem I have to solve is that I'm getting the searchTerm 
  //  related items but I'm not wiping out the old ones. The ones that come
  //  from the initia fetch. So ...
  //*  1) Chaging the initial value of page to 0 won't change the data retrieved
  // by the fetch. Exactly the same data as for page=1
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  
  const fetchImages = async () => {
    setLoading(true)
    const urlPage = `&page=${page}`
    let url
    const urlSearch = `&query=${searchTerm}`
    if(searchTerm){
         url = `${searchUrl}${clientID}${urlPage}${urlSearch}`
    } else{
         url = `${mainUrl}${clientID}${urlPage}`
         console.log(url);
    }
 
    const res = await fetch(url)
    const data = await res.json()
   // console.log(data);
   
    setPhotos(oldPhotos => {
//*  2)
      if(searchTerm && page === 1){
        return data.results
      }
      else if(searchTerm){
        return [...oldPhotos, ...data.results]
      }else{
        return [...oldPhotos, ...data]
      }
    })

    setLoading(false)
  }
  
  useEffect(() => {
    fetchImages()
  }, [page])
  
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if(!loading && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2){
        setPage( oldPage => oldPage + 1 )
      }
    })
    return () => {
      window.removeEventListener("scroll", event)
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
//* 3)
    // fetchImages()
    setPage(1)
  }

  return (
   <main className="section">

      <section className="search">
        <form className="search-form">
          <input className="form-input" type="text"
                 placeholder='Search'
                 value={searchTerm}
                 onChange={ e => setSearchTerm(e.target.value)}      
          >
          </input>
          <button className='submit-btn' type='submit' 
                  onClick={handleSubmit}
          >
              <FaSearch/>
          </button>
        </form>
      </section>

      {loading ? <h1 className='loading'>Loading ...</h1>
               : 
                 <section className="photos">
                  <div className="photos-center">
                      {photos.map(photo =>
                         <Photo key={photo.id} {...photo}/>
                      )}
                  </div>   
                 </section>
      }

   </main> 
  );
}

export default App;
