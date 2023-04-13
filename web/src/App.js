import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Cameras from './components/Camera';
import InputGambar from './components/dropzone/InputGambar';
import Result from './components/Result';
import ModalGuidePhoto from './components/ModalGuidePhoto';
import UploadImageCard from './components/UploadImageCard'
const axios = require("axios").default;

function App() {
  // const URL = '36.81.111.124'
  // const URL = '192.168.100.27'
  const URL = 'localhost'
  // const URL = '192.168.13.113'
  const DATATYPE = 'Vegetable'

  const [pictureMedium, setPictureMedium] = useState('');
  const [loadingPrediction, setloadingPrediction] = useState(false);
  const [isTreshold, setIsTreshold] = useState(false);

  const [plant, setPlant] = useState({});

  const [files, setFile] = useState([]);

  const storeFile = (file) => { if (files.length < 1) setFile([...files, ...file]) }

  const sendFile = async (selectedFile) => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res = await axios({ method: "post", url: `http://${URL}:8000/predict`, data: formData, });
    if (res.status === 200) return res.data
    else return { 'class': 'none', 'confidence': 'none' }
  }

  const getInfo = async (plant_name) => {
    let res = await axios({ method: "get", url: `http://${URL}:8000/getInfo?nama_umum=` + plant_name });
    if (res.status === 200) return res.data
    else return [{}]
  }

  const predictFiles = async () => {
    setloadingPrediction(true)
    var tmp_predict = []
    var tmpIsTreshold;
    for (const file of files) {
      const output = await sendFile(file.file_data)
      console.log(output.confidence)
      if (output.confidence < 0.75) {
        tmpIsTreshold = true
        break
      }
      tmp_predict = [...tmp_predict, { ...file, class_name: output.class, confidence: output.confidence }]
      console.log('Prediction  : ')
      console.log(tmp_predict)
    }

    if(tmpIsTreshold === true){
      setIsTreshold(tmpIsTreshold);
      setloadingPrediction(false);
      return;
    }
    // Query the database to get the information
    const result = await getInfo('salmon')
    setPlant(result.data[0])
    setloadingPrediction(false)

    setFile([])
  }

  return (
    <div className='pt-5'>
      <Navbar />
      <main>

        { isTreshold ? 
            <>
              <div className='mt-5 mb-2'>
                <h1>Welcome to HerbaScan</h1>
                <p>Mohon maaf, gambar yang anda masukan tidak dapat dikenali oleh sistem. Silahkan coba kembali menggunakan gambar yang lain. Apabila mengalami kesulitan, mohon untuk membaca guideline foto pada halaman utama.</p>
              </div>
              <div className='my-4'>
                <button className='btn btn-danger w-100' onClick={() => {setIsTreshold(false)}}>Kembali</button>
              </div>
            </>
          : 
            // Check if there's a result or not yet
            Object.keys(plant).length === 0 ?
              <>
              {/* Header */}
              <div className='p-5' style={{color:'#13518A', backgroundColor: `#D1E1EF`, backgroundSize: 'cover', backgroundPosition: "center right"}}>
                <h1 className='mt-5'>Welcome to GreenLens</h1>
                <p>
                  Vegetable Reading Application 
                  {/* <ModalGuidePhoto title="Vegetable" imageType='vegetable' caption1="Benar" caption2="Latar Ramai" caption3="Gambar Terpotong" caption4="Terlalu Jauh" caption5="Terlalu Dekat"> */}
                    {/*  merupakan citra sayuran pada latar polos */}
                  {/* </ModalGuidePhoto>  */}
                </p>
              </div>

              {/* Select Box */}
              <div className='p-5' style={{color:'#FFFFFF', backgroundColor: `#6C93B6`, backgroundSize: 'cover', backgroundPosition: "center right"}}>
                <h5 className=''>How do you want to take Your Picture?</h5>
                <select value={pictureMedium} className={`form-select`} style={{backgroundColor: `${files.length > 0 ? '#13518A' : ''}`, borderColor: `${files.length > 0 ? '#13518A' : ''}`}} aria-label="Default select example" onChange={e => { setPictureMedium(e.target.value)}} disabled={`${files.length > 0 ? 'true' : ''}`}>
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
                    <Cameras storeFiles={storeFile} clearPictureMedium={() => setPictureMedium('')}/>
                  </div>
                </div>

                {/* File Input */}
                <div className={`${pictureMedium == 'file' ? '' : 'd-none'}`}>
                  <InputGambar cameraType={DATATYPE} storeFiles={storeFile} files={files} clearPictureMedium={() => setPictureMedium('')}/>
                </div>

                {/* Result */}
                <div className={`${files.length > 0 ? '' : 'd-none'}`}>
                  <div className='text-center'>
                    <h5>Your Wonderful Image</h5>
                  </div>
                  
                  <div className='text-center'>
                    {files.map((file, idx) => 
                      <UploadImageCard key={idx}>
                        <img style={{borderRadius: '20px'}} src={file.preview} alt='captured_images'/>
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
            : 
              <Result plant={plant} setPlant={setPlant}/>
            }
        
      </main>
      

    </div>
  );
}

export default App;
