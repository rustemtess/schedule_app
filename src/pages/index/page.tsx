import Container from "../../components/Container";
import Table from "../../components/Table";
import { formatDate } from '../../module/Date';
import Menu from "../../components/Menu";
import { useState } from "react";

const Index = () => {

    const [countMeet, setCountMeet] = useState<number>(0);

    return (
        <Container>
            <Menu id={1} />
            <section className='w-full min-h-screen flex flex-col overflow-x-auto '>
                <header className='w-full flex items-center justify-between px-4 py-2 border-b-[0.5px] border-gray-200'>
                    <div>
                        <h2 className='text-2xl font-medium'>{ formatDate(new Date()) }</h2>
                        <p className='text-base'>Запланирована { countMeet } встреч</p>
                    </div>
                    <div className="flex flex-col justify-left">
                        <h4 className="text-[#000000E5] text-xl">Жумабек Р.Р</h4>
                        <h5 className="text-[#00000099] text-right">Пользователь</h5>
                    </div>
                </header>
                <Table countMeetToParent={ setCountMeet } />
            </section>
        </Container>
    )

}

export default Index