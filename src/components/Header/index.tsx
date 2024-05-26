import { ReactNode, useEffect, useState } from "react";
import { IUser } from "../../pages/users/interface";
import { getUser } from "../../module/API/api.users";
import LoadingPage from "../../pages/loading";
import { useMediaQuery } from 'react-responsive';
import { profile } from "console";

interface IHeader {
    children?: ReactNode,
    data?: Function,
    isUpdated?: number
}

const Header = ( { children, data, isUpdated }: IHeader ) => {

    const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isProfile, setProfile] = useState<boolean>(false);

    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    const fetchData = async () => {
        setLoading(true);
        try {
            const userData: IUser = await getUser();
            if(userData.id === undefined) {
                sessionStorage.clear();
                document.location.href = '/';
            }
            setUser(userData);
            if(data) data(userData)
        }catch {
            sessionStorage.clear();
            document.location.href = '/';
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [isUpdated])

    useEffect(() => {
        if(!isMobile) setProfile(false)
    }, [isMobile])

    const PCBlock = () => {
        return <div className="flex items-center justify-right w-full max-w-[300px] gap-3">
            <div className='w-full'>
                <h4 className="text-[#000000E5] text-xl text-right truncate">{ 
                    `${ user?.surname } ${ user?.name.substring(0, 1) }. ${ user?.middlename.substring(0, 1) }.` 
                }</h4>
                <h5 className="mt-[-3px] text-[#00000099] text-right">{ user?.permissionName }</h5>
            </div>
            <a onClick={ () => {
                sessionStorage.clear();
                document.location.href = '/';
                } } title='Выйти' className='flex items-center gap-3 group duration-200 cursor-pointer p-2 text-[#B0B0B0] rounded w-fit fill-[#2B2B2B] hover:bg-[#151515] hover:fill-white'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"/><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"/></svg>
            </a>
        </div>
    }

    const MobileBlock = () => {
        return <div className='w-fit'>
            <button onClick={ () => setProfile(!isProfile) } className='border border-[2px] border-[#1F2937] p-2 rounded-[50%]'>
                <svg className='fill-[#1F2937]' xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>
            </button>
        </div>
    }

    const Profile = () => {
        return (
            <div className='absolute top-[4.8em] right-0 bg-white w-fit flex flex-col px-4 py-2 gap-2 rounded border-[0.5px] border-gray-200'>
                <div className='w-full'>
                    <h4 className="text-[#000000E5] text-xl text-right truncate">{ 
                        `${ user?.surname } ${ user?.name.substring(0, 1) }. ${ user?.middlename.substring(0, 1) }.` 
                    }</h4>
                    <h5 className="mt-[-3px] text-[#00000099] text-right">{ user?.permissionName }</h5>
                </div>
                <a onClick={ () => {
                    sessionStorage.clear();
                    document.location.href = '/';
                    } } title='Выйти' className='flex items-center justify-around bg-red-500 gap-3 group duration-200 cursor-pointer p-2 text-white rounded w-full fill-white hover:bg-[#151515] hover:fill-white hover:text-white'>
                    <span>Выйти</span>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"/><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"/></svg>
                </a>
            </div>
        )
    }

    return (loading) ? <LoadingPage /> : <header className='w-full flex items-center justify-between px-4 py-2 border-b-[0.5px] border-gray-200'>
    <div>
        { children }
    </div>
    { (!isMobile) ? <PCBlock /> : <MobileBlock /> }
    { isProfile && <Profile /> }
</header>
    

};

export default Header;