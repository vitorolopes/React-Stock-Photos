
import React, { useState, useEffect } from 'react'
import Photo from './Photo';
import { FaSearch } from 'react-icons/fa'

// unsplash
const clientID = `?client_id=WWSKTIxshgo6LcWkF4k4OdhHtND2Hb1DXWio77BWf5I`
const mainUrl = `https://api.unsplash.com/photos/`
//! HERE **********
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {

  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
//! HERE **********
  const [searchTerm, setSearchTerm] = useState("")
  
  const fetchImages = async () => {
    setLoading(true)
    const urlPage = `&page=${page}`
//! HERE **********
    let url
    const urlSearch = `&query=${searchTerm}`
    if(searchTerm){
         url = `${searchUrl}${clientID}${urlPage}${urlSearch}`
    } else{
         url = `${mainUrl}${clientID}${urlPage}`
    }
 
    const res = await fetch(url)
    const data = await res.json()
    console.log(data);
    console.log(url);

//! HERE **********
    setPhotos(oldPhotos => {
      if(searchTerm){
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

//! HERE **********
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("hello");
    fetchImages()
  }

  return (
   <main className="section">

      <section className="search">
        <form className="search-form">
          <input className="form-input" type="text"
                 placeholder='Search'
//! HERE **********
                 value={searchTerm}
                 onChange={ e => setSearchTerm(e.target.value)}      
          >
          </input>
          <button className='submit-btn' type='submit'
                  //! HERE **********
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
