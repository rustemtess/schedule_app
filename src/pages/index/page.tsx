import Container from "../../components/Container";
import Table from "../../components/Table";
import { formatDate } from '../../module/Date';
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { IUser } from "../users/interface";

const Index = () => {

    const [data, setData] = useState<IUser>();
    const [countMeet, setCountMeet] = useState<number>(0);

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <Container>
            <Menu id={1} data={ data } />
            <section className='w-full min-h-screen flex flex-col overflow-y-auto pb-4'>
                <Header data={ setData }>
                    <h2 className='text-2xl font-medium'>{ formatDate(new Date()) }</h2>
                    <p className='text-base'>Запланирована { countMeet } встреч</p>
                </Header>
                <Table countMeetToParent={ setCountMeet } isEdit={ (data?.permissionId && data?.permissionId >= 2) ? true : false } />
            </section>
        </Container>
    )

}

export default Index