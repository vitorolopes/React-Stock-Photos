
import React, { useState, useEffect } from 'react'
import Photo from './Photo';
import { FaSearch } from 'react-icons/fa'

// unsplash
const clientID = `?client_id=WWSKTIxshgo6LcWkF4k4OdhHtND2Hb1DXWio77BWf5I`
const mainUrl = `https://api.unsplash.com/photos/`

function App() {

  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  
  const fetchImages = async () => {
    setLoading(true)
    let url = `${mainUrl}${clientID}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data);
    setLoading(false)
    setPhotos(data)
  }
  
  useEffect(() => {
    fetchImages()
  }, [])
  

  return (
   <main className="section">

      <section className="search">
        <form className="search-form">
          <input className="form-input" type="text"
                 placeholder='Search'>
          </input>
          <button className='submit-btn' type='submit'>
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
