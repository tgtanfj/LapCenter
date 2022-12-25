import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MoonLoader from 'react-spinners/MoonLoader'

const fakeAccount = {
    userName: 'admin',
    password: 'admin'
}

const Login = () => {
    const navigate = new useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const handleChange = (val, field) => {
        if (field === 'username') {
            setUsername(val)
        } else {
            setPassword(val)
        }
    }

    const handleLogin = () => {
        if (username === fakeAccount.userName && password === fakeAccount.password) {
            navigate('/')
        } else {
            alert("Tài khoản hoặc mật khẩu không chính xác, vui lòng kiểm tra!")
        }
    }

    const handleSubmitLogin = () => {
        setLoading(true)
        axios.post('https://lapcenter-v1.onrender.com/api/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                navigate('/')
                setLoading(false)
                localStorage.setItem('name', response.data.userName)
            })
            .catch(function (error) {
                alert('Tài khoản hoặc mật khẩu không chính xác, vui lòng kiểm tra!')
                setLoading(false)
            });
    }

    return (
        <div className="w-screen h-screen flex bg-gradient-to-r from-[#98c5e9] to-blue-500 items-center justify-center">
            <div className="h-auto w-[500px] bg-emerald-100 bg-neutral-50">
                <p className="text-center my-7 text-2xl font-bold text-blue-500">Login</p>
                <div className="w-[200px] mx-[150px] border-b-2 border-transparent-200 bg-gradient-to-r from-blue-200 to-blue-500"></div>
                <div className="p-8">
                    <p className="font-semibold mb-1">Username</p>
                    <input
                        onChange={(e) => handleChange(e.target.value, 'username')}
                        value={username} className="w-full p-2 border-[1px] border-blue-500 bg-white outline-none" type="text" placeholder="Username"></input>
                    <p className="font-semibold mb-1">Password</p>
                    <input
                        onChange={(e) => handleChange(e.target.value, 'password')}
                        value={password} className="w-full p-2 border-[1px] border-blue-500 bg-white outline-none" type="password" placeholder="Password"></input>
                </div>
                <div
                    onClick={handleSubmitLogin}
                    className="w-[100px] bg-gradient-to-r from-[#98c5e9] to-blue-500 m-auto mt-4 p-2 rounded hover:from-[#87bce7] hover:to-blue-600 cursor-pointer">
                    {loading ? (
                        <div className="flex justify-center">
                            <MoonLoader
                                color="#fff"
                                size={20}
                                loading={loading}
                            />
                        </div>
                    ) : (
                        <p className="text-center text-white font-semibold">Login</p>
                    )}

                </div>
                <div className="p-8 flex justify-between">
                    <p className="underline hover:text-blue-700 cursor-pointer mt-3" onClick={() => navigate('/')}>Back to home</p>
                    <p className="text-blue-500 hover:text-blue-700 cursor-pointer mt-3" onClick={() => navigate('/register')}>Register a new account?</p>
                </div>
            </div>

        </div>
    )
}

export default Login