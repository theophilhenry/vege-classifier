import React from 'react'
import Dropzone from './Dropzone'

const InputGambar = (props) => {
  return (
    <div>
      <h5 className='mb-4 d-flex justify-content-center'>File Drag n Drop</h5>
      <Dropzone storeFiles={props.storeFiles} files={props.files} clearFile={props.clearFiles}  clearPictureMedium={props.clearPictureMedium}/>
    </div>
  )
}

export default InputGambar