import React from 'react'
import ImageInput from './dropzone/ImageInput'
import UploadImageCard from './UploadImageCard'
import Camera from './Camera'

const Main = ({predictFiles, setPictureMedium, pictureMedium, loadingPrediction, files, setFile, storeFile, DATATYPE}) => {
  return (
    <>
      {/* Headers */}
      <div className='p-5' style={{ color: '#13518A', backgroundColor: `#D1E1EF`, backgroundSize: 'cover', backgroundPosition: "center right" }}>
        <h1 className='mt-5'>Welcome to GreenLens</h1>
        <p>
          Vegetable Reading Application
          {/* <ModalGuidePhoto title="Vegetable" imageType='vegetable' caption1="Benar" caption2="Latar Ramai" caption3="Gambar Terpotong" caption4="Terlalu Jauh" caption5="Terlalu Dekat"> */}
          {/*  merupakan citra sayuran pada latar polos */}
          {/* </ModalGuidePhoto>  */}
        </p>
      </div>

      {/* Select Box */}
      <div className='p-5' style={{ color: '#FFFFFF', backgroundColor: `#6C93B6`, backgroundSize: 'cover', backgroundPosition: "center right" }}>
        <h5 className=''>How do you want to take Your Picture?</h5>
        <select value={pictureMedium} className={`form-select`} style={{ backgroundColor: `${files.length > 0 ? '#13518A' : ''}`, borderColor: `${files.length > 0 ? '#13518A' : ''}` }} aria-label="Default select example" onChange={e => { setPictureMedium(e.target.value) }} disabled={`${files.length > 0 ? true : ''}`}>
          <option disabled value="">Select One</option>
          <option value="camera">Camera</option>
          <option value="file">File Drag n Drop</option>
        </select>
      </div>

      {/* Camera/File/Result */}
      <div className='p-5'>

        {/* Camera */}
        <div className={`${pictureMedium == 'camera' ? '' : 'd-none'}`}>
          <h5 className='mb-4 text-center'>Camera</h5>
          <div>
            <Camera storeFiles={storeFile} clearPictureMedium={() => setPictureMedium('')} />
          </div>
        </div>

        {/* File Input */}
        <div className={`${pictureMedium == 'file' ? '' : 'd-none'}`}>
          <ImageInput cameraType={DATATYPE} storeFiles={storeFile} files={files} clearPictureMedium={() => setPictureMedium('')} />
        </div>

        {/* Result */}
        <div className={`${files.length > 0 ? '' : 'd-none'}`}>
          <div className='text-center'>
            <h5>Your Wonderful Image</h5>
          </div>

          <div className='text-center'>
            {files.map((file, idx) =>
              <UploadImageCard key={idx}>
                <img style={{ borderRadius: '20px' }} src={file.preview} alt='captured_images' />
                <p className='mt-2'>{file.file_data.type}</p>
              </UploadImageCard>)}
          </div>

          <div className='text-center'>
            <button className='btn btn-outline-danger w-100' onClick={() => { setFile([]) }}>Change Image</button>
          </div>
        </div>

        {/* Submit Button */}
        <div className={`my-5 ${files.length > 0 ? '' : 'd-none'}`}>
          <button className={`btn btn-primary w-100 ${loadingPrediction && 'disabled'}`} onClick={predictFiles}>{loadingPrediction ? 'Loading ...' : 'Submit'}</button>
        </div>
      </div>
    </>
  )
}

export default Main