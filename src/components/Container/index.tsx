import { ReactNode } from "react";

interface IContainer {
    children?: ReactNode
};

const Container = ( { children }: IContainer ) => {
    
    return (
        <div className='flex w-full min-h-screen bg-[#F9F9F9]'>
            { children }
        </div>
    )

};

export default Container;