import { useState } from 'react';
import { BiSolidImageAdd } from 'react-icons/bi';
import globalStore from '../common/state-management/globalStore.tsx';
import axios from 'axios';
import { config } from '../common/api/token.tsx';
import { api_videos_upload } from '../common/api/api.tsx';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { setImgUpload } = globalStore();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post(api_videos_upload, formData, config)
      .then(res => {
        if (res.data.success) setImgUpload(res.data.body);
        else setImgUpload([]);
      }).catch(err => {
      console.error(err);
      setImgUpload([]);
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-40 h-28 bg-yellow-100 rounded-lg p-4">
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
        ) : (
          <div className="text-orange-600 text-center">
            <div className={`flex justify-center items-center`}>
              <BiSolidImageAdd className={`text-7xl`} />
            </div>
            <span className="text-black font-semibold text-base">Upload Image</span>
          </div>
        )}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
