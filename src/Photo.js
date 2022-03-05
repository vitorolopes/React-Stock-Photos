import React from 'react'

const Photo = (
          {
           urls:{regular}, 
           alt_description,
           user:{first_name},
           likes,
           user:{portfolio_url},
           user:{profile_image:{medium}},
           user:{name}
          }
          ) => {
  return (
    <article className='photo'>

        <img src={regular} alt={ alt_description} />

        <div className="photo-info">

          <div>
            <h4>{first_name}</h4>
            <p>{likes} likes</p>
          </div>

          <a href={portfolio_url}>
            <img className='user-img' src={medium} alt={name}/>
          </a>

        </div>

    </article>
  )
}

export default Photo