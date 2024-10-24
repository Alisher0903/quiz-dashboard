import React from 'react';
import { CategoryClientList } from '../types/category';
import defaultIMage from '../images/default.png';
import AddButtons from './buttons/buttons';
import { Image } from 'antd';
import { api_videos_files } from '../common/api/api';

const CategoryCard: React.FC<{ data: CategoryClientList, onClick: () => void }> = ({ data, onClick }) => {
  return (
    <div className="flex flex-col lg:flex-row border mt-3 p-4 rounded-lg shadow-md">
      <div className="w-full lg:w-auto flex items-center justify-center my-3">
        <Image
          src={data.fileId ? api_videos_files + data.fileId : defaultIMage}
          alt="Category image"
          height={150}
          width={270}
          className="object-cover rounded"
        />
      </div>
      <div className="lg:w-3/4 w-full pl-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Йўналиш:</span>
          <span className="font-semibold text">{data.name}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Тест ишлашга ажратилган вақт:</span>
          <span className="text-gray-700">{data.duration} (дақ.)</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Саволлар сони:</span>
          <span className="text-gray-700">{data.questionCount} та</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Қайта топшириш вақти:</span>
          <span className="text-gray-700">{data.retakeDate} кундан кейин</span>
        </div>
        <div className="text-right">
          <AddButtons
            className={'shadow-switcher rounded-3xl scale-150 mr-5 hover:bg-green-500 duration-300 hover:dark:bg-white hover:dark:text-black'}
            onClick={onClick}
          >
            Бошлаш
          </AddButtons>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
