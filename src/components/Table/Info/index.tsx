import { useEffect, useState } from "react";
import { API_URL } from "../../../module/API";
import LoadingPage from "../../../pages/loading";
import { filterDateAndTime } from "../../../module/Date";
import { getList } from "../../../module/API/api.date";
import List from "../List";
import { getSessionAccessToken } from "../../../module/Session";

interface IInfo {
    timeId: number|undefined,
    setInfo: Function,
    edit: boolean,
    userId: number|undefined,
    setDate: Function,
    isListAccess?: boolean
}

interface IUserInfo {
    name: string,
    surname: string,
    middlename: string,
    number: number,
    timeRegistered: string,
    meetId: number
}

const Info = ( { timeId, setInfo, edit = false, userId, setDate, isListAccess = false }: IInfo ) => {

    const [data, setData] = useState<IUserInfo>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isList, setList] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        const form = new FormData();
        form.append('time_id', String(timeId))
        form.append('access_token', getSessionAccessToken());
        await fetch(API_URL + 'date/time/info', {
            method: 'POST',
            body: form
        }).then(response => {
            if(response.status === 200) return response.json()
            else return document.location.href = '/'
        }).then(result => setData(result)).finally( () => setLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, []);

    const deleteTime = async () => {
        const form = new FormData();
        form.append('time_id', String(timeId));
        form.append('user_id', String(userId));
        form.append('access_token', getSessionAccessToken());
        await fetch(API_URL + 'date/time/delete', {
            method: 'POST',
            body: form
        }).then(response => {
            if(response.status !== 200) return document.location.href = '/'
        })
        await setInfo(false)
        setDate(await getList())
    }

    return (
        <div className='absolute top-0 left-0 w-full min-h-screen flex justify-center items-center' style={ {
            'backgroundColor': 'rgba(0, 0, 0, 0.3)'
        } }>
            { isList && <List meetId={data?.meetId} setList={ setList } /> }
            <div className='w-full max-w-[500px] h-fit bg-white rounded-md p-4 m-2 flex flex-col gap-2'>
                <div className='flex justify-between py-1'>
                    <h2 className='text-gray-600 text-base'>Информация</h2>
                    <button onClick={ () => setInfo(false) }>
                        <svg className='fill-gray-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center"><polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414"/></g></svg>
                    </button>
                </div>
                <hr />
                { (loading) ? <LoadingPage /> : <div className='flex flex-col gap-2'>
                    <div>
                        <p className='text-sm text-gray-500'>Автор</p>
                        <h3 className='text-base text-gray-700'>{ `${data?.surname} ${data?.name} ${data?.middlename}` }</h3>
                    </div>
                    <div className='flex flex-col gap-1 w-fit'>
                        <p className='text-sm text-gray-500'>Номер телефона</p>
                        <a href={ `tel:+${ data?.number }` } className='text-base text-white bg-black px-2 py-1 rounded flex items-center gap-1'>
                            <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="14" height="14"><path d="M13,1a1,1,0,0,1,1-1A10.011,10.011,0,0,1,24,10a1,1,0,0,1-2,0,8.009,8.009,0,0,0-8-8A1,1,0,0,1,13,1Zm1,5a4,4,0,0,1,4,4,1,1,0,0,0,2,0,6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2Zm9.093,10.739a3.1,3.1,0,0,1,0,4.378l-.91,1.049c-8.19,7.841-28.12-12.084-20.4-20.3l1.15-1A3.081,3.081,0,0,1,7.26.906c.031.031,1.884,2.438,1.884,2.438a3.1,3.1,0,0,1-.007,4.282L7.979,9.082a12.781,12.781,0,0,0,6.931,6.945l1.465-1.165a3.1,3.1,0,0,1,4.281-.006S23.062,16.708,23.093,16.739Zm-1.376,1.454s-2.393-1.841-2.424-1.872a1.1,1.1,0,0,0-1.549,0c-.027.028-2.044,1.635-2.044,1.635a1,1,0,0,1-.979.152A15.009,15.009,0,0,1,5.9,9.3a1,1,0,0,1,.145-1S7.652,6.282,7.679,6.256a1.1,1.1,0,0,0,0-1.549c-.031-.03-1.872-2.425-1.872-2.425a1.1,1.1,0,0,0-1.51.039l-1.15,1C-2.495,10.105,14.776,26.418,20.721,20.8l.911-1.05A1.121,1.121,0,0,0,21.717,18.193Z"/></svg>
                            <span>+{ data?.number }</span>
                        </a>
                    </div>
                    <div>
                        <p className='text-sm text-gray-500'>Время создания</p>
                        <h3 className='text-base text-gray-700'>{ filterDateAndTime( data?.timeRegistered ) }</h3>
                    </div>
                    { isListAccess && <button onClick={ () => {
                        setList(!isList)
                    }} className='bg-orange-600 flex items-center text-white p-2 w-full justify-center gap-2 rounded text-base hover:bg-gray-800'>
                        <svg width="18px" height="18px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="list_outline_28">
                                    <polygon points="0 0 28 0 28 28 0 28"></polygon>
                                    <path d="M4.5,14 C4.5,14.83 5.17,15.5 6,15.5 C6.83,15.5 7.5,14.83 7.5,14 C7.5,13.17 6.83,12.5 6,12.5 C5.17,12.5 4.5,13.17 4.5,14 Z M4.5,8 C4.5,8.83 5.17,9.5 6,9.5 C6.83,9.5 7.5,8.83 7.5,8 C7.5,7.17 6.83,6.5 6,6.5 C5.17,6.5 4.5,7.17 4.5,8 Z M4.5,20 C4.5,20.8233083 5.17669173,21.5 6,21.5 C6.82330827,21.5 7.5,20.8233083 7.5,20 C7.5,19.1766917 6.83458647,18.5 6,18.5 C5.16541353,18.5 4.5,19.1766917 4.5,20 Z M25,20 C25,19.4477153 24.5522847,19 24,19 L10,19 C9.44771525,19 9,19.4477153 9,20 C9,20.5522847 9.44771525,21 10,21 L24,21 C24.5522847,21 25,20.5522847 25,20 Z M25,14 C25,13.4477153 24.5522847,13 24,13 L10,13 C9.44771525,13 9,13.4477153 9,14 C9,14.5522847 9.44771525,15 10,15 L24,15 C24.5522847,15 25,14.5522847 25,14 Z M10,9 L24,9 C24.5522847,9 25,8.55228475 25,8 C25,7.44771525 24.5522847,7 24,7 L10,7 C9.44771525,7 9,7.44771525 9,8 C9,8.55228475 9.44771525,9 10,9 Z" id="↳-Icon-Color" fill="currentColor" fillRule="nonzero"></path>
                                </g>
                            </g>
                        </svg>
                        <p>Проверить список</p>
                    </button> }
                    { edit && <button onClick={ () => deleteTime() } className='bg-red-500 flex items-center text-white p-2 w-full justify-center gap-2 rounded text-base hover:bg-gray-800'>
                        <svg width='18' height='18' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_55_352)'>
                                <path d='M13.9999 2.66667H11.9333C11.7785 1.91428 11.3691 1.23823 10.7741 0.752479C10.179 0.266727 9.43472 0.000969683 8.66659 0L7.33325 0C6.56512 0.000969683 5.8208 0.266727 5.22575 0.752479C4.63071 1.23823 4.22132 1.91428 4.06659 2.66667H1.99992C1.82311 2.66667 1.65354 2.7369 1.52851 2.86193C1.40349 2.98695 1.33325 3.15652 1.33325 3.33333C1.33325 3.51014 1.40349 3.67971 1.52851 3.80474C1.65354 3.92976 1.82311 4 1.99992 4H2.66659V12.6667C2.66764 13.5504 3.01917 14.3976 3.64407 15.0225C4.26896 15.6474 5.11619 15.9989 5.99992 16H9.99992C10.8836 15.9989 11.7309 15.6474 12.3558 15.0225C12.9807 14.3976 13.3322 13.5504 13.3333 12.6667V4H13.9999C14.1767 4 14.3463 3.92976 14.4713 3.80474C14.5963 3.67971 14.6666 3.51014 14.6666 3.33333C14.6666 3.15652 14.5963 2.98695 14.4713 2.86193C14.3463 2.7369 14.1767 2.66667 13.9999 2.66667ZM7.33325 1.33333H8.66659C9.0801 1.33384 9.48334 1.46225 9.82099 1.70096C10.1587 1.93967 10.4142 2.27699 10.5526 2.66667H5.44725C5.58564 2.27699 5.84119 1.93967 6.17884 1.70096C6.5165 1.46225 6.91974 1.33384 7.33325 1.33333ZM11.9999 12.6667C11.9999 13.1971 11.7892 13.7058 11.4141 14.0809C11.0391 14.456 10.5304 14.6667 9.99992 14.6667H5.99992C5.46949 14.6667 4.96078 14.456 4.58571 14.0809C4.21063 13.7058 3.99992 13.1971 3.99992 12.6667V4H11.9999V12.6667Z' fill='white'/>
                                <path d='M6.66667 12.0001C6.84348 12.0001 7.01305 11.9298 7.13807 11.8048C7.2631 11.6798 7.33333 11.5102 7.33333 11.3334V7.33341C7.33333 7.1566 7.2631 6.98703 7.13807 6.86201C7.01305 6.73699 6.84348 6.66675 6.66667 6.66675C6.48986 6.66675 6.32029 6.73699 6.19526 6.86201C6.07024 6.98703 6 7.1566 6 7.33341V11.3334C6 11.5102 6.07024 11.6798 6.19526 11.8048C6.32029 11.9298 6.48986 12.0001 6.66667 12.0001Z' fill='white'/>
                                <path d='M9.33341 12.0001C9.51023 12.0001 9.67979 11.9298 9.80482 11.8048C9.92984 11.6798 10.0001 11.5102 10.0001 11.3334V7.33341C10.0001 7.1566 9.92984 6.98703 9.80482 6.86201C9.67979 6.73699 9.51023 6.66675 9.33341 6.66675C9.1566 6.66675 8.98703 6.73699 8.86201 6.86201C8.73699 6.98703 8.66675 7.1566 8.66675 7.33341V11.3334C8.66675 11.5102 8.73699 11.6798 8.86201 11.8048C8.98703 11.9298 9.1566 12.0001 9.33341 12.0001Z' fill='white'/>
                            </g>
                            <defs>
                                <clipPath id='clip0_55_352'>
                                    <rect width='16' height='16' fill='white'/>
                                </clipPath>
                            </defs>
                        </svg>
                        <p>Удалить</p>
                    </button> }
                </div> }
            </div>
        </div>
    )

}

export default Info;