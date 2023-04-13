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
VEGE_MODEL = tf.keras.models.load_model(os.path.join("models", "best_model"))

# change-me
CLASS_NAMES = ['...']

@fastApiApp.get('/ping')
async def ping():
  return "FastAPI is Healthy"

@fastApiApp.get('/getInfo')
async def getInfo(name: str):
  formatted_name = name.replace("%20", " ")
  return db.query(query=f"SELECT * FROM vegetables WHERE name='{formatted_name}';")

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

  # If smaller than Threshold
  if confidence < 0.7:
    return {'class': "none",'confidence': float(0)}
  else:
    return {'class': predicted_class,'confidence': float(confidence)}

def preprocess_file(data) -> np.ndarray:
  # Convert RGBA to RGB
  im = Image.open(BytesIO(data)).convert('RGB')
  # Resize According to Tensorflow Input
  im = im.resize((299, 299)) # change-me
  # Change to numpy array
  im = np.array(im)
  return im

if __name__ == "__main__":
  uvicorn.run(fastApiApp, host='0.0.0.0', port=8000)