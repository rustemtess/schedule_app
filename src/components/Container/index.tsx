import { IContainer } from "./container.interface";

const Container = ( { children }: IContainer ) => {
    
    return (
        <div className='flex w-full h-svh bg-[#F9F9F9] overflow-auto'>
            { children }
        </div>
    )

};

export default Container;