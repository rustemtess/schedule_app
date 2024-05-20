import { useState, useEffect } from "react";
import { API_URL } from "../../module/API";
import { getDate, getWeekName } from "../../module/Date";
import { IDay, IRGB } from "../../module/Date/interfaces";
import { getColors, getList } from "../../module/API/api.date";
import { getSessionAccessToken } from "../../module/Session";

interface IAddTime {
    setAddTime: Function,
    currentDay: IDay,
    setDate: Function
}

const AddTime = ( { setAddTime, currentDay, setDate }: IAddTime ) => {

    const [time, setTime] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [file, setFile] = useState<File|string>('');
    const [colors, setColors] = useState<Array<IRGB>>();
    const [colorId, setColorId] = useState<number>(1);

    const fetchData = async () => {
        setColors(await getColors());
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = async () => {
        const form = new FormData()
        form.append('date', getDate(currentDay.date));
        form.append('time', time);
        form.append('text', text);
        form.append('file', file);
        form.append('colorId', String(colorId));
        form.append('access_token', getSessionAccessToken());
        await fetch(API_URL + 'date/create', {
            method: 'POST',
            body: form
        });
        setDate(await getList())
        setAddTime(false)
    }

    return (
        <div className='absolute top-0 left-0 w-full min-h-screen flex justify-center items-center' style={ {
            'backgroundColor': 'rgba(0, 0, 0, 0.3)'
        } }>
            <div className='w-full max-w-[500px] h-fit bg-white rounded-md p-4 m-2 flex flex-col gap-2'>
                <div className='flex justify-between py-1'>
                    <h2 className='text-gray-600 text-base'>{ currentDay.day + ' - ' + getWeekName(currentDay.weekNumber) }</h2>
                    <button onClick={ () => setAddTime(false) }>
                        <svg className='fill-gray-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center"><polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414"/></g></svg>
                    </button>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-gray-600 text-sm'><span className='text-red-500 font-bold'>*</span> Указать время</p>
                    <input onChange={(e) => setTime(e.target.value)} className='outline-none border p-1.5 rounded' type='time' />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-gray-600 text-sm'><span className='text-red-500 font-bold'>*</span> Введите текст</p>
                    <textarea onChange={ (e) => setText(e.target.value) } className='border resize-none outline-none p-1.5 rounded min-h-[100px]'>

                    </textarea>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-gray-600 text-sm'><span className='text-gray-500 italic'>(Необязательно)</span> Загрузить файл</p>
                    <input onChange={(e) => {
                            const selectedFile = e.target.files && e.target.files[0]; // Проверяем, не является ли e.target.files null
                            if (selectedFile) {
                                setFile(selectedFile);
                            }
                        }}  className='outline-none border p-1.5 rounded' type='file' 
                        accept=".pdf,.doc,.docx,.txt,.csv,.json" />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-gray-600 text-sm'>Выберите цвет</p>
                    <div className='flex flex-wrap gap-2'>
                        { colors?.map( color => {
                            return <button key={ color.id } className={ `w-[30px] h-[30px] rounded-lg ${ (color.id == colorId) ? 'border-[3px] border-[#BC9CCC]' : null }` }
                            style={ {
                                'backgroundColor': `rgb(${ color.rgb })`
                            } } onClick={ () => setColorId(color.id) }></button>
                        } ) }
                    </div>
                </div>
                <button onClick={ () => handleClick() } className='bg-black text-white p-2 py-2.5 rounded hover:bg-gray-800'>Добавить</button>
            </div>
        </div>
    );

};

export default AddTime;