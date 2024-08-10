import React from 'react';
import defaultIMage from '../images/default.png'

const ClientDashboardCard: React.FC = () => {
    return (
        <div className="w-[32%] border-2 border-black dark:border-white p-4 rounded-md">
            <div className="flex items-center justify-center mb-4">
                <img
                    src={defaultIMage}
                    alt="Your Image"
                    className="h-40 w-full  object-cover"
                />
            </div>

            <div className="text-center">
                <p className="font-bold text-lg text-red-600 dark:text-blue-600 mb-2">Topografiya</p>
                <div className='flex justify-between'>
                    <div className='flex flex-col items-start'>
                        <p>To'g'ri javoblar:</p>
                        <p>Vaqt:</p>
                        <p>Ball:</p>
                        <p>Sana:</p>
                    </div>
                    <div className='flex flex-col items-end'>
                        <strong>28/40</strong>
                        <strong>15m/28m</strong>
                        <strong>78/112</strong>
                        <strong>6 Avg 2024</strong>
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-green-500 text-white py-2 px-4 flex justify-center items-center rounded">
                Tasdiqlandi
            </div>
        </div>
    );
};

export default ClientDashboardCard;
