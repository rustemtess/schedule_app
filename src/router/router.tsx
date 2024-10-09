import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getSessionAccessToken } from "../module/Session";

const Router = () => {

    const [isAuth, setIsAuth] = useState<boolean>(false);

    const Auth = lazy(() => import('../pages/auth'));
    const Index = lazy(() => import('../pages/index'));
    const Users = lazy(() => import('../pages/users'));

    useEffect(() => {

        if(getSessionAccessToken() !== '') 
            setIsAuth(true);
        else 
            setIsAuth(false);
        
    }, [])

    return (
        <Suspense fallback={ <h1>Loading...</h1> }>
            <BrowserRouter>
                <Routes>
                    { 
                        !isAuth 
                        && 
                        <Route 
                            path='/' 
                            element={ <Auth setIsAuth={ setIsAuth } /> } 
                        /> 
                    }
                    {
                        isAuth 
                        && 
                        <>
                            <Route path='/' element={ <Index /> } />
                            <Route path='/users' element={ <Users  /> } />
                        </>
                    }
                    <Route 
                        path='*' 
                        element={ 
                            <h1 className='text-gray-900 w-full min-h-screen bg-white flex justify-center items-center text-xl'
                            >Страница не найдена</h1> } 
                    />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )

}

export default Router;