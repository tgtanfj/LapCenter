import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import axios from 'axios'
import Loader from "../../components/loader";
import { useNavigate } from "react-router";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    const toastSuccess = (value) => {
        toast.success(value, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const toastFail = (value) => {
        toast.error(value, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handleGetAllProducctInOrders = () => {
        setLoading(true)
        axios.get(`https://lapcenter-v1.onrender.com/api/order?pageSize=50&pageNumber=1`)
            .then(function (response) {
                // handle success
                console.log('thanh cong', response.data);
                setLoading(false)
                setData(response?.data?.orders);
            })
            .catch(function (error) {
                // handle error
                setLoading(false)
                console.log(error);
            })
    }

    const handleDeleteProductInOrder = (orderId) => {
        setLoading(true)
        axios.delete(`https://lapcenter-v1.onrender.com/api/order/removeOrder/${orderId}`)
            .then(function (response) {
                // handle success
                console.log('thanh cong');
                setLoading(false)
                handleGetAllProducctInOrders()
                toastSuccess('Xóa đơn hàng thành công')
            })
            .catch(function (error) {
                // handle error
                console.log('that bai');
                setLoading(false)
                console.log(error);
                toastFail('Xóa đơn hàng thất bại')
            })
    }

    const handleRenderStatus = (number) => {
        switch (number) {
            case 1:
                return <p className="text-blue-500">Vừa đặt hàng</p>
            case 2:
                return <p className="text-yellow-500">Đang giao hàng</p>
            case 3:
                return <p className="text-green-500">Đã nhận hàng</p>
            case 4:
                return <p className="text-red-500">Không nhận hàng</p>
            default:
                break;
        }
    }

    useEffect(() => {
        handleGetAllProducctInOrders()
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
                                    <th className="w-[20%]">Tên khách hàng</th>
                                    <th className="w-[20%]">Tên sản phẩm</th>
                                    <th className="w-[20%]">Địa chỉ</th>
                                    <th className="w-[20%]">Số lượng</th>
                                    <th className="w-[20%]">Trạng thái đơn hàng</th>
                                    <th className="w-[20%]">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2">{item?.customerName}</td>
                                        <td className="py-2">{item?.productName}</td>
                                        <td className="py-2">{item?.address}</td>
                                        <td className="py-2">{item?.quantity}</td>
                                        <td className="py-2 font-semibold">{handleRenderStatus(item?.orderStatus)}</td>
                                        <td className="py-2">
                                            <button
                                                onClick={() => handleDeleteProductInOrder(item._id)}
                                                className="w-[50px] h-[30px] border border-[#333] hover:text-[#fff] hover:border-red-500 hover:bg-red-500 mx-[10px]">Xóa</button>
                                            <button
                                                // onClick={() => {
                                                //     navigate('/buy', { state: { productInfo: item } })
                                                // }}
                                                className="w-[120px] h-[30px] border border-[#333] hover:text-[#fff] hover:bg-[#333] ">Xem đơn hàng</button>
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

export default Orders