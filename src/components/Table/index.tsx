import {  useEffect, useState } from 'react';
import { getDay, getDays, getWeekName, formatDate } from '../../module/Date';
import AddTime from '../AddTime';
import { IDay } from '../../module/Date/interfaces';
import { getList } from '../../module/API/api.date';
import { API_URL } from '../../module/API';
import Info from './Info';
import { IObject, ITable } from './table.interface';

const Table = ({ 
    countMeetToParent, 
    isListAccess = false, 
    isEdit = false, 
    dataList, 
    date = new Date(), 
    userId, 
    isExport = false, 
    user 
}: ITable) => { 

    const [isAddTime, setAddTime] = useState<boolean>(false);
    const [day, setDay] = useState<IDay>( getDay(new Date()) );
    const [data, setData] = useState<Array<IObject>>();
    const [view, setView] = useState<number>(0);
    const [isInfo, setInfo] = useState<boolean>(false);
    const [timeId, setTimeId] = useState<number>();
    const [updated, setUpdated] = useState<number>(0);
    const [isPastDate, setIsPastDate] = useState<boolean>(false);

    const fetchData = async () => {
        setData(await getList())
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setData(dataList)
    }, [dataList, updated]);

    useEffect(() => {
        const currentDate = getDay(new Date(date));

        countMeetToParent(data?.reduce((total, currentObject) => {
            return total + currentObject.dateObjects.reduce((subTotal, currentObjectTime) => {
                if(currentObjectTime.day == currentDate.day)
                    return subTotal + currentObjectTime.timeObjects.length;
                else return subTotal;
            }, 0);
        }, 0));

    }, [data, date]);

    const getDate = () => {
        return getDays(date).map( currentDate => {

            const currentDateAndTime = Number(Math.floor(Date.now() / 1000));
            const oldCurrentDateAndTime = Number(Math.floor(Date.parse(currentDate.date.toDateString()) / 1000));
            
            return (
                <th 
                    key={ `${currentDate.year}-${currentDate.month}-${currentDate.day}` } 
                    className={ `w-[220px] mb-2` }
                >
                    <h1 
                        className={ `${ (!isExport) ? `text-4xl` : `text-5xl mb-2` } font-medium` }
                    >{ currentDate.day }</h1>
                    <p 
                        className={ `${ (!isExport) ? '' : 'text-xl' } text-gray-700 font-normal` }
                    >{ getWeekName(currentDate.weekNumber) }</p>
                    {
                        ( 
                            (isEdit && new Date().toLocaleDateString() == currentDate.date.toLocaleDateString()) 
                            || 
                            (isEdit && currentDateAndTime <= oldCurrentDateAndTime) 
                        ) ? <button 
                                onClick={() => {
                                    setAddTime(true)
                                    setDay( currentDate )
                                }} 
                                className='bg-black text-white w-full p-2 font-normal mt-2 rounded hover:bg-gray-800'
                            >+ Добавить</button>
                        : null
                    }
                </th>
            )
        } )
    }

    return (
        <div className='overflow-x-auto overflow-y-auto w-full mt-3 pb-14'>
            { 
                isAddTime 
                && 
                <AddTime 
                    setDate={ setData } 
                    setAddTime={ setAddTime } 
                    currentDay={ day } 
                /> 
            }
            { 
                isInfo 
                && 
                <Info 
                    setDate={ setData } 
                    userId={ userId } 
                    timeId={ timeId } 
                    setInfo={ setInfo } 
                    edit={ isEdit } 
                    isListAccess={ isListAccess } 
                    isPastDate={isPastDate}
                /> 
            }
            { 
                isExport 
                && 
                <div className='px-6 text-lg font-sans flex items-center justify-between'>
                    <h4 className='text-lg'>Дата таблицы: { formatDate(date) }</h4>
                    <h4>Время распечатки: { formatDate(new Date()) } { new Date().getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() }. Распечатано: { user?.surname } { user?.name } { user?.middlename }</h4>
                </div> 
            }
            <table>
                <tbody>
                    <tr className='flex'>
                        <th className='w-[50px]'></th>
                        { getDate() }
                    </tr>
                    { 
                        data?.map((currentObject, index) => {
                            return <tr key={ index } className='flex'>
                                <td key={ index } className={ `w-[50px] px-2 text-right ${ (!isExport) ? '' : 'text-lg' }` }>{ currentObject.time }</td>
                                { getDays(date).map( (currentDay, index) => (
                                    <td key={ index } className={ `w-[220px] border-[0.5px] flex flex-col gap-1` }>
                                        { currentObject.dateObjects.map( currentObjectTime => {
                                            const selectedDateMonth = Number(date.toLocaleDateString().split('.')[1]);
                                            const currentDateInTableMonth = Number(currentObjectTime.date.split('-')[1]);
                                            const selectedDateYear = Number(date.toLocaleDateString().split('.')[2]);
                                            const currentDateInTableYear = Number(currentObjectTime.date.split('-')[0]);
                                            const currentDateAndTime = Number(Math.floor(Date.now() / 1000));
                                            const oldCurrentDateAndTime = Number(Math.floor(Date.parse(currentDay.date.toDateString()) / 1000));
                                            if(
                                                (selectedDateYear === currentDateInTableYear) &&
                                                (selectedDateMonth === currentDateInTableMonth) &&
                                                ( currentObjectTime.day == currentDay.day)
                                            ) {
                                                
                                                return currentObjectTime.timeObjects.map( (currentTime, index) => {
                                                    return <div key={ index } className='p-1 flex flex-col gap-1.5 rounded px-2 py-2'
                                                    style={ {
                                                        'backgroundColor': `rgba(${currentTime.rgb}, 0.08)`
                                                    } }>
                                                        <div className='flex gap-0.5 justify-between items-start'>
                                                            <h3 className={ `cursor-pointer ${ (!isExport) ? 'text-sm' : 'mt-[-0.5em] text-lg break-all leading-tight' } w-[185px] ${ (currentTime.id != view && !isExport) ? 'truncate' : 'break-words' }` } style={ {
                                                                'color': `${ (!isExport) ? `rgb(${ currentTime.rgb }` : `black` })`
                                                            } }>{ currentTime.text }</h3>
                                                            { !isExport && <button onClick={ (e) => {
                                                                e.stopPropagation()
                                                                setView((currentTime.id != view) ? currentTime.id : 0)
                                                            } }>
                                                                { (currentTime.id != view) ?
                                                                    <svg fill={ `rgb(${ currentTime.rgb })` } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center"><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z"/></g></svg>
                                                                    : 
                                                                    <svg fill={ `rgb(${ currentTime.rgb })` } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center"><path d="M17.293,15.207,12,9.914,6.707,15.207,5.293,13.793,10.586,8.5a2,2,0,0,1,2.828,0l5.293,5.293Z"/></g></svg>
                                                                }
                                                            </button> }
                                                        </div>
                                                        { (currentTime.fileUrl && !isExport) ? <a onClick={(e) => e.stopPropagation()} target='_blank' href={ API_URL + 'files/' + currentTime.fileUrl } className='flex items-center gap-1 text-sm cursor-pointer'>
                                                            <svg fill={ `rgb(${ currentTime.rgb })` } xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14"><path d="m19.949,5.536l-3.484-3.486c-1.323-1.322-3.081-2.05-4.95-2.05h-4.515C4.243,0,2,2.243,2,5v14c0,2.757,2.243,5,5,5h10c2.757,0,5-2.243,5-5v-8.515c0-1.871-.729-3.628-2.051-4.95Zm-1.414,1.415c.318.317.587.67.805,1.05h-4.341c-.552,0-1-.449-1-1V2.659c.38.218.733.487,1.051.805l3.484,3.486Zm1.465,12.05c0,1.654-1.346,3-3,3H7c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h4.515c.163,0,.325.008.485.023v4.977c0,1.654,1.346,3,3,3h4.977c.015.16.023.322.023.485v8.515Zm-4.293-2.895c.391.39.391,1.023,0,1.414l-1.613,1.614c-.577.577-1.336.866-2.094.866s-1.517-.289-2.094-.866l-1.613-1.614c-.391-.391-.391-1.024,0-1.414.391-.391,1.023-.391,1.414,0l1.293,1.293v-4.398c0-.552.447-1,1-1s1,.448,1,1v4.398l1.293-1.293c.391-.391,1.023-.391,1.414,0Z"/></svg>
                                                            <span style={ {
                                                                'color': `rgb(${ currentTime.rgb })`
                                                            } }>Скачать документ</span>
                                                        </a> : null }
                                                        <div className='flex items-center gap-1 text-sm'>
                                                            { !isExport && <svg fill={ `rgb(${ currentTime.rgb })` } xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="14" height="14"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/><path d="M12,6a1,1,0,0,0-1,1v4.325L7.629,13.437a1,1,0,0,0,1.062,1.7l3.84-2.4A1,1,0,0,0,13,11.879V7A1,1,0,0,0,12,6Z"/></svg> }
                                                            <p style={ {
                                                                'color': `${ (!isExport) ? `rgb(${ currentTime.rgb }` : `black` })`
                                                            } }>{ currentTime.time }</p>
                                                        </div>
                                                        { !isExport && <div onClick={ () => {
                                                            setTimeId(currentTime.id)
                                                            setIsPastDate(currentDateAndTime >= oldCurrentDateAndTime)
                                                            setInfo(!isInfo)
                                                        } } className='flex items-center gap-1 cursor-pointer'>
                                                            <svg fill={ `rgb(${ currentTime.rgb })` } xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="14" height="14"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"/><path d="M12,10H11a1,1,0,0,0,0,2h1v6a1,1,0,0,0,2,0V12A2,2,0,0,0,12,10Z"/><circle cx="12" cy="6.5" r="1.5"/></svg>
                                                            <p className='text-sm' style={ {
                                                                'color': `rgb(${ currentTime.rgb })`
                                                            } }>Посмотреть информацию</p>
                                                        </div> }
                                                    </div>                                            
                                            } )
                                            }
                                        } ) }
                                    </td>
                                ) ) }
                            </tr>
                        }) 
                    }
                </tbody>
            </table>
        </div>
    )

}
export default Table