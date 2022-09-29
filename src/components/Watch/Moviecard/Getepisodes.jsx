import axios from 'axios'
import React, {useEffect, useState} from 'react'

const useGetepisodes = (show, season) => {
  const [details, setDetails] = useState('')
  useEffect(()=> {    
    if(show) {
      axios.get(`https://api.themoviedb.org/3/tv/${show}/season/${season}?api_key=b01f7a54e2ff090e41ca2c91f05e7159&append_to_response=videos,images,credits`).then(resp=> {
        setDetails(resp.data)
      })
      .catch(err=> { 
        console.log(err)
      })
    }
  }, [show, season])
  return details
}
export default useGetepisodes