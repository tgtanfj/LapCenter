import React from "react";
import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/images/logo2.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <div className="min-w-[525px] flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500 px-40 py-2">
            <img
            className="w-10 h-10 cursor-pointer"
            src={logo2} alt="" />
            <div className="flex">
                <Link to='/' 
                className="ml-4 mt-2 font-medium text-white hover:text-gray-400">
                    Trang chủ
                </Link>
                <Link to='/intro' 
                className="ml-4 mt-2 font-medium text-white hover:text-gray-400">
                    Giới thiệu
                </Link>
                <Link to='/contact' 
                className="ml-4 mt-2 font-medium text-white hover:text-gray-400">
                    Liên hệ
                </Link>
            </div>
        </div>
    )
}

export default Navbar