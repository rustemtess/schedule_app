import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../pages/users/interface";
import { useMediaQuery } from 'react-responsive';

interface IMenu {
    id: number,
    data?: IUser
}

interface IMenuItem {
    id: number,
    name: string,
    href: string,
    svg: ReactNode,
    permission: number
}

const MenuList: Array<IMenuItem> = [
    {
        id: 1,
        name: 'Расписание',
        href: '/',
        svg: <svg className='group/svg' xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20"><path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z"/><circle cx="12" cy="15" r="1.5"/><circle cx="7" cy="15" r="1.5"/><circle cx="17" cy="15" r="1.5"/></svg>,
        permission: 1
    },
    {
        id: 2,
        name: 'Пользователи',
        href: '/users',
        svg: <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z"/></svg>,
        permission: 3
    }
];

const Menu = ({ id, data }: IMenu) => {

    const navigate = useNavigate();

    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    return (
        <section className={ `bg-[#F8F9FB] flex ${ (!isMobile) ? `w-fit min-h-screen min-w-fit flex-col` : `w-full fixed bottom-0 left-0` } justify-between` }>
            <nav className={ `flex ${ (!isMobile) ? `flex-col` : `w-full justify-center` } text-xl` }>
                { MenuList.map( (item, index) => {
                    if(data?.permissionId && item.permission <= data?.permissionId) {
                        return <a title={ item.name } key={ index } onClick={() => navigate( item.href ) } 
                        className={ `flex items-center justify-center gap-3 duration-200 px-4 py-4 w-full group/svg fill-[#2B2B2B] ${ (item.id === id) ? `cursor-default text-[#BC9CCC] ${ (!isMobile) ? `border-l-[5px]` : `border-b-[5px]` } border-gray-800 fill-gray-800` : `cursor-pointer text-[#B0B0B0] hover:bg-[#151515] hover:fill-white` }` }>
                        { item.svg }
                    </a>
                    }
                } ) }
            </nav>
            <nav className='flex flex-col text-xl w-full'>
                 
            </nav>
        </section>
    )

};

export default Menu;