import Container from "../../components/Container";
import Table from "../../components/Table";
import { formatDate } from '../../module/Date';
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { IUser } from "../users/interface";
import { API_URL } from "../../module/API";
import { IObject } from "../../components/Table/interfaces";

const Index = () => {

    const [data, setData] = useState<IUser>();
    const [countMeet, setCountMeet] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [dataList, setDataList] = useState<Array<IObject>>();

    const fetchData = async () => {
        const form = new FormData();
        form.append('text', text);
        await fetch(API_URL + 'date/search', {
            method: 'POST',
            body: form
        }).then(response => {
            if(response.status === 200) return response.json()
        }
        ).then(result => setDataList(result));
    }

    return (
        <Container>
            <Menu id={1} data={ data } />
            <section className='w-full min-h-screen flex flex-col overflow-y-auto pb-4'>
                <Header data={ setData }>
                    <h2 className='text-2xl font-medium'>{ formatDate(new Date()) }</h2>
                    <p className='text-base'>Запланирована { countMeet } встреч</p>
                </Header>
                <div className='flex justify-end gap-2 p-3'>
                    <input onChange={ (e) => setText(e.target.value) } 
                    onKeyUp={ (e) => {
                        if(e.key === 'Enter') fetchData()
                    } } placeholder='Поиск...' className='outline-none max-w-[300px] w-full h-fit bg-gray-100 border rounded px-3.5 py-1.5'></input>
                </div>
                <Table dataList={ dataList } countMeetToParent={ setCountMeet } isEdit={ (data?.permissionId && data?.permissionId >= 2) ? true : false } />
            </section>
        </Container>
    )

}

export default Index