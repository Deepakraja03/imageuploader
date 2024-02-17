import React from 'react'
import { useEffect, useState } from 'react';

const Image = () => {
    const [images, setImages] = useState([]);
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

  return (
    <div>
        <h1>
        Image
        </h1>
        <div>
        {images.map((image) => (
          <div key={image._id}>
            <img src={image.profilePicture} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default Image;