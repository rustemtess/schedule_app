import {  useEffect, useState } from 'react';
import { IObject } from './interfaces';
import { getDay, getDays, getWeekName } from '../../module/Date';
import AddTime from '../AddTime';
import { IDay } from '../../module/Date/interfaces';
import { getList } from '../../module/API/api.date';

interface ITable {
    countMeetToParent: Function
}

const Table = ({ countMeetToParent }: ITable) => { 

    const [isAddTime, setAddTime] = useState<boolean>(false);
    const [day, setDay] = useState<IDay>( getDay(new Date()) );
    const [data, setData] = useState<Array<IObject>>();

    useEffect(() => {
        const fetchData = async () => {
            setData(await getList())
        };
        fetchData();
    }, []);

    useEffect(() => {
        const currentDate = getDay(new Date());
        countMeetToParent(data?.reduce((total, currentObject) => {
            return total + currentObject.dateObjects.reduce((subTotal, currentObjectTime) => {
                if(currentObjectTime.date == currentDate.day)
                    return subTotal + currentObjectTime.timeObjects.length;
                else return subTotal;
            }, 0);
        }, 0));
    }, [data]);

    const getDate = () => {
        return getDays().map( currentDate => (
            <th key={ `${currentDate.year}-${currentDate.month}-${currentDate.day}` } className={ `w-[220px] mb-2` }>
                <h1 className='text-4xl font-medium'>{ currentDate.day }</h1>
                <p className='text-gray-700 font-normal'>{ getWeekName(currentDate.weekNumber) }</p>
                <button onClick={() => {
                    setAddTime(true)
                    setDay( currentDate )
                }} className='bg-black text-white w-full p-2 font-normal mt-2 rounded hover:bg-gray-800'>+ Добавить</button>
            </th>
        ) )
    }

    return (
        <div className='overflow-x-auto w-full mt-3'>
            { isAddTime && <AddTime setDate={ setData } setAddTime={ setAddTime } currentDay={ day } /> }
            <table>
                <tbody>
                    <tr className='flex'>
                        <th className='w-[50px]'></th>
                        { getDate() }
                    </tr>
                    { data?.map( (currentObject, index) => (
                        <tr key={ index } className='flex'>
                            <td key={ index } className='w-[50px] px-2 text-right '>{ currentObject.time }</td>
                            { getDays().map( (currentDay, index) => (
                                <td key={ index } className={ `w-[220px] border-[0.5px] flex flex-col` }>
                                    { currentObject.dateObjects.map( currentObjectTime => {
                                        if( currentObjectTime.date == currentDay.day ) {
                                            return currentObjectTime.timeObjects.map( (currentTime, index) => {
                                                return <div key={ index } className='p-2'>
                                                    <h3 className='text-sm'>{ currentTime.text }</h3>
                                                </div>                                            
                                        } )
                                        }
                                    } ) }
                                </td>
                            ) ) }
                        </tr>
                    ) ) }
                </tbody>
            </table>
        </div>
    )

}
export default Table