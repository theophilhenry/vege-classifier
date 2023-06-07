import React, { useEffect } from 'react'

const Result = ({plant, setPlant}) => {
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  return (
    <>
    <img alt="Gambar Tanaman" src={plant.image_url} className='w-100'/>
    <div className='p-4'>
      <div className='mb-2'>
        <h2>{plant.name}</h2>
        <p dangerouslySetInnerHTML={{__html: plant.latin}}></p>
        <p dangerouslySetInnerHTML={{__html: plant.description}}></p>
      </div>
      <div className='my-2'>
        <h3>Benefits</h3>
        
        <p dangerouslySetInnerHTML={{__html: plant.benefits}}></p>
      </div>
      <div className='my-2'>
        <h3>Nutritions</h3>
        <p dangerouslySetInnerHTML={{__html: plant.nutritions}}></p>
      </div>
      <div className='my-2'>
        <h3>Source</h3>
        <p dangerouslySetInnerHTML={{__html:
          plant.source
            .split('http')
            .map((sumber) => {
              var regexMatch = `http${sumber}`.match(/http.?:\/\/([\w\.]*)/);
              console.log(regexMatch);
              if (sumber){
                if (regexMatch) {
                  return `<p><a href='http${sumber}'>${regexMatch[1]}</a></p>`
                } else {
                  return `<p>${sumber}</p>`
                }
            }else return ""
            })
            .join('')}}></p>
      </div>
      <div className='my-4'>
        <button className='btn btn-outline-danger w-100' onClick={() => {setPlant({})}}>Back</button>
      </div>
    </div>
    </>
  )
}

export default Result