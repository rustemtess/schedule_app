interface IRegister {
    setRegisterForm: Function
}

const Register = ( { setRegisterForm }: IRegister ) => {

    return (
        <div className="absolute overflow-y-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[350px] rounded-[5px] p-5 bg-white h-fit w-full flex flex-col justify-center items-center gap-3">
            <div className="max-w-[310px] h-fit w-full gap-2">
                <div className="w-full pb-2">
                    <p className="text-[#00000099]">Введите имя</p>
                    <input name='name' className='outline-none w-full max-h-[50px] bg-[#F0F0F0] rounded-[6px] p-[6px]'></input>
                </div>
                <div className="w-full pb-2">
                    <p className="text-[#00000099]">Введите фамилия</p>
                    <input name='surname' className='outline-none w-full max-h-[50px] bg-[#F0F0F0] rounded-[6px] p-[6px]'></input>
                </div>
                <div className="w-full pb-2">
                    <p className="text-[#00000099]">Введите отчество</p>
                    <input name='lastname' className='outline-none w-full max-h-[50px] bg-[#F0F0F0] rounded-[6px] p-[6px]'></input>
                </div>
                <div className="w-full pb-2">
                    <p className="text-[#00000099]">Введите e-mail</p>
                    <input name='email' className='outline-none w-full max-h-[50px] bg-[#F0F0F0] rounded-[6px] p-[6px]'></input>
                </div>
                <div className="w-full pb-2">
                    <p className="text-[#00000099]">Введите пароль</p>
                    <input name='password' className='outline-none w-full max-h-[50px] bg-[#F0F0F0] rounded-[6px] p-[6px]'></input>
                </div>
                <div className="w-full pb-2">
                    <p className="text-[#00000099]">Подтвердите пароль</p>
                    <input name='repeat-password' className='outline-none w-full max-h-[50px] bg-[#F0F0F0] rounded-[6px] p-[6px]'></input>
                </div>
                <button className="w-full max-h-[50px] bg-[#F04939] rounded-[6px] p-[6px] text-white">Зарегитрироваться</button>
                <button onClick={() => setRegisterForm(false)} className="w-full rounded-[6px] p-[6px] text-[#00000099]">Закрыть</button>
            </div>
        </div>
    )

}

export default Register;