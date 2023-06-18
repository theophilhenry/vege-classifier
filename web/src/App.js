import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Result from './components/Result';
import Main from './components/Main';
const axios = require("axios").default;

function App() {
  const URL = 'localhost'
  const DATATYPE = 'Vegetable'

  const [pictureMedium, setPictureMedium] = useState('');
  const [loadingPrediction, setloadingPrediction] = useState(false);
  const [isTreshold, setIsTreshold] = useState(false);

  const [vege, setVege] = useState({});

  const [files, setFile] = useState([]);

  // Can only store 1 file
  const storeFile = (file) => { if (files.length < 1) setFile([...files, ...file]) }

  const sendFile = async (selectedFile) => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res = await axios({ method: "post", url: `http://${URL}:8000/predict`, data: formData, });
    if (res.status === 200) return res.data
    else return { 'class': 'none', 'confidence': 0 }
  }

  const getInfo = async (vegetables) => {
    let res = await axios({ method: "get", url: `http://${URL}:8000/getInfo?name=` + vegetables });
    if (res.status === 200) return res.data.data
    else return [{}]
  }

  const predictFiles = async () => {
    setloadingPrediction(true)

    const firstFile = files[0]
    const output = await sendFile(firstFile.file_data)
    console.log(output)

    // Threshold
    if (output.confidence < 0.75) {
      setIsTreshold(true);
      setloadingPrediction(false);
      return;
    }

    // var prediction = { ...file, class_name: output.class, confidence: output.confidence };
    // console.log('Prediction  : ')
    // console.log(prediction)

    // Query the database to get the information
    const result = await getInfo(output.class)
    setVege(result.data.data)
    setloadingPrediction(false)
    setFile([])
  }

  return (
    <div className='pt-5'>
      <Navbar />
      <main>
        {
          // IF THRESHOLD, THEN NO VEGETABLE FOUND
          isTreshold ?
            <>
              <div className='p-5' style={{ color: '#13518A', backgroundColor: `#D1E1EF`, backgroundSize: 'cover', backgroundPosition: "center right" }}>
                <h1 className='mt-5'>Image Not Found</h1>
                <p>Sorry, system cannot recognize the uploaded image. Please try again with another image.</p>
              </div>
              <div className='p-5'>
                <div className='my-4'>
                  <button className='btn btn-outline-danger w-100' onClick={() => { setIsTreshold(false) }}>Back</button>
                </div>
              </div>
            </>
            :
            Object.keys(vege).length === 0 ?
              <Main
                predictFiles={predictFiles}
                setPictureMedium={setPictureMedium} pictureMedium={pictureMedium}
                loadingPrediction={loadingPrediction}
                files={files} setFile={setFile} storeFile={storeFile}
                DATATYPE={DATATYPE}
              />
              :
              // ELSE SHOW RESULT PAGE
              <Result vege={vege} setVege={setVege} />
        }

      </main>


    </div>
  );
}

export default App;
