import { useState } from "react";
import { API_URL } from "../../module/API";
import { getUsers } from "../../module/API/api.users";
import { getSessionAccessToken } from "../../module/Session";
import { IRegister } from "./register.interface";
import toast, { Toaster } from "react-hot-toast";

const Register = ({ 
    setRegisterForm, 
    setUsers, 
    userId, 
    userPermissionId, 
    permissions 
}: IRegister ) => {

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [middlename, setMiddlename] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [permissionId, setPermissionId] = useState<string>('1');

    let isSubmitting = false;

    const handleClick = async () => {
        if(number.length < 10){
            toast.error('Проверьте корректность номера');
        }
        else if(
            name.trim() !== '' && 
            surname.trim() !== '' &&  
            number.trim() !== '' &&
            password.trim() !== ''
        ) {
            if (isSubmitting) return;
            isSubmitting = true;
    
            const form = new FormData();
            form.append('name', name);
            form.append('surname', surname);
            form.append('middlename', middlename);
            form.append('number', '7' + number);
            form.append('email', email);
            form.append('password', password);
            form.append('permissionId', permissionId);
            form.append('admin_id', String(userId));
            form.append('access_token', getSessionAccessToken());
    
            try {
                const response = await fetch(API_URL + 'users/create', {
                    method: 'POST',
                    body: form
                });
    
                const jsonResponse = await response.json().catch(() => null);
    
                if (response.status === 200) {
                    if (jsonResponse && jsonResponse.error) {
                        toast.error(jsonResponse.error);
                    } else {
                        if (userId) {
                            setRegisterForm(false);
                            setUsers(await getUsers(userId, userPermissionId));
                        }
                    }
                }
            } catch (error) {
                toast.error('Произошла ошибка при запросе');
            } finally {
                isSubmitting = false;
            }
        } 
        else {
            toast.error('Вы не заполнили поле');
        }
    }    

    return (
        <div className='absolute top-0 left-0 flex justify-center items-center min-h-screen w-full p-2' style={ {
            'backgroundColor': 'rgba(0, 0, 0, 0.4)'
        } }>
            <div className='flex flex-col max-w-[400px] h-fit w-full gap-4 bg-white p-4 rounded-md'>
                <div className='flex justify-between py-1'>
                    <h2 className='text-gray-600 text-base'>Форма регистрации</h2>
                    <button onClick={ () => setRegisterForm(false) }>
                        <svg className='fill-gray-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center"><polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414"/></g></svg>
                    </button>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Введите имя</p>
                    <input onChange={ (e) => setName(e.target.value) } className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Введите фамилия</p>
                    <input onChange={ (e) => setSurname(e.target.value) } className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Введите отчество <span className='text-gray-500 italic'>(Необязательно)</span></p>
                    <input onChange={ (e) => setMiddlename(e.target.value) } className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Введите номер телефона</p>
                    <div className='flex items-center rounded bg-[#F0F0F0]'>
                        <p className='outline-none w-fit h-fit text-base px-2 pr-1 py-1.5'>+7</p>
                        <input value={number} onChange={ (e) => {
                            if (e.target.value.length <= 10) 
                                setNumber(e.target.value)
                            else setNumber(e.target.value.substring(0, 10))
                        } } placeholder='--- --- -- --' type='number' className='outline-none bg-transparent w-full h-fit text-base pl-1 px-2 py-1.5'></input>
                    </div>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Введите E-mail <span className='text-gray-500 italic'>(Необязательно)</span></p>
                    <input onChange={ (e) => setEmail(e.target.value) } type='email' className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Придумайте пароль</p>
                    <input onChange={ (e) => setPassword(e.target.value) } className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Права доступа</p>
                    <select onChange={ (e) => setPermissionId(e.target.value) } className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'>
                        { permissions.map( permission => {
                            return (
                                <option 
                                    key={ permission.id } 
                                    value={ permission.id }
                                >{ permission.name }</option>
                            )
                        } ) }
                    </select>
                </div>
                <button onClick={() => handleClick() } className='bg-black text-white p-2 py-2 rounded hover:bg-gray-800'>Зарегистрироваться</button>
            </div>
            <Toaster />
        </div>
    )

}

export default Register;