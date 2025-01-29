import React, { useState } from 'react';

const UploadImage = ({ onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      onImageUpload(imageUrl);
    }
  };

  return (
    <div className="upload-image-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" 
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        Upload Image
      </label>

      {imageUrl && <img src={imageUrl} alt="Selected" className="mt-4 w-32 h-32 object-cover rounded-full" />}
    </div>
  );
};

export default UploadImage;
