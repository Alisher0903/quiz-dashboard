import useTestStore from '../../common/state-management/testStore'

const ClientQuizResult = () => {
    const { result } = useTestStore();
    console.log(result);
    

    return (
        <>
            <div className='bg-white flex flex-col items-center dark:bg-[#24303F] w-full rounded-xl p-5'>
                <p className='text-4xl font-bold text-red-600 dark:text-[#3C50E0]'>Congratulations!</p>
                <div>
                    <p>{result}</p>
                </div>
            </div>
        </>
    )
}

export default ClientQuizResult;