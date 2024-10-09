import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { IMenu } from "./menu.interface";
import { ItemsList } from "./menu.items";

const Menu = ({ 
    id, 
    data 
}: IMenu) => {

    const navigate = useNavigate();
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    return (
        <section className={ `bg-[#F8F9FB] flex ${ (!isMobile) ? `w-fit min-h-screen min-w-fit flex-col` : `w-full fixed bottom-0 left-0` } justify-between` }>
            <nav className={ `flex ${ (!isMobile) ? `flex-col` : `w-full justify-center` } text-xl` }>
                { 
                    ItemsList.map((item, index) => {
                        if(data?.permissionId && item.permission <= data?.permissionId) {
                            return <a 
                                title={ item.name } 
                                key={ index } 
                                onClick={ () => navigate( item.href ) } 
                            className={ `flex items-center justify-center gap-3 duration-200 px-4 py-4 w-full group/svg fill-[#2B2B2B] ${ (item.id === id) ? `cursor-default text-[#BC9CCC] ${ (!isMobile) ? `border-l-[5px]` : `border-b-[5px]` } border-gray-800 fill-gray-800` : `cursor-pointer text-[#B0B0B0] hover:bg-[#151515] hover:fill-white` }` }>
                            { item.svg }
                        </a>
                        }
                    })
                }
            </nav>
            <nav className='flex flex-col text-xl w-full'>
                 
            </nav>
        </section>
    )

};

export default Menu;