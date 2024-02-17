import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../firebase';

const Home = () => {
  const [image, setImage] = useState(null);


  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (image) {
      const storage = getStorage(app);
      const storageRef = ref(storage, image.name);
      await uploadBytesResumable(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      try {
        const response = await fetch('https://imageuploader-backend.vercel.app/user/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageURL: downloadURL }),
        });
        if (response.ok) {
          alert("Image Successfully Uploaded")
          console.log('Image URL stored successfully');
          setImage(null);
        } else {
          console.error('Error storing image URL:', response.statusText);
        }
      } catch (error) {
        alert('error');
        console.error('Error storing image URL:', error);
      }
    } else {
      console.error('No image selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      
    </div>
  );
};

export default Home;
