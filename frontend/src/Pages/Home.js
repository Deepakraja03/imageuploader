import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../firebase';

const Home = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/image');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.error('Failed to fetch images');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);


  const handleUpload = async () => {
    if (image) {
      const storage = getStorage(app);
      const storageRef = ref(storage, image.name);
      await uploadBytesResumable(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      try {
        const response = await fetch('http://localhost:3000/user/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageURL: downloadURL }),
        });
        if (response.ok) {
          console.log('Image URL stored successfully');
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
      <h1>Images</h1>
      <div>
        {images.map((image) => (
          <div key={image._id}>
            <img src={image.profilePicture} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
