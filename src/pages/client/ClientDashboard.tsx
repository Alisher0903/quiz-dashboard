import React, { useEffect, useState } from 'react'
import { getMe } from '../../common/global-functions'
import ClientDashboardCard from '../../components/ClientDashboardCard'

const ClientDashboard: React.FC = () => {
  const [getMee, setGetMee] = useState<any>({})

  useEffect(() => {
    getMe(setGetMee)
  }, [setGetMee])

  return (
    <>
      <div>
        <div>
          <p className='text-center text-red-600 dark:text-blue-600 text-3xl font-bold'>Бу сизнинг натижаларингиз</p>
          <p className='text-black dark:text-white text-xl font-bold'>Ҳуш келибсиз, {getMee && getMee.fullName}</p>
        </div>
        <div className='flex gap-5 flex-wrap'>
          <ClientDashboardCard/>
          <ClientDashboardCard/>
          <ClientDashboardCard/>
        </div>
      </div>
    </>
  )
}

export default ClientDashboard