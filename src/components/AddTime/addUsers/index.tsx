import {useState, useEffect} from 'react';
import LoadingPage from '../../../pages/loading';
import { API_URL } from '../../../module/API';
import { getSessionAccessToken } from '../../../module/Session';
import { IAddUsers, IUserList } from './addusers.interface';

export const AddUsers = ({ setAddUsers, setSelectList, list }: IAddUsers) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Array<IUserList>>();

    const fetchData = async () => {
        setLoading(true);

        const form = new FormData();
        form.append('access_token', getSessionAccessToken());

        try {

            const response = await fetch(API_URL + 'users/list', {
                method: 'POST',
                body: form
            });

            if (response.status === 200) {
                const result = await response.json();
                const initializedData = result.map((item: IUserList) => ({
                    ...item,
                    selected: false
                }));

                setData(initializedData);
            }else
                document.location.href = '/';

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if(list !== undefined){
            setData(list)
            setLoading(false)
        }

        fetchData()

    }, [list]);

    const handleCheckboxChange = (id: number) => {
        setData(prevData =>
            prevData?.map(item =>
                item.id === id 
                    ? { ...item, selected: !item.selected } 
                    : item
            )
        );
    };

    return (
        <div className='absolute top-0 left-0 w-full min-h-screen flex justify-center items-center' style={ {
            'backgroundColor': 'rgba(0, 0, 0, 0.3)'
        } }>
            <div className='w-full max-w-[500px] h-fit bg-white rounded-md p-4 m-2 flex flex-col gap-2'>
                <div className='flex justify-between py-1'>
                    <h2 className='text-gray-600 text-base'>Список пользователей</h2>
                    <button onClick={ () => setAddUsers(false) }>
                        <svg className='fill-gray-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center"><polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414"/></g></svg>
                    </button>
                </div>
                <hr />
                { 
                    (loading) 
                    ? <LoadingPage /> 
                    : <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1 max-h-[280px] overflow-auto px-1'>
                            {
                                (!data) ? 'Ошибка запроса' : data?.map(e => {
                                    return <div key={e.id} className='flex gap-2 items-center text-gray-700'>
                                    <input 
                                        checked={ e.selected } 
                                        key={e.id} 
                                        onChange={() => {
                                            handleCheckboxChange(e.id)
                                        }} 
                                        type='checkbox' 
                                        className='scale-125' 
                                    />
                                    <p>{ `${e.surname} ${e.name} ${e.middlename}` }</p>
                                </div>
                                })
                            }
                        </div>
                        <button 
                            onClick={() => {
                                setSelectList(data)
                                setAddUsers(false)
                            }} 
                            className='bg-black text-white p-2 py-2.5 rounded hover:bg-gray-800'>
                        Сохранить
                        </button>
                    </div> 
                }
            </div>   
        </div>
    );

};