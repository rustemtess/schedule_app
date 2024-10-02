import { useState } from 'react';
import Container from '../../components/Container';
import { API_URL } from '../../module/API';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

interface IAuth {
    setIsAuth: Function
}

const Auth  = ( { setIsAuth }: IAuth ) => {
    
    const [login, setLogin] = useState<string>('+7');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleClick = async () => {
        const form = new FormData();
        form.append('login', login);
        form.append('password', password);
        await fetch(API_URL + 'users/login', {
            method: 'POST',
            body: form
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            }
        }).then(result => {
            if(result.access_token) {
                toast.success('Успешная авторизация');
                setTimeout(() => {
                    localStorage.setItem('access_token', result.access_token)
                    setIsAuth(true)
                    navigate('/');
                }, 2000)
            }else {
                toast.error('Неправильный логин или пароль');
                setPassword('')
            }
        }).catch(e => {
            toast.error('Ошибка запроса');
        });;
    }

    return (
        <Container>
            <div className='flex justify-center items-center w-full min-h-screen p-2 py-4'>
                <div className='flex flex-col justify-center items-center max-w-[400px] w-full gap-3'>
                    <h1 className='text-3xl mb-4'>Вход в систему</h1>
                    <div className='w-full'>
                        <p className='text-[#00000099] text-sm pb-2'>Ном.телефона (без +) или email</p>
                        <input placeholder='7 --- --- -- -- или email' onChange={ (e) => setLogin(e.target.value) } className='border outline-none w-full bg-[#F0F0F0] rounded p-2 px-4'></input>
                    </div>
                    <div className='w-full'>
                        <p className='text-[#00000099] text-sm pb-2'>Введите пароль</p>
                        <input placeholder='Пароль' type='password' onChange={ (e) => setPassword(e.target.value) } className='border outline-none w-full bg-[#F0F0F0] rounded p-2 px-4'></input>
                    </div>
                    <button onClick={ () => handleClick() } className='w-full h-fit bg-black text-white rounded px-4 py-3 hover:bg-gray-800'>Войти в аккаунт</button>
                </div>
            </div>
            <Toaster />
        </Container>
    )
}

export default Auth