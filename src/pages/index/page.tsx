import Container from "../../components/Container";
import Table from "../../components/Table";
import { formatDate, getAfterDate } from '../../module/Date';
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { IUser } from "../users/interface";
import { API_URL } from "../../module/API";
import { IObject } from "../../components/Table/interfaces";
import { usePDF } from "react-to-pdf";
import { createPortal } from "react-dom";

const Index = () => {

    const { toPDF, targetRef } = usePDF({ filename: 'test.pdf' });
    const [data, setData] = useState<IUser>();
    const [countMeet, setCountMeet] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [dataList, setDataList] = useState<Array<IObject>>();
    const [date, setDate] = useState<Date>(new Date());
    const [isExport, setExport] = useState<number>(0);
    const [isShowForm, setShowForm] = useState<boolean>(false);

    function getToday() {
        return date.toISOString().substr(0, 10);
    }

    useEffect(() => {
        if(isShowForm && isExport > 0 && targetRef.current) {
            toPDF()
        }
    }, [isExport, targetRef])

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

    const ShowFormForExport = () => {
        return  <div className='absolute top-0 left-0 w-full min-h-screen flex justify-center items-center' style={ {
            'backgroundColor': 'rgba(0, 0, 0, 0.3)'
        } }>
            <div className='w-full max-w-[500px] h-fit bg-white rounded-md p-4 m-2 flex flex-col gap-2'>
                <div className='flex justify-between py-1'>
                    <h2 className='text-gray-600 text-base'>Экпорт данных</h2>
                    <button onClick={ () => setShowForm(false) }>
                        <svg className='fill-gray-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center"><polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414"/></g></svg>
                    </button>
                </div>
                <hr />
                <h3>
                    Пожалуйста, обновите страницу перед экспортом таблицы, нажав кнопку <span className='text-amber-800 font-medium'>(Обновить страницу)</span>, чтобы получить актуальные данные. Вы также можете экспортировать текущие данные, нажав кнопку <span className='text-green-800 font-medium'>(Экспортировать)</span>
                </h3>
                <div className='flex gap-1 flex-wrap'>
                    <button onClick={ () => document.location.reload() } className='bg-amber-600 text-white p-2 py-2.5 rounded hover:bg-gray-800'>Обновить страницу</button>
                    <button onClick={ () => setExport(isExport + 1) } className='bg-green-600 text-white p-2 py-2.5 rounded hover:bg-gray-800'>Экспортировать</button>
                </div>
            </div>
        </div>
    }

    return (
        <Container>
            <Menu id={1} data={ data } />
            <section className='w-full min-h-screen flex flex-col overflow-y-auto pb-4'>
                <Header data={ setData }>
                    <h2 className='text-2xl font-medium'>{ formatDate(new Date(date)) }</h2>
                    <p className='text-base'>Запланирована { countMeet } встреч</p>
                </Header>
                <div className='flex flex-wrap justify-between gap-2 p-3'>
                    <div className='flex items-center gap-2 text-lg'>
                        <input value={ getToday() } type='date' onChange={ (e) => {
                            setDate(new Date(e.target.value))
                        } } className='
                            bg-gray-100 border p-1.5 rounded outline-none
                        ' />
                        <p>до</p>
                        <h3>{ getAfterDate(date).toLocaleDateString() }</h3>
                    </div>
                    <button onClick={ () => {
                        setShowForm(true)
                    } } className='bg-black text-white w-fit p-1 px-3 font-normal rounded hover:bg-gray-800'>Экпорт таблицы</button>
                    <div className='flex items-center gap-1'>
                        <button onClick={ () => fetchData() } className='bg-gray-100 border p-2.5 rounded fill-[#2B2B2B] hover:bg-gray-800 hover:fill-white duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><g id="_01_align_center" data-name="01 align center"><path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></g></svg>
                        </button>
                        <input onChange={ (e) => setText(e.target.value) } 
                        onKeyUp={ (e) => {
                            if(e.key === 'Enter') fetchData()
                        } } placeholder='Поиск...' className='outline-none max-w-[300px] w-full h-fit bg-gray-100 border rounded px-3.5 py-1.5'></input>
                    </div>
                </div>
                { isShowForm && <ShowFormForExport /> }
                <Table userId={ data?.id } date={ date } dataList={ dataList } countMeetToParent={ setCountMeet } isEdit={ (data?.permissionId && data?.permissionId >= 2) ? true : false } />
                { createPortal(
                    <div className='absolute top-[-9999px]' ref={ targetRef }>
                        <Table isExport={ true } userId={ data?.id } date={ date } dataList={ dataList } countMeetToParent={ setCountMeet } isEdit={ false } />
                    </div>,
                    document.body
                ) }
            </section>
        </Container>
    )

}

export default Index