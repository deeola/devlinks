import React, { useState } from 'react';

const ImageUploadComponent: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        console.log('Image uploaded:', reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="upload-container ">
        {uploadedImage ? (
          <div
            className="uploaded-image"
            style={{ backgroundImage: `url(${uploadedImage})` }}
          >
            <span onClick={() => setUploadedImage(null)}>Change Image</span>
          </div>
        ) : (
          <label className="upload-label">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="upload-input"
            />
            <div className="upload-icon">Icon</div>
            <span>Upload Image</span>
          </label>
        )}
      </div>
      <div className="status-text">
        {uploadedImage ? 'Image Uploaded' : 'Image Not Uploaded'}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
