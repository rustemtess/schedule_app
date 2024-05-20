import { ReactNode, useEffect, useState } from "react";
import { IUser } from "../../pages/users/interface";
import { getUser } from "../../module/API/api.users";
import LoadingPage from "../../pages/loading";

interface IHeader {
    children?: ReactNode,
    data?: Function,
    isUpdated?: number
}

const Header = ( { children, data, isUpdated }: IHeader ) => {

    const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const userData = await getUser();
            setUser(userData);
            if(data) data(userData)
        }catch {
            
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [isUpdated])

    return (loading) ? <LoadingPage /> : <header className='w-full flex items-center justify-between px-4 py-2 border-b-[0.5px] border-gray-200'>
    <div>
        { children }
    </div>
    <div className="flex flex-col justify-left">
        <h4 className="text-[#000000E5] text-xl">{ 
            `${ user?.surname } ${ user?.name.substring(0, 1) }. ${ user?.middlename.substring(0, 1) }.` 
        }</h4>
        <h5 className="text-[#00000099] text-right">{ user?.permissionName }</h5>
    </div>
</header>
    

};

export default Header;