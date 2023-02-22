import React, { useEffect, useState } from "react";
import Navbar from '../../components/navbar'
import { useLocation } from "react-router-dom";
import './style.css'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Buy = () => {
    const { state } = useLocation()
    const [quantity, setQuantity] = useState(1)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const productInfo = state?.productInfo

    const handleChange = (val, field) => {
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
            case 'address':
                setAddress(val)
                break;
            default:
                break;
        }
    }

    const handleChangeQuantity = (val) => {
        if (val < 0) {
            setIsDisabled(false)
            setQuantity(1)
        } else {
            setIsDisabled(false)
            setQuantity(val)
        }
    }

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    const handleAddProductInHistory = () => {
        axios.post('https://lapcenter-v1.onrender.com/api/history/addProductToHistory', {
            userId: localStorage.getItem('userId'),
            phone: phone,
            address: address,
            productName: productInfo?.name || productInfo?.productName,
            productBrand: productInfo?.brand || productInfo?.productBrand,
            quantity: quantity,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // const handleGetAllProductInHistory = (productId) => {
    //     axios.post(`https://lapcenter-v1.onrender.com/api/history/${productId}`, {
    //         userId: localStorage.getItem('userId'),
    //         phone: phone,
    //         address: address,
    //         productName: productInfo?.name || productInfo?.productName,
    //         productBrand: productInfo?.brand || productInfo?.productBrand,
    //         quantity: quantity,
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    const handleBuyProduct = () => {
        axios.post('https://lapcenter-v1.onrender.com/api/order/addOrder', {
            customerName: name,
            phone: phone,
            email: email,
            address: address,
            productName: productInfo?.name || productInfo?.productName,
            productBrand: productInfo?.brand || productInfo?.productBrand,
            quantity: quantity,
            orderStatus: 1,
        })
            .then(function (response) {
                console.log(response);
                setIsOpen(false)
                toastSuccess()
                // Chỉ lưu khi đã đăng nhập vào hệ thống
                localStorage.getItem('userId') && handleAddProductInHistory()
            })
            .catch(function (error) {
                console.log(error);
                setIsOpen(false)
                toastFail()
            });
    }

    useEffect(() => {
        if (!name
            || !email
            || !phone
            || !address
            || +quantity == 0 || +quantity === '') {
            setIsDisabled(true)
        }
        if (name
            && email
            && phone
            && address
            &&
            +quantity >= 1 && +quantity !== '') {
            setIsDisabled(false)
        }
    }, [name, email, phone, address, quantity])

    const incrementQuantity = () => {
        setQuantity(+quantity + 1)
    }

    const decrementQuantity = () => {
        if (+quantity <= 1) {
            setQuantity(1)
        }
        if (+quantity > 1) {
            setQuantity(+quantity - 1)
        }
    }

    const toastSuccess = () => {
        toast.success('Đặt hàng thành công', {
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

    const toastFail = () => {
        toast.error('Đặt hàng thất bại', {
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

    return (
        <div>
            <Navbar />
            <div className="px-20 py-5">
                <div className="px-40">
                    <p className="mb-4">
                        <span className="text-red-600 font-bold">Để đặt hàng,</span> quý
                        khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc và
                        điền các thông tin dưới đây:
                    </p>
                    <div className="flex justify-between">
                        <img className='w-[100px] h-[70px]' src={productInfo?.image || productInfo?.images[0]} alt="" />
                        <p className="font-bold">{productInfo?.name || productInfo.productName}</p>
                        <div className="flex justify-between">
                            <div
                                onClick={decrementQuantity}
                                className="bg-gray-300 w-[35px] h-[35px] rounded-lg cursor-pointer hover:bg-gray-400">
                                <p className="text-2xl text-[#1d9fe3] text-center">-</p>
                            </div>
                            <input
                                type="number"
                                name=""
                                onChange={(e) => handleChangeQuantity(e.target.value)}
                                value={quantity}
                                className="hide-input w-[50px] h-[35px] border-[1px] border-gray-700 mx-2 rounded outline-none px-2"
                            />
                            <div
                                onClick={incrementQuantity}
                                className="bg-gray-300 w-[35px] h-[35px] rounded-lg cursor-pointer hover:bg-gray-400">
                                <p className="text-2xl text-[#1d9fe3] text-center">+</p>
                            </div>
                        </div>

                    </div>
                    <p className="text-right font-semibold mt-3 ">Giá: {productInfo.price}</p>
                    <hr className="m-4" />
                    <p className="text-right font-semibold text-2xl">
                        Tổng tiền: {quantity * productInfo.price} VND
                    </p>
                    <div className="bg-neutral-50 p-8 w-full h-[510px] rounded-2xl shadow-lg my-6 shadow-gray-400/50">
                        <p className="text-center font-semibold text-xl">Thông tin người nhận</p>
                        <p>Tên người nhận <span className="text-red-600">*</span></p>
                        <input
                            onChange={(e) => handleChange(e.target.value, 'name')}
                            className="border-[1px] w-full border-gray-500 mb-3 mt-1 px-2 outline-none py-2 rounded-l" type="text" placeholder="Tên người nhận" />
                        <p>Email <span className="text-red-600">*</span></p>
                        <input
                            onChange={(e) => handleChange(e.target.value, 'email')}
                            className="border-[1px] w-full border-gray-500 mb-3 mt-1 px-2 outline-none py-2 rounded-l" type="email" placeholder="Email" />
                        <p>Số điện thoại <span className="text-red-600">*</span></p>
                        <input
                            onChange={(e) => handleChange(e.target.value, 'phone')}
                            className="border-[1px] w-full border-gray-500 mb-3 mt-1 px-2 outline-none py-2 rounded-l" type="number" placeholder="Số điện thoại" />
                        <p>Địa chỉ nhận hàng <span className="text-red-600">*</span></p>
                        <textarea
                            onChange={(e) => handleChange(e.target.value, 'address')}
                            className="border-[1px] w-full border-gray-500 mb-3 mt-1 px-2 outline-none py-2 rounded-l" type="text" row={3} placeholder="Địa chỉ nhận hàng" />
                        <div
                            onClick={isDisabled ? ' ' : handleOpenModal}
                            className={`cursor-pointer m-auto w-[100px] justify-center w-[200px] p-3 bg-[#1d9fe3] ${isDisabled ? 'bg-[#81c6ec] cursor-not-allowed'
                                : 'bg-[#1d9fe3] cursor-pointer'
                                }`}>
                            <p className="text-center font-bold text-white">Đặt hàng</p>
                        </div>

                    </div>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                style={customStyles}
            >
                <div className=" w-[700px] h-auto ">
                    <div className="flex mb-[20px] justify-between">
                        <p className="text-[#1d9fe3] font-bold">XÁC NHẬN THÔNG TIN</p>
                        <p className="cursor-pointer hover:text-red-600" onClick={handleCloseModal}>X</p>
                    </div>
                    <hr className="mb-[20px]" />
                    <div className="flex justify-around">
                        <div><img className="w-[150px] h-[110px]" src={productInfo?.image || productInfo?.images[0]} alt=''></img></div>
                        <div>
                            <p className="font-semibold">Thông tin sản phẩm</p>
                            <p>Tên sản phẩm:{' '}<span>{productInfo?.name}</span></p>
                            <p>Hãng:{' '}<span>{productInfo?.brand}</span></p>
                            <p>Số lượng:{' '}<span>{quantity}</span></p>
                            <p>Tổng thanh toán:{' '}<span className="font-semibold">{quantity * productInfo.price}</span></p>
                            <br />
                            <p className="font-semibold">Thông tin khách hàng</p>
                            <p>Tên khách hàng:{' '}<span>{name}</span></p>
                            <p>Số điện thoại:{' '}<span>{phone}</span></p>
                            <p>Email:{' '}<span>{email}</span></p>
                            <p>Địa chỉ nhận hàng:{' '}<span className="">{address}</span></p>
                        </div>
                    </div>
                    <hr className="mt-[20px]" />
                    <div className="flex justify-center mt-[20px]">
                        <div
                            onClick={handleBuyProduct}
                            className="m-auto cursor-pointer text-center text-white w-[100px] h-[30px] bg-[#1d9fe3] 'bg-[#81c6ec] ">Xác nhận</div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Buy