import { useState } from "react";
import { API_URL } from "../../module/API";
import { getUsers } from "../../module/API/api.users";

interface IRegister {
    setRegisterForm: Function,
    setUsers: Function
}

const Register = ( { setRegisterForm, setUsers }: IRegister ) => {

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [middlename, setMiddlename] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [permissionId, setPermissionId] = useState<string>('1');

    const handleClick = async () => {
        const form = new FormData();
        form.append('name', name);
        form.append('surname', surname);
        form.append('middlename', middlename);
        form.append('number', number);
        form.append('email', email);
        form.append('password', password);
        form.append('permissionId', permissionId);
        await fetch(API_URL + 'users/create', {
            method: 'POST',
            body: form
        })
        setUsers(await getUsers());
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
                    <p className='text-[#00000099] mb-1.5'>Введите отчество</p>
                    <input onChange={ (e) => setMiddlename(e.target.value) } className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Введите номер телефона (без +)</p>
                    <input onChange={ (e) => {
                        if (e.target.value.length <= 11) setNumber(e.target.value)
                        else setNumber(e.target.value.substring(0, 11))
                    } } placeholder='7 --- --- -- --' type='number' value={number} className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Введите E-mail</p>
                    <input onChange={ (e) => setEmail(e.target.value) } type='email' className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Придумайте пароль</p>
                    <input onChange={ (e) => setPassword(e.target.value) } className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'></input>
                </div>
                <div className='w-full text-sm'>
                    <p className='text-[#00000099] mb-1.5'>Права доступа</p>
                    <select onChange={ (e) => setPermissionId(e.target.value) } className='outline-none w-full h-fit bg-[#F0F0F0] text-base rounded px-2 py-1.5'>
                        <option value={1}>Пользователь</option>
                        <option value={2}>Редактор</option>
                        <option value={3}>Администратор</option>
                    </select>
                </div>
                <button onClick={() => handleClick() } className='bg-black text-white p-2 py-2 rounded hover:bg-gray-800'>Зарегистрироваться</button>
            </div>
        </div>
    )

}

export default Register;