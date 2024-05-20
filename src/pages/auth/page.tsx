import { useState } from 'react';
import Container from '../../components/Container';
import { API_URL } from '../../module/API';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

interface IAuth {
    setIsAuth: Function
}

const Auth  = ( { setIsAuth }: IAuth ) => {
    
    const [login, setLogin] = useState<string>('');
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
                toast.success('Successful authentication');
                setTimeout(() => {
                    sessionStorage.setItem('access_token', result.access_token)
                    setIsAuth(true)
                    navigate('/');
                }, 2000)
            }else {
                toast.error('Login or password is incorrect');
            }
        }).catch(e => {
            toast.error('fetch failed');
        });;
    }

    return (
        <Container>
            <div className='flex justify-center items-center w-full min-h-screen p-2 py-4'>
                <div className='flex flex-col justify-center items-center max-w-[400px] w-full gap-3'>
                    <div className='w-full flex flex-col justify-center items-center pb-3'>
                        <svg width='172' height='48' viewBox='0 0 172 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M1.38972 18.12V15L15.1897 15.024C15.8937 15.024 16.4297 14.864 16.7977 14.544C17.1817 14.208 17.3737 13.672 17.3737 12.936C17.3737 12.2 17.1817 11.672 16.7977 11.352C16.4297 11.016 15.8937 10.848 15.1897 10.848H6.59772C4.82172 10.848 3.43772 10.424 2.44572 9.576C1.46972 8.712 0.981719 7.448 0.981719 5.784C0.981719 4.12 1.46972 2.864 2.44572 2.016C3.43772 1.152 4.82172 0.719999 6.59772 0.719999H20.0857V3.84L7.00572 3.816C6.31772 3.816 5.78172 3.976 5.39772 4.296C5.01372 4.6 4.82172 5.096 4.82172 5.784C4.82172 6.472 5.01372 6.976 5.39772 7.296C5.78172 7.6 6.31772 7.752 7.00572 7.752H15.5977C17.3737 7.752 18.7497 8.192 19.7257 9.072C20.7177 9.936 21.2137 11.224 21.2137 12.936C21.2137 14.632 20.7177 15.92 19.7257 16.8C18.7497 17.68 17.3737 18.12 15.5977 18.12H1.38972ZM32.4534 18.12C29.2854 18.12 26.8614 17.392 25.1814 15.936C23.5014 14.464 22.6614 12.288 22.6614 9.408C22.6614 6.544 23.5014 4.376 25.1814 2.904C26.8614 1.432 29.2854 0.704 32.4534 0.719999L41.0934 0.767999V3.84H32.7174C30.6374 3.84 29.0934 4.28 28.0854 5.16C27.0774 6.04 26.5734 7.456 26.5734 9.408C26.5734 11.36 27.0774 12.784 28.0854 13.68C29.0934 14.56 30.6374 15 32.7174 15H41.3334V18.12H32.4534ZM43.7308 18V0.839999H47.5708V7.872H59.6668V0.839999H63.5068V18H59.6668V10.992H47.5708V18H43.7308ZM66.8636 18V0.839999H85.6796V3.96H70.7036V7.752H84.2876V10.872H70.7036V14.88H85.6796V18H66.8636ZM88.3089 18V0.839999H91.1409L98.8209 0.816C101.925 0.816 104.333 1.544 106.045 3C107.757 4.456 108.613 6.592 108.613 9.408C108.613 12.224 107.757 14.36 106.045 15.816C104.333 17.272 101.925 18 98.8209 18H88.3089ZM98.5569 3.936H92.1489V14.88H98.5569C100.573 14.88 102.101 14.44 103.141 13.56C104.181 12.68 104.701 11.296 104.701 9.408C104.701 7.504 104.181 6.12 103.141 5.256C102.101 4.376 100.573 3.936 98.5569 3.936ZM117.956 18.12C116.212 18.12 114.836 17.896 113.828 17.448C112.82 16.984 112.1 16.288 111.668 15.36C111.236 14.432 111.02 13.264 111.02 11.856V0.839999H114.86V11.856C114.86 13.072 115.14 13.904 115.7 14.352C116.276 14.784 117.244 15 118.604 15H123.236C124.596 15 125.556 14.784 126.116 14.352C126.692 13.904 126.98 13.072 126.98 11.856V0.839999H130.82V11.856C130.82 13.264 130.604 14.432 130.172 15.36C129.74 16.288 129.02 16.984 128.012 17.448C127.004 17.896 125.628 18.12 123.884 18.12H117.956ZM134.176 18V0.839999H138.016V14.88H150.568V18H134.176ZM152.973 18V0.839999H171.789V3.96H156.813V7.752H170.397V10.872H156.813V14.88H171.789V18H152.973Z' fill='#BC9CCC'/>
                            <path d='M20.1046 47.12V44L33.9046 44.024C34.6086 44.024 35.1446 43.864 35.5126 43.544C35.8966 43.208 36.0886 42.672 36.0886 41.936C36.0886 41.2 35.8966 40.672 35.5126 40.352C35.1446 40.016 34.6086 39.848 33.9046 39.848H25.3126C23.5366 39.848 22.1526 39.424 21.1606 38.576C20.1846 37.712 19.6966 36.448 19.6966 34.784C19.6966 33.12 20.1846 31.864 21.1606 31.016C22.1526 30.152 23.5366 29.72 25.3126 29.72H38.8006V32.84L25.7206 32.816C25.0326 32.816 24.4966 32.976 24.1126 33.296C23.7286 33.6 23.5366 34.096 23.5366 34.784C23.5366 35.472 23.7286 35.976 24.1126 36.296C24.4966 36.6 25.0326 36.752 25.7206 36.752H34.3126C36.0886 36.752 37.4646 37.192 38.4406 38.072C39.4326 38.936 39.9286 40.224 39.9286 41.936C39.9286 43.632 39.4326 44.92 38.4406 45.8C37.4646 46.68 36.0886 47.12 34.3126 47.12H20.1046ZM48.9085 47V40.88L39.8125 29.84H44.5645L50.8285 37.616L57.0685 29.84H61.8205L52.7725 40.856V47H48.9085ZM62.9483 47.12V44L76.7483 44.024C77.4523 44.024 77.9883 43.864 78.3563 43.544C78.7403 43.208 78.9323 42.672 78.9323 41.936C78.9323 41.2 78.7403 40.672 78.3563 40.352C77.9883 40.016 77.4523 39.848 76.7483 39.848H68.1563C66.3803 39.848 64.9963 39.424 64.0043 38.576C63.0283 37.712 62.5403 36.448 62.5403 34.784C62.5403 33.12 63.0283 31.864 64.0043 31.016C64.9963 30.152 66.3803 29.72 68.1563 29.72H81.6443V32.84L68.5643 32.816C67.8763 32.816 67.3403 32.976 66.9563 33.296C66.5723 33.6 66.3803 34.096 66.3803 34.784C66.3803 35.472 66.5723 35.976 66.9563 36.296C67.3403 36.6 67.8763 36.752 68.5643 36.752H77.1563C78.9323 36.752 80.3083 37.192 81.2843 38.072C82.2763 38.936 82.7723 40.224 82.7723 41.936C82.7723 43.632 82.2763 44.92 81.2843 45.8C80.3083 46.68 78.9323 47.12 77.1563 47.12H62.9483ZM84.58 38.528V29.84H105.7V38.528H101.812V32.96H96.58V47H92.74V32.96H88.468V38.528H84.58ZM108.453 47V29.84H127.269V32.96H112.293V36.752H125.877V39.872H112.293V43.88H127.269V47H108.453ZM129.899 47V29.84H133.115L141.059 35.408H141.179L149.123 29.84H152.339V47H148.499V34.64L143.051 38.288V47H139.211V38.288L133.739 34.64V47H129.899Z' fill='black'/>
                        </svg>
                    </div>
                    <div className='w-full'>
                        <p className='text-[#00000099] text-sm pb-2'>Ном.телефона или E-mail</p>
                        <input onChange={ (e) => setLogin(e.target.value) } className='border outline-none w-full bg-[#F0F0F0] rounded p-2 px-4'></input>
                    </div>
                    <div className='w-full'>
                        <p className='text-[#00000099] text-sm pb-2'>Введите пароль</p>
                        <input type='password' onChange={ (e) => setPassword(e.target.value) } className='border outline-none w-full bg-[#F0F0F0] rounded p-2 px-4'></input>
                    </div>
                    <button onClick={ () => handleClick() } className='w-full h-fit bg-black text-white rounded px-4 py-3 hover:bg-gray-800'>Войти в аккаунт</button>
                </div>
            </div>
            <Toaster />
        </Container>
    )
}

export default Auth