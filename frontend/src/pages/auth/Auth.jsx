import React, { useState } from 'react'

import Intro from './components/Intro'
import Login from './components/Login'
import Register from './components/Register'

const Auth = () => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const toggleForm = () => {
        setIsLoginFormVisible(prevState => !prevState);
    };

    return (
        <div className="min-h-screen w-full bg-bgImg bg-cover px-10 flex items-center justify-center">
            <div className='flex justify-around gap-5'>
                <div className="w-full md:w-2/3 px-5 max-w-sm py-10 bg-white rounded-lg shadow-2xl">
                    <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-5">
                        {isLoginFormVisible ? "Đăng nhập" : "Đăng ký"}
                    </h1>

                    <div className="flex text-center mb-5 border rounded-md">
                        <div
                            className={`flex-1 py-3 rounded-md cursor-pointer
                            ${isLoginFormVisible ? "bg-primary text-white" : "bg-white"}`}
                            onClick={toggleForm}
                        >
                            <span>Đăng nhập</span>
                        </div>

                        <div
                            className={`flex-1 py-3 rounded-md cursor-pointer
                            ${isLoginFormVisible ? "bg-white" : "bg-primary text-white"}`}
                            onClick={toggleForm}
                        >
                            <span>Đăng ký</span>
                        </div>
                    </div>

                    {isLoginFormVisible ?
                        <Login toggleForm={toggleForm} />
                        :
                        <Register toggleForm={toggleForm} />}
                </div>

                <Intro />
            </div>
        </div>
    )
}

export default Auth