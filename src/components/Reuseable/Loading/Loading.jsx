import React from 'react'
import ReactLoading from 'react-loading';

const Loading = (props) => {
  const {type, loading} = props

  return (
    <>
   {loading && <div className='loading'>
   
       
        <ReactLoading type={type} color='var(--theme-color)' />
  
     </div>  
    }
    </>
    
  )
}
export default Loading