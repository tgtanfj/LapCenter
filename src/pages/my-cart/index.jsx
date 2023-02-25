import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import axios from 'axios'
import Loader from "../../components/loader";
import { useNavigate } from "react-router";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const MyCart = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    const handleGetAllProducctInCart = () => {
        setLoading(true)
        axios.get(`https://lapcenter-v1.onrender.com/api/cart/${localStorage.getItem('userId')}`)
            .then(function (response) {
                // handle success
                console.log('thanh cong', response.data);
                setLoading(false)
                setData(response?.data?.products);
            })
            .catch(function (error) {
                // handle error
                setLoading(false)
                console.log(error);
            })
    }

    const handleDeleteProductInCart = (productId) => {
        setLoading(true)
        axios.delete(`https://lapcenter-v1.onrender.com/api/cart/removeCartInCart/${productId}`)
            .then(function (response) {
                // handle success
                console.log('thanh cong');
                setLoading(false)
                handleGetAllProducctInCart()
            })
            .catch(function (error) {
                // handle error
                setLoading(false)
                console.log(error);
            })
    }

    useEffect(() => {
        handleGetAllProducctInCart()
    }, [])

    return (
        <div className="cart-container">
            <Navbar />
            {loading ? <Loader /> :
                <div className="px-20 py-5">
                    <p className="text-center my-5 font-semibold text-xl">
                        Giỏ hàng của {localStorage.getItem('name')}
                    </p>
                    <div className="my-5 px-20">
                        <table class="table-fixed w-full mb-10">
                            <thead>
                                <tr className="text-left border-black">
                                    <th className="w-[20%]">Hình ảnh</th>
                                    <th className="w-[20%]">Tên sản phẩm</th>
                                    <th className="w-[20%]">Hãng</th>
                                    <th className="w-[20%]">Giá</th>
                                    <th className="w-[20%]">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2"><img src={item?.image}></img></td>
                                        <td className="py-2">{item?.productName}</td>
                                        <td className="py-2">{item?.productBrand}</td>
                                        <td className="py-2 font-semibold">{item?.price} VND</td>
                                        <td className="py-2">
                                            <button
                                                onClick={() => handleDeleteProductInCart(item._id)}
                                                className="w-[50px] h-[30px] border border-[#333] hover:text-[#fff] hover:border-red-500 hover:bg-red-500 mx-[10px]">Xóa</button>
                                            <button
                                                onClick={() => {
                                                    navigate('/buy', { state: { productInfo: item } })
                                                }}
                                                className="w-[50px] h-[30px] border border-[#333] hover:text-[#fff] hover:bg-[#333] ">Mua</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-center">{data?.length === 0 && 'Không có sản phẩm nào trong giỏ hàng.'}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default MyCart