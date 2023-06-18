from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import os

# Set up database connection
from db_connector import Database
db = Database()

# Set up FastAPI
fastApiApp = FastAPI()
fastApiApp.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

# Load the Model
VEGE_MODEL = tf.keras.models.load_model(os.path.join("best_model"))

# change-me
CLASS_NAMES = ['Bayam', 'Bean', 'Bitter_Gourd', 'Bottle_Gourd', 'Brinjal', 'Broccoli', 'Buncis', 'Cabbage', 'Capsicum', 'Carrot', 'Cauliflower', 'Cucumber', 'Kacang_Panjang', 'Papaya', 'Potato', 'Pumpkin', 'Radish', 'Sawi_Hijau', 'Sawi_Putih', 'Tomato']

@fastApiApp.get('/ping')
async def ping():
  return "FastAPI is Healthy"

@fastApiApp.get('/getInfo')
async def getInfo(name: str):
    formatted_name = name.replace("%20", " ")
    query_result = db.query(query=f"SELECT * FROM vegetables WHERE name='{formatted_name}';")
    print(query_result)
    return query_result

@fastApiApp.get('/getInfo-test')
async def getInfoTest(name: str):
  return {'data': [{
    'image_url': 'https://media.tenor.com/m3o2puTnxnEAAAAd/random.gif',
    'name': 'Carrot',
    'latin': 'Carrotius Petronas',
    'description': 'Carrots are rich in vitamins, minerals, and fiber. They are also a good source of antioxidants. Antioxidants are nutriens present in plant-based foods',
    'nutritions': '<ul><li>Vitamin A</li><li>Vitamin B</li><li>Vitamin C</li></ul>',
    'benefits': 'benefits',
    'source': '''https://id.wikipedia.org/wiki/Sambiloto

https://bobo.grid.id/read/08892906/sambiloto-si-raja-pahit-yang-bermanfaat-untuk-kesehatan-tubuh?page=all

https://eprints.umm.ac.id/58390/3/BAB%202.pdf

https://www.alodokter.com/sambiloto-dan-penyakit-pilek

https://ipb.ac.id/news/index/2020/04/prof-dr-drh-umi-cahyaningsih-ungkap-khasiat-sambiloto-pernah-digunakan-untuk-atasi-flu-spanyol/304208fb0a1718cb28d30e6b5ecd10df#:~:text=Bagian%20akar%20dari%20tanaman%20sambiloto,senyawa%20alkane%2C%20keton%20dan%20aldehid.''',
  }]}

@fastApiApp.post('/predict-test')
async def predictTest(file: UploadFile = File(...)):
  return {'class': 'test','confidence': float(0.6)}

@fastApiApp.post('/predict')
async def predict(file: UploadFile = File(...)):
  # Convert from File into Numpy Array
  numpy_image = preprocess_file(await file.read())

  # Img batch to make it into list [img,img] (Required for model.Predict(batch))
  img_batch = np.expand_dims(numpy_image, 0)
  predictions = VEGE_MODEL.predict(img_batch)

  # Get the index of the highest CLASS
  max_class_index = np.argmax(predictions[0])

  # Find Class and Confidence
  predicted_class = CLASS_NAMES[max_class_index]
  confidence = np.max(predictions[0])

  return {'class': predicted_class,'confidence': float(confidence)}

def preprocess_file(data) -> np.ndarray:
  # Convert RGBA to RGB
  im = Image.open(BytesIO(data)).convert('RGB')
  # Resize According to Tensorflow Input
  im = im.resize((224, 224)) # change-me
  # Change to numpy array
  im = np.array(im)
  return im

if __name__ == "__main__":
  uvicorn.run(fastApiApp, host='0.0.0.0', port=8000)