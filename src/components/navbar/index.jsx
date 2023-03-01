import React from "react";
import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/images/logo2.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        window.location.replace('/')
    }

    const navigateTo = (path) => {
        navigate(path)
        window.location.reload(true)
    }

    return (
        <div className="min-w-[525px] flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500 px-40 py-2">
            <img
                className="w-10 h-10 cursor-pointer"
                src={logo2} alt=""
                onClick={() => navigate('/')} />
            <div className="flex">
                <Link to='/'
                    className="ml-4 mt-2 font-medium text-white hover:text-gray-400">
                    Trang chủ
                </Link>
                {localStorage.getItem('isAdmin') === 'true' ? '' : <Link to='/intro'
                    className="ml-4 mt-2 font-medium text-white hover:text-gray-400">
                    Giới thiệu
                </Link>}
                {localStorage.getItem('isAdmin') === 'true' ? '' : <Link to='/contact'
                    className="ml-4 mt-2 font-medium text-white hover:text-gray-400">
                    Liên hệ
                </Link>}
                {localStorage.getItem('isAdmin') === 'true' && <Link to='/orders'
                    className="ml-4 mt-2 font-medium text-white hover:text-gray-400"
                    onClick={() => navigateTo('/orders')}
                    >
                    Quản lý đơn hàng
                </Link>}
                {localStorage.getItem('name') ? <Link to='/cart'
                    className="ml-4 mt-2 font-medium text-white hover:text-gray-400"
                    onClick={() => navigateTo('/cart')}>
                    Giỏ hàng
                </Link> : null}
                {localStorage.getItem('name') ? <Link to='/buy-histories'
                    className="ml-4 mt-2 font-medium text-white hover:text-gray-400"
                    onClick={() => navigateTo('/buy-histories')}>
                    Lịch sử mua hàng
                </Link> : null}
                {localStorage.getItem('name') ? (
                    <Link to='/login'
                        onClick={() => handleLogout()}
                        className="ml-4 mt-2 font-medium text-white hover:text-gray-400">
                        Đăng xuất
                    </Link>
                ) : (
                    <Link to='/login'
                        className="ml-4 mt-2 font-medium text-white hover:text-gray-400">
                        Đăng nhập
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar