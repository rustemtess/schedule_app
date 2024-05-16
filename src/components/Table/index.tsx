const Table = () => {

    return (
        <div className='flex flex-col max-w-[1400px] overflow-x-auto'>
            <div className='flex'>
                <p className='w-[60px] text-left'></p>
                <div className='min-w-[200px] w-[200px] w-full flex flex-col items-center'>
                    <h1 className='text-4xl font-medium'>05</h1>
                    <p className='text-gray-700'>Понидельник</p>
                </div>
                <div className='min-w-[200px] w-[200px] w-full flex flex-col items-center'>
                    <h1 className='text-4xl font-medium'>06</h1>
                    <p className='text-gray-700'>Вторник</p>            
                </div>
                <div className='min-w-[200px] w-[200px] w-full flex flex-col items-center'>
                    <h1 className='text-4xl font-medium'>07</h1>
                    <p className='text-gray-700'>Среда</p>          
                </div>
                <div className='min-w-[200px] w-[200px] w-full flex flex-col items-center'>
                    <h1 className='text-4xl font-medium'>08</h1>
                    <p className='text-gray-700'>Четверг</p>           
                </div>
                <div className='min-w-[200px] w-[200px] w-full flex flex-col items-center'>
                    <h1 className='text-4xl font-medium'>09</h1>
                    <p className='text-gray-700'>Пятница</p>          
                </div>
                <div className='min-w-[200px] w-[200px] w-full flex flex-col items-center'>
                    <h1 className='text-4xl font-medium'>10</h1>
                    <p className='text-gray-700'>Суббота</p>       
                </div>
                <div className='min-w-[200px] w-[200px] w-full flex flex-col items-center'>
                    <h1 className='text-4xl font-medium'>11</h1>
                    <p className='text-gray-700'>Воскресенье</p>          
                </div>
            </div>
            <div className='w-full border-t-[0.5px]'>
                <p className='min-w-[60px] w-[60px] text-right'>8:00</p>
            </div>
            <div className='w-full border-t-[0.5px]'>
                <p className='min-w-[60px] w-[60px] text-right'>9:00</p>
            </div>
        </div>
    )

};

export default Table;