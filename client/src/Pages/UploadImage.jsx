import React, { useState } from 'react';
// import { AdvancedImage } from '@cloudinary/react';
import { useNavigate } from 'react-router-dom';

const UploadImage = ({ onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dhawap1lt',
        uploadPreset: 'your_upload_preset', 
        sources: ['local', 'url'],
        multiple: false,
        resourceType: 'image',
        showAdvancedOptions: true,
        cropping: true,
        croppingAspectRatio: 1, 
      },
      (error, result) => {
        if (result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
          onImageUpload(result.info.secure_url);
        }
      }
    );
    widget.open();

  };

  return (
    <div className="upload-image-container">
      <button
        onClick={handleImageUpload}
        className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
      >
        Upload Image
      </button>
      {/* {imageUrl && <AdvancedImage cldImg={{ publicId: imageUrl }} />} */}
    </div>
  );
};

export default UploadImage;
