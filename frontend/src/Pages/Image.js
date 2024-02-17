import React from 'react'
import { useEffect, useState } from 'react';

const Image = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
          try {
            const response = await fetch('https://imageuploader-backend.vercel.app/user/image');
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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