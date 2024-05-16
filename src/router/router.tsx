import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {

    const Auth = lazy(() => import('../pages/auth'));
    const Index = lazy(() => import('../pages/index'));
    const Users = lazy(() => import('../pages/users'));

    return (
        <Suspense fallback={ <h1>Loading...</h1> }>
            <BrowserRouter>
                <Routes>
                    <Route path='/auth' element={ <Auth /> } />
                    <Route path='/' element={ <Index /> } />
                    <Route path='/users' element={ <Users />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )

}

export default Router;