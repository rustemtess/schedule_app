import { useState, useEffect } from 'react';
import LoadingPage from "../../../pages/loading";
import { API_URL } from "../../../module/API";

interface IList {
    setList: Function,
    meetId: number|undefined
}

interface IMeetData {
    number: string,
    status: string
}

function splitNumber(number: string) {
    number = number.slice(0, 1) + ' ' + number.slice(1);
    number = number.slice(0, 5) + ' ' + number.slice(5);
    number = number.slice(0, 9) + ' ' + number.slice(9);
    return number;
}

const List = ( { setList, meetId }: IList ) => {

    const [data, setData] = useState<IMeetData[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setLoading(true);
        const form = new FormData();
        form.append('meet_id', String(meetId))
        await fetch(API_URL + 'whatsapp/list', {
            method: 'POST',
            body: form
        }).then(response => {
            if(response.status === 200) return response.json()
        }).then(result => {
            setData(result)
            
        }).finally( () => setLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className='absolute top-0 left-0 w-full min-h-screen flex justify-center items-center' style={ {
            'backgroundColor': 'rgba(0, 0, 0, 0.3)'
        } }>
            <div className='w-full max-w-[500px] h-fit bg-white rounded-md p-4 m-2 flex flex-col gap-2'>
                <div className='flex justify-between py-1'>
                    <h2 className='text-gray-600 text-base'>Список из WhatsApp</h2>
                    <button onClick={ () => setList(false) }>
                        <svg className='fill-gray-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center"><polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414"/></g></svg>
                    </button>
                </div>
                <hr />
                { (loading) ? <LoadingPage /> : <div className='flex flex-col gap-2'>
                    
                    { data?.length !== 0 ? <table>
                        <tbody>
                            <tr className='text-sm text-gray-600'>
                                <th className='text-left font-medium pb-3'>Номер телефона</th>
                                <th className='text-right font-medium px-2 pb-3'>Статус</th>
                            </tr>
                            {
                                data && data.map( user => {
                                    return (
                                        <tr>
                                            <td>
                                                <a href={ `tel:+${ user.number }` } className='text-base text-white w-inherit bg-black px-2 py-1.5 rounded flex items-center justify-center gap-2 hover:bg-gray-800'>
                                                    <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14"><path d="M13,1a1,1,0,0,1,1-1A10.011,10.011,0,0,1,24,10a1,1,0,0,1-2,0,8.009,8.009,0,0,0-8-8A1,1,0,0,1,13,1Zm1,5a4,4,0,0,1,4,4,1,1,0,0,0,2,0,6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2Zm9.093,10.739a3.1,3.1,0,0,1,0,4.378l-.91,1.049c-8.19,7.841-28.12-12.084-20.4-20.3l1.15-1A3.081,3.081,0,0,1,7.26.906c.031.031,1.884,2.438,1.884,2.438a3.1,3.1,0,0,1-.007,4.282L7.979,9.082a12.781,12.781,0,0,0,6.931,6.945l1.465-1.165a3.1,3.1,0,0,1,4.281-.006S23.062,16.708,23.093,16.739Zm-1.376,1.454s-2.393-1.841-2.424-1.872a1.1,1.1,0,0,0-1.549,0c-.027.028-2.044,1.635-2.044,1.635a1,1,0,0,1-.979.152A15.009,15.009,0,0,1,5.9,9.3a1,1,0,0,1,.145-1S7.652,6.282,7.679,6.256a1.1,1.1,0,0,0,0-1.549c-.031-.03-1.872-2.425-1.872-2.425a1.1,1.1,0,0,0-1.51.039l-1.15,1C-2.495,10.105,14.776,26.418,20.721,20.8l.911-1.05A1.121,1.121,0,0,0,21.717,18.193Z"/></svg>
                                                    <span>{splitNumber(user.number)}</span>
                                                </a>
                                            </td>
                                            <td className='text-right text-sm px-2'>{ (user.status === '1') ? 'Прочитал(-а)' : 'Отправлено' }</td>
                                        </tr>
                                    )
                                } )
                            }
                        </tbody>
                    </table> : <p className='text-gray-700 text-sm'>Данные будут отображены после отправки уведомления.</p> }
                    
                </div> }
            </div>
        </div>
    );

}

export default List;