import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Register from '../../components/Register';
import Menu from '../../components/Menu';
import { getPermissions, getUsers } from '../../module/API/api.users';
import { IPermission, IUser } from './interface';
import Header from '../../components/Header';
import { API_URL } from '../../module/API';
import { useNavigate } from 'react-router-dom';
import { getSessionAccessToken } from '../../module/Session';

const Users = ( ) => {
    
    const navigate = useNavigate();
    const [isRegisterForm, setRegisterForm] = useState(false);
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [permissions, setPermissions] = useState<Array<IPermission>>([]);
    const [data, setData] = useState<IUser>();
    const [permissionId, setPermissionId] = useState<number>();
    const [isUpdate, setIsUpdate] = useState<number>(0);
    const [fullname, setFullname] = useState<string>('');
    const [offset, setOffset] = useState<number>(0);
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if(data?.permissionId && data?.permissionId <= 2)
            navigate('/')
    }, [data, isUpdate])
    
    const fetchData = async (
        id: number, 
        permissionId: number, 
        deleted: boolean = false
    ) => {

        try {
            setId(id);

            const usersData = await getUsers(id, permissionId);
            const permissionsData = await getPermissions(permissionId);

            if(deleted)
                getOffsetUsers(offset);
            else {
                setPermissions(permissionsData);
                setUsers(usersData);
            }
        } catch (error) {
            console.error('Error fetching users in component:', error);
        }

    };
    
    useEffect(() => {
        if (data && data.id && data.permissionId) {
            fetchData(data.id, data.permissionId);
        }
    }, [data]);

    const handleDeleteById = async (user_id: number) => {

        const form = new FormData();
        form.append('user_id', String(user_id));
        form.append('access_token', getSessionAccessToken());

        await fetch(API_URL + 'users/delete', {
            method: 'POST',
            body: form
        }).then(response => {
            if(response.status !== 200) 
                document.location.href = '/';
        });

        await fetchData(data.id, data.permissionId, true)
    };

    const fetchSearch = async () => {

        const form = new FormData();
        form.append('fullname', fullname);
        form.append('access_token', getSessionAccessToken());

        await fetch(API_URL + 'users/search', {
            method: 'POST',
            body: form
        }).then(response => {
            if(response.status === 200) 
                return response.json()
            else 
                document.location.href = '/'
        }
        ).then(result => setUsers(result));

    }

    const handleUpdateById = async (user_id: number) => {

        const form = new FormData();
        form.append('user_id', String(user_id));
        form.append('permission_id', String(permissionId));
        form.append('access_token', getSessionAccessToken());

        await fetch(API_URL + 'users/update', {
            method: 'POST',
            body: form
        }).then(response => {
            if(response.status !== 200) 
                document.location.href = '/'
        });

        //await fetchData(data.id, data.permissionId)
        setIsUpdate(isUpdate + 1)

    };

    async function getOffsetUsers(newOffset: number) {
        const usersData = await getUsers(id, permissionId, 10, newOffset);
        setUsers(usersData);
    }

    const handleNextPage = async () => {
        if (users.length > 0)
            setOffset(prev => {
                const newOffset = prev + 10;
                getOffsetUsers(newOffset);
                return newOffset;
            });
    };
    
    const handleBackPage = async () => {
        if((offset - 10) >= 0)
            setOffset(prev => {
                const newOffset = Math.max(prev - 10, 0);
                getOffsetUsers(newOffset);
                return newOffset;
            });
    };

    return (
        <Container>
            <Menu id={2} data={data} />
            <section className='w-full min-h-screen flex flex-col overflow-x-auto pb-14'>
                <Header data={ setData } isUpdated={ isUpdate } >
                    <h2 className='text-2xl font-medium'>Пользователи</h2>
                    <p className='text-base'>В базе найдено { users.length }</p>
                </Header>
                <div className='flex justify-between gap-2 p-3'>
                    
                    <button onClick={ () => setRegisterForm(!isRegisterForm)} className='w-fit h-fit bg-black text-white rounded px-4 py-1.5 pb-2 hover:bg-gray-800'>Добавить</button>
                    <div className='flex items-center gap-1'>
                        <button onClick={ () => fetchSearch() } className='bg-gray-100 border p-2.5 rounded fill-[#2B2B2B] hover:bg-gray-800 hover:fill-white duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><g id="_01_align_center" data-name="01 align center"><path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></g></svg>
                        </button>
                        <input 
                            onChange={ (e) => setFullname(e.target.value) } 
                            onKeyUp={ (e) => {
                                if(e.key === 'Enter') fetchSearch()
                            } } 
                            placeholder='Поиск...' 
                            className='outline-none max-w-[300px] w-full h-fit bg-gray-100 border rounded px-3.5 py-1.5'></input>
                    </div>
                </div>
                { 
                    isRegisterForm 
                    && 
                    <Register 
                        permissions={ permissions } 
                        userPermissionId={ data?.permissionId } 
                        userId={ data?.id } 
                        setRegisterForm={ setRegisterForm } 
                        setUsers={ setUsers } 
                    /> 
                }
                <div className='w-full overflow-x-auto'>
                    <table className='w-full overflow-x-auto'>
                        <tbody className='flex flex-col w-full justify-center items-center gap-2'>
                            <tr className='flex w-full items-center text-[#00000099] border-b-[0.5px] pb-2'>
                                <th className='max-w-[450px] w-full font-normal px-2'>ФИО</th>
                                <th className='max-w-[150px] w-full font-normal px-2'>Номер</th>
                                <th className='max-w-[150px] w-full font-normal px-2'>Почта</th>
                                <th className='max-w-[170px] w-full font-normal px-2'>Статус</th>
                                <th className='max-w-[120px] w-full font-normal px-2'>Действия</th>
                            </tr>
                            { 
                                (users.length > 0) 
                                ? users.map( user => {
                                    if(user.id != data?.id) 
                                        return <tr key={ user.id } className='flex items-center w-full text-gray-800'>
                                                <th className='max-w-[450px] w-full font-normal px-2 text-left'>{ `${user.surname} ${user.name} ${user.middlename}` }</th>
                                                <th className='max-w-[150px] w-full font-normal px-2'>{ user.number }</th>
                                                <th className='max-w-[250px] w-full font-normal px-2 text-left'>{ (user.email === null) ? <p className='italic text-gray-500'>Пустой</p> : user.email }</th>
                                                <th className='max-w-[170px] w-full font-normal px-2 text-left'>
                                                    <select key={user.number} defaultValue={ user.permissionId } onChange={ (e) => setPermissionId(Number(e.target.value)) } className='bg-[#F9F9F9] outline-none cursor-pointer hover:bg-gray-100 p-2 rounded'>
                                                        { 
                                                            (user.permissionId == 4) 
                                                            && 
                                                            <option 
                                                                disabled 
                                                                key={ 4 } 
                                                                value={ 4 }
                                                            >Супер-Администратор</option> 
                                                        }
                                                        { 
                                                            (user.permissionId != 4) 
                                                            && 
                                                            permissions.map( permission => {
                                                                return (
                                                                    <option 
                                                                        key={ permission.id } 
                                                                        selected={ (permission.id === user.permissionId) ? true : false } 
                                                                        value={ permission.id }
                                                                    >{ permission.name }</option>
                                                                )
                                                            }) 
                                                        }
                                                    </select>
                                                </th>
                                                { 
                                                    (user.permissionId != 4) 
                                                    && 
                                                    <th className='flex justify-center w-[120px] w-full gap-1'>
                                                        <button title='Изменить на выбранный статус' onClick={ () => handleUpdateById(user.id) } className='flex items-center w-fit h-fit bg-black rounded p-2 text-white font-normal gap-1.5 px-3 hover:bg-gray-800'>
                                                            <p>Обновить</p>
                                                        </button>
                                                        <button title='Удалить аккаунт' onClick={ () => handleDeleteById(user.id) } className='w-fit h-fit bg-red-500 rounded p-3 hover:bg-gray-800'>
                                                            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                                <g clipPath='url(#clip0_55_352)'>
                                                                    <path d='M13.9999 2.66667H11.9333C11.7785 1.91428 11.3691 1.23823 10.7741 0.752479C10.179 0.266727 9.43472 0.000969683 8.66659 0L7.33325 0C6.56512 0.000969683 5.8208 0.266727 5.22575 0.752479C4.63071 1.23823 4.22132 1.91428 4.06659 2.66667H1.99992C1.82311 2.66667 1.65354 2.7369 1.52851 2.86193C1.40349 2.98695 1.33325 3.15652 1.33325 3.33333C1.33325 3.51014 1.40349 3.67971 1.52851 3.80474C1.65354 3.92976 1.82311 4 1.99992 4H2.66659V12.6667C2.66764 13.5504 3.01917 14.3976 3.64407 15.0225C4.26896 15.6474 5.11619 15.9989 5.99992 16H9.99992C10.8836 15.9989 11.7309 15.6474 12.3558 15.0225C12.9807 14.3976 13.3322 13.5504 13.3333 12.6667V4H13.9999C14.1767 4 14.3463 3.92976 14.4713 3.80474C14.5963 3.67971 14.6666 3.51014 14.6666 3.33333C14.6666 3.15652 14.5963 2.98695 14.4713 2.86193C14.3463 2.7369 14.1767 2.66667 13.9999 2.66667ZM7.33325 1.33333H8.66659C9.0801 1.33384 9.48334 1.46225 9.82099 1.70096C10.1587 1.93967 10.4142 2.27699 10.5526 2.66667H5.44725C5.58564 2.27699 5.84119 1.93967 6.17884 1.70096C6.5165 1.46225 6.91974 1.33384 7.33325 1.33333ZM11.9999 12.6667C11.9999 13.1971 11.7892 13.7058 11.4141 14.0809C11.0391 14.456 10.5304 14.6667 9.99992 14.6667H5.99992C5.46949 14.6667 4.96078 14.456 4.58571 14.0809C4.21063 13.7058 3.99992 13.1971 3.99992 12.6667V4H11.9999V12.6667Z' fill='white'/>
                                                                    <path d='M6.66667 12.0001C6.84348 12.0001 7.01305 11.9298 7.13807 11.8048C7.2631 11.6798 7.33333 11.5102 7.33333 11.3334V7.33341C7.33333 7.1566 7.2631 6.98703 7.13807 6.86201C7.01305 6.73699 6.84348 6.66675 6.66667 6.66675C6.48986 6.66675 6.32029 6.73699 6.19526 6.86201C6.07024 6.98703 6 7.1566 6 7.33341V11.3334C6 11.5102 6.07024 11.6798 6.19526 11.8048C6.32029 11.9298 6.48986 12.0001 6.66667 12.0001Z' fill='white'/>
                                                                    <path d='M9.33341 12.0001C9.51023 12.0001 9.67979 11.9298 9.80482 11.8048C9.92984 11.6798 10.0001 11.5102 10.0001 11.3334V7.33341C10.0001 7.1566 9.92984 6.98703 9.80482 6.86201C9.67979 6.73699 9.51023 6.66675 9.33341 6.66675C9.1566 6.66675 8.98703 6.73699 8.86201 6.86201C8.73699 6.98703 8.66675 7.1566 8.66675 7.33341V11.3334C8.66675 11.5102 8.73699 11.6798 8.86201 11.8048C8.98703 11.9298 9.1566 12.0001 9.33341 12.0001Z' fill='white'/>
                                                                </g>
                                                                <defs>
                                                                    <clipPath id='clip0_55_352'>
                                                                        <rect width='16' height='16' fill='white'/>
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </button>
                                                    </th> 
                                                }
                                                { 
                                                    (user.permissionId == 4) 
                                                    && 
                                                    <th className='flex justify-center max-w-[120px] w-full gap-1'></th> 
                                                }
                                            </tr>
                                    }) 
                                : 
                                    <tr>
                                        <th className='max-w-[450px] w-full font-normal text-gray-500 pt-2 text-sm'>Список пуст</th>
                                    </tr> 
                            }
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-center gap-2 mt-5 mb-3'>
                    <button onClick={() => handleBackPage()} className='bg-black text-white p-2 px-4 rounded hover:bg-gray-800'>
                        ← Назад
                    </button>
                    <button onClick={() => handleNextPage()} className='bg-black text-white p-2 px-4 rounded hover:bg-gray-800'>
                        Вперед →
                    </button>
                </div>
            </section>
        </Container>
    )
}

export default Users;