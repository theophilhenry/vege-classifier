import React, { useEffect } from 'react'

const Result = ({vege, setVege}) => {
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  return (
    <>
    <img alt="Gambar Tanaman" src={vege.image_url} className='w-100'/>
    <div className='p-4'>
      <div className='mb-2'>
        <h2>{vege.name}</h2>
        <p dangerouslySetInnerHTML={{__html: vege.latin}}></p>
        <p dangerouslySetInnerHTML={{__html: vege.description}}></p>
      </div>
      <div className='my-2'>
        <h3>Benefits</h3>
        
        <p dangerouslySetInnerHTML={{__html: vege.benefits}}></p>
      </div>
      <div className='my-2'>
        <h3>Nutritions</h3>
        <p dangerouslySetInnerHTML={{__html: vege.nutritions}}></p>
      </div>
      <div className='my-2'>
        <h3>Source</h3>
        <p dangerouslySetInnerHTML={{__html:
          vege.source
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
        <button className='btn btn-outline-danger w-100' onClick={() => {setVege({})}}>Back</button>
      </div>
    </div>
    </>
  )
}

export default Result