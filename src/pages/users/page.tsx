import { useState } from "react"
import Container from "../../components/Container"
import Register from "../../components/Register"

const Users = () => {
    
    const [isRegisterForm, setRegisterForm] = useState(false);

    return (
        <Container>
            <section className='max-w-[280px] min-h-screen w-full min-w-[280px] bg-black flex flex-col justify-between'>
                <nav className='flex flex-col text-xl w-full'>
                    <a className='flex items-center gap-3 duration-200 cursor-pointer px-3 py-4 text-[#B0B0B0] w-full hover:bg-[#151515]'>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path fill='#B0B0B0' d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle fill='#B0B0B0' cx="12" cy="15" r="1.5"/><circle fill='#B0B0B0' cx="7" cy="15" r="1.5"/><circle fill='#B0B0B0' cx="17" cy="15" r="1.5"/></svg>
                        <span>Расписание</span>
                    </a>
                    <a className='flex items-center gap-3 duration-200 cursor-pointer px-3 py-4 text-[#B0B0B0] w-full hover:bg-[#151515]'>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path fill='#B0B0B0' d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z"/></svg>
                        <span>Пользователи</span>
                    </a>
                </nav>
                <nav className='flex flex-col text-xl w-full'>
                    <a className='flex items-center gap-3 duration-200 cursor-pointer px-3 py-4 text-[#B0B0B0] w-full hover:bg-[#151515]'>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path fill='#B0B0B0' d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"/><path fill='#B0B0B0' d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"/></svg>
                        <span>
                            Выйти
                        </span>
                    </a>
                </nav>
            </section>
            <section className='w-full min-h-screen flex flex-col'>
                <header className='flex w-full flex items-center justify-between px-4 py-2 border-b-[0.5px] border-gray-200'>
                    <div>
                        {/* <h2 className='text-2xl font-medium'>{ formatDate(new Date()) }</h2> */}
                        <p className='text-base'>Запланирована 6 встреч</p>
                    </div>
                    <div className="flex flex-col justify-left">
                        <h4 className="text-[#000000E5] text-xl">Жумабек Р.Р</h4>
                        <h5 className="text-[#00000099] text-right">Пользователь</h5>
                    </div>
                </header>
                <div className="flex flew-row justify-between gap-2 p-3">
                    <button onClick={ () => setRegisterForm(!isRegisterForm)} className="max-w-[100px] w-full max-h-[50px] bg-[#F04939] rounded-[6px] p-[6px] text-white">Добавить</button>
                    <input placeholder="Поиск..." className='outline-none max-w-[200px] w-full max-h-[50px] bg-[#F0F0F0] rounded-[6px] p-[6px]'></input>
                </div>
                { isRegisterForm && <Register setRegisterForm={ setRegisterForm } /> }
                <div>
                    <table className='flex flex-col w-full juctify-center items-center gap-2'>
                        <tr className='flex w-full items-center text-[#00000099] border-b-[0.5px]'>
                            <th className='w-[450px] w-full'>ФИО</th>
                            <th className='w-[150px] w-full'>Номер</th>
                            <th className='w-[170px] w-full'>Статус</th>
                            <th className='w-[120px] w-full'>Действия</th>
                        </tr>
                        <tr className='flex items-center w-full text-[#00000099]'>
                            <th className='w-[450px] w-full'>Жумабек Рустем Русланұлы</th>
                            <th className='w-[150px] w-full'>77088294278</th>
                            <th className='w-[170px] w-full'>
                                <select className="bg-[#F9F9F9]">
                                    <option value="admin">Администратор</option>
                                    <option value="editor">Редактор</option>
                                    <option value="user">Пользователь</option>
                                </select>
                            </th>
                            <th className='flex flex-row w-[120px] w-full gap-1'>
                                <button className='flex flex-row items-center w-fit h-fit bg-[#F04939] rounded-[5px] p-[4px] text-white '>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_55_324)">
                                            <path d="M6.21798 13.6866C5.93505 13.687 5.6548 13.6356 5.39333 13.5353C5.13187 13.435 4.89434 13.2877 4.6944 13.1019L0.676758 9.3739L1.69248 8.43057L5.71012 12.1592C5.84483 12.2842 6.0275 12.3544 6.21798 12.3544C6.40846 12.3544 6.59114 12.2842 6.72584 12.1592L16.7775 2.83057L17.7932 3.77323L7.74157 13.1019C7.54162 13.2877 7.30409 13.435 7.04263 13.5353C6.78116 13.6356 6.50091 13.687 6.21798 13.6866Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_55_324">
                                                <rect width="17.24" height="16" fill="white" transform="translate(0.61499)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p>Сохранить</p>
                                </button>
                                <button className='flex flex-wrap items-center w-fit h-fit bg-[#F04939] rounded-[5px] p-[8px] text-white'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_55_352)">
                                        <path d="M13.9999 2.66667H11.9333C11.7785 1.91428 11.3691 1.23823 10.7741 0.752479C10.179 0.266727 9.43472 0.000969683 8.66659 0L7.33325 0C6.56512 0.000969683 5.8208 0.266727 5.22575 0.752479C4.63071 1.23823 4.22132 1.91428 4.06659 2.66667H1.99992C1.82311 2.66667 1.65354 2.7369 1.52851 2.86193C1.40349 2.98695 1.33325 3.15652 1.33325 3.33333C1.33325 3.51014 1.40349 3.67971 1.52851 3.80474C1.65354 3.92976 1.82311 4 1.99992 4H2.66659V12.6667C2.66764 13.5504 3.01917 14.3976 3.64407 15.0225C4.26896 15.6474 5.11619 15.9989 5.99992 16H9.99992C10.8836 15.9989 11.7309 15.6474 12.3558 15.0225C12.9807 14.3976 13.3322 13.5504 13.3333 12.6667V4H13.9999C14.1767 4 14.3463 3.92976 14.4713 3.80474C14.5963 3.67971 14.6666 3.51014 14.6666 3.33333C14.6666 3.15652 14.5963 2.98695 14.4713 2.86193C14.3463 2.7369 14.1767 2.66667 13.9999 2.66667ZM7.33325 1.33333H8.66659C9.0801 1.33384 9.48334 1.46225 9.82099 1.70096C10.1587 1.93967 10.4142 2.27699 10.5526 2.66667H5.44725C5.58564 2.27699 5.84119 1.93967 6.17884 1.70096C6.5165 1.46225 6.91974 1.33384 7.33325 1.33333ZM11.9999 12.6667C11.9999 13.1971 11.7892 13.7058 11.4141 14.0809C11.0391 14.456 10.5304 14.6667 9.99992 14.6667H5.99992C5.46949 14.6667 4.96078 14.456 4.58571 14.0809C4.21063 13.7058 3.99992 13.1971 3.99992 12.6667V4H11.9999V12.6667Z" fill="white"/>
                                        <path d="M6.66667 12.0001C6.84348 12.0001 7.01305 11.9298 7.13807 11.8048C7.2631 11.6798 7.33333 11.5102 7.33333 11.3334V7.33341C7.33333 7.1566 7.2631 6.98703 7.13807 6.86201C7.01305 6.73699 6.84348 6.66675 6.66667 6.66675C6.48986 6.66675 6.32029 6.73699 6.19526 6.86201C6.07024 6.98703 6 7.1566 6 7.33341V11.3334C6 11.5102 6.07024 11.6798 6.19526 11.8048C6.32029 11.9298 6.48986 12.0001 6.66667 12.0001Z" fill="white"/>
                                        <path d="M9.33341 12.0001C9.51023 12.0001 9.67979 11.9298 9.80482 11.8048C9.92984 11.6798 10.0001 11.5102 10.0001 11.3334V7.33341C10.0001 7.1566 9.92984 6.98703 9.80482 6.86201C9.67979 6.73699 9.51023 6.66675 9.33341 6.66675C9.1566 6.66675 8.98703 6.73699 8.86201 6.86201C8.73699 6.98703 8.66675 7.1566 8.66675 7.33341V11.3334C8.66675 11.5102 8.73699 11.6798 8.86201 11.8048C8.98703 11.9298 9.1566 12.0001 9.33341 12.0001Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_55_352">
                                            <rect width="16" height="16" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                </button>
                            </th>
                        </tr>
                    </table>
                </div>
            </section>
        </Container>
    )

}

export default Users