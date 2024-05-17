import { ReactHTML, ReactHTMLElement } from 'react';
import { IDate, IObject, IDateObject, ITimeObject } from './interfaces';
import { getDays } from '../../module/Date';

interface ITable {
    widthBlock?: number
}

const Table = ({ widthBlock = 200 }: ITable) => { 

    const data: IObject[] = [
        {
            time: '8:00',
            dateObjects: [
                {
                    date: 19,
                    timeObjects: [
                        {
                            id: 1,
                            text: 'Селектор с акимами городов и районов по вопросам КВИ',
                            time: '8:10',
                            fileUrl: null
                        },
                        {
                            id: 1,
                            text: 'Селектор с акимами городов и районов по вопросам КВИ',
                            fileUrl: null,
                            time: '8:20',
                        }
                    ]  
                }
            ] 
        },
        {
            time: '9:00',
            dateObjects: [
                {
                    date: 23,
                    timeObjects: [
                        {
                            id: 1,
                            text: 'Селектор с акимами городов и районов по вопросам КВИ',
                            time: '8:10',
                            fileUrl: null
                        },
                        {
                            id: 1,
                            text: 'Селектор с акимами городов и районов по вопросам КВИ',
                            fileUrl: null,
                            time: '8:20',
                        }
                    ]  
                },
                {
                    date: 22,
                    timeObjects: [
                        {
                            id: 1,
                            text: 'Селектор с акимами городов и районов по вопросам КВИ',
                            time: '8:10',
                            fileUrl: null
                        },
                        {
                            id: 1,
                            text: 'Селектор с акимами городов и районов по вопросам КВИ',
                            fileUrl: null,
                            time: '8:20',
                        }
                    ]  
                }
            ] 
        }
    ];
    

    const getDate = () => {
        return getDays().map( currentDate => (
            <th key={ `${currentDate.year}-${currentDate.month}-${currentDate.day}` } className={ `w-[${ widthBlock }px]` }>
                <h1 className='text-4xl font-medium'>{ currentDate.day }</h1>
                <p className='text-gray-700 font-normal'>{ currentDate.weekName }</p>
            </th>
        ) )
    }

    return (
        <div className='overflow-x-auto w-full mt-3'>
            <table>
                <tr className='flex'>
                    <th className='w-[60px]'></th>
                    { getDate() }
                </tr>
                <tr className='flex'>
                    <th className='w-[50px]'></th>
                    <th className={ `w-[${ widthBlock }px] py-1.5` }>
                        <button className="bg-black text-white w-full p-2 font-normal">+ Добавить</button>
                    </th>
                    <th className={ `w-[${ widthBlock }px] py-1.5` }>
                        <button className="bg-black text-white w-full p-2 font-normal">+ Добавить</button>
                    </th>
                    <th className={ `w-[${ widthBlock }px] py-1.5` }>
                        <button className="bg-black text-white w-full p-2 font-normal">+ Добавить</button>
                    </th>
                    <th className={ `w-[${ widthBlock }px] py-1.5` }>
                        <button className="bg-black text-white w-full p-2 font-normal">+ Добавить</button>  
                    </th>
                    <th className={ `w-[${ widthBlock }px] py-1.5` }>
                        <button className="bg-black text-white w-full p-2 font-normal">+ Добавить</button>
                    </th>
                    <th className={ `w-[${ widthBlock }px] py-1.5` }>
                        <button className="bg-black text-white w-full p-2 font-normal">+ Добавить</button>
                    </th>
                    <th className={ `w-[${ widthBlock }px] py-1.5` }>
                        <button className="bg-black text-white w-full p-2 font-normal">+ Добавить</button>
                    </th>
                </tr>
                { data.map( currentObject => (
                    <tr className='flex'>
                        <td className='w-[50px] px-2 text-right '>{ currentObject.time }</td>
                        { getDays().map( currentDay => (
                            <td className={ `w-[${ widthBlock }px] border-[0.5px] flex flex-col` }>
                                { currentObject.dateObjects.map( currentObjectTime => {
                                    if( currentObjectTime.date === currentDay.day ) {
                                        return currentObjectTime.timeObjects.map( currentTime => (
                                            <div>
                                                <h3>{ currentTime.text }</h3>
                                            </div>                                            
                                        ) )
                                    }
                                } ) }
                            </td>
                        ) ) }
                    </tr>
                ) ) }
            </table>
        </div>
    )

}
export default Table