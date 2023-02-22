import React from "react";
import { useNavigate } from "react-router-dom";
import MoonLoader from 'react-spinners/MoonLoader'
import { useState } from "react";
import axios from "axios";

const Register = () => {
    const navigate = new useNavigate()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)


    const handleChange = (val, field) => {
        // if (field === 'name') {
        //     setName(val)
        // }
        // if (field === 'email') {
        //     setEmail(val)
        // }
        // if (field === 'phone') {
        //     setPhone(val)
        // }
        // if (field === 'password') {
        //     setPassword(val)
        // }

        switch (field) {
            case 'name':
                setName(val)
                break;
            case 'email':
                setEmail(val)
                break;
            case 'phone':
                setPhone(val)
                break;
            case 'password':
                setPassword(val)
                break;
            default:
                break;
        }
    }



    const handleRegister = () => {
        console.log('check state: ', name, email, phone, password)
        setLoading(true)
        axios.post('https://lapcenter-v1.onrender.com/api/register', {
            name: name,
            email: email,
            phone: phone,
            isAdmin: false,
            password: password,
        })
            .then(function (response) {
                navigate('/login')
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error)
                alert('Đăng ký tài khoản không thành công, vui lòng kiểm tra!')
                setLoading(false)
            });
    }

    return (
        <div className="w-screen h-screen flex bg-gradient-to-r from-[#98c5e9] to-blue-500 items-center justify-center">
            <div className="rounded-md h-auto w-[500px] bg-white ">
                <p className="text-center my-7 text-2xl font-bold text-blue-500">Register</p>
                <div className="w-[200px] mx-[150px] border-b-2 "></div>
                <div className="p-8">
                    <p className="font-semibold mb-1">Username</p>
                    <input
                        onChange={(e) => handleChange(e.target.value, 'name')}
                        className="rounded-md w-full p-2 border-[1px] border-blue-500 bg-white outline-none" type="text" placeholder="Name"></input>
                    <p className="font-semibold mb-1">Email</p>
                    <input
                        onChange={(e) => handleChange(e.target.value, 'email')}
                        className="rounded-md w-full p-2 border-[1px] border-blue-500 bg-white outline-none" type="text" placeholder="Email"></input>

                    <p className=" font-semibold mb-1">Phone number</p>
                    <input
                        onChange={(e) => handleChange(e.target.value, 'phone')}
                        className="rounded-md w-full p-2 border-[1px] border-blue-500 bg-white outline-none" type="text" placeholder="Phone number"></input>
                    <p className="rounded-md font-semibold mb-1">Password</p>
                    <input
                        onChange={(e) => handleChange(e.target.value, 'password')}
                        className="rounded-md w-full p-2 border-[1px] border-blue-500 bg-white outline-none" type="password" placeholder="Password"></input>
                    {/* <p className="font-semibold mb-1">Repeat password</p>
                    <input className="w-full p-2 border-[1px] border-blue-500 bg-white outline-none" type="password" placeholder="Password"></input> */}
                </div>
                <div className="w-[100px] bg-gradient-to-r from-[#98c5e9] to-blue-500 m-auto mt-4 p-2 rounded hover:from-[#87bce7] hover:to-blue-600 cursor-pointer">
                    {loading ? (
                        <div className="flex justify-center">
                            <MoonLoader
                                color="#fff"
                                size={20}
                                loading={loading}
                            />
                        </div>
                    ) : (
                        <p
                            onClick={handleRegister}
                            className="text-center text-white font-semibold">Register</p>
                    )}
                </div>
                <div className="p-8 flex justify-between">
                    <p className="underline hover:text-blue-700 cursor-pointer mt-3" onClick={() => navigate('/')}>Back to home</p>
                    <p className="text-blue-500 hover:text-blue-700 cursor-pointer mt-3" onClick={() => navigate('/login')}>Already have an account?</p>
                </div>
            </div>

        </div>
    )
}

export default Register