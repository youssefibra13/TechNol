import React from 'react'
import Loading from '../images/loading.gif'

const Loader = () => {
  return (
    <div className='loader'>
        <div className="loader_image">
            <img src={Loading} alt="loading gif" />
        </div>
    
    </div>
  )
}

export default Loader