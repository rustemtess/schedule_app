import { ReactNode, useEffect, useState } from "react";
import { IUser } from "../../pages/users/interface";
import { getUser } from "../../module/API/api.users";

interface IHeader {
    children?: ReactNode,
    data?: Function
}

const Header = ( { children, data }: IHeader ) => {

    const [user, setUser] = useState<IUser>();

    const fetchData = async () => {
        const userData = await getUser();
        setUser(userData);
        if(data) data(userData)
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <header className='w-full flex items-center justify-between px-4 py-2 border-b-[0.5px] border-gray-200'>
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
    )

};

export default Header;