import React from 'react';
import { CategoryClientList } from '../types/category';
import defaultIMage from '../images/default.png'
import AddButtons from './buttons/buttons';
import { Image } from 'antd';

const CategoryCard: React.FC<{ data: CategoryClientList, onClick: () => void }> = ({ data, onClick }) => {
    return (
        <div className="flex border mt-3 p-4 rounded-lg shadow-md">
            <div className="w-1/4">
                <Image
                    src={defaultIMage}
                    alt="Category image"
                    className="w-full object-cover h-auto rounded"
                />
            </div>
            <div className="w-3/4 pl-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Ёналиш:</span>
                    <span className="font-semibold text">{data.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Вақт:</span>
                    <span className="text-gray-700">{data.duration} minut</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Саволлар:</span>
                    <span className="text-gray-700">{data.questionCount} ta</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Қайта топшириш:</span>
                    <span className="text-gray-700">{data.retakeDate} kun</span>
                </div>
                <div className="text-right">
                    <AddButtons onClick={onClick}>Бошлаш</AddButtons>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
