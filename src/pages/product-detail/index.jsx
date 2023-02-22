import React, { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from '../../components/navbar'
import ProductCard from "../../components/product-card";
import { useLocation, useNavigate } from "react-router-dom";
import MoonLoader from 'react-spinners/MoonLoader'
import Loader from "../../components/loader";
import BrandCard from "../../components/brand-card";
import Carousel from 'react-multi-carousel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-multi-carousel/lib/styles.css';

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

const ProductDetail = () => {

    const { state } = useLocation()
    const [data, setData] = useState()
    const [listDataBrand, setListDataBrand] = useState()
    const [loading, setLoading] = useState(false)
    const [isDisableAddCart, setIsDisableAddCart] = useState(false)
    const [thumbnail, setThumbnail] = useState()
    const navigate = useNavigate()

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const fetchAPI = () => {
        setLoading(true)
        axios
            .get(
                `https://lapcenter-v1.onrender.com/api/product/getProductById/${state.id}`,
            )
            .then(function (response) {
                // handle success
                console.log('response: ', response.data.response)
                setData(response.data.response)
                setThumbnail(response.data.response.images[0])
                setLoading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error)
                setLoading(false)
            })
    }

    const handleSeaching = () => {
        setLoading(true)
        axios
            .get(`https://lapcenter-v1.onrender.com/api/product`, {
                params: {
                    productBrand: state.brand,
                },
            })
            .then(function (response) {
                setListDataBrand(response.data.products)
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
            })
    }

    const handleAddProductToCart = () => {
        setIsDisableAddCart(true)
        axios
            .post(`https://lapcenter-v1.onrender.com/api/cart/addProductToCart`, {
                userId: localStorage.getItem('userId'),
                productId: data?._id,
                productName: data?.name,
                productBrand: data?.brand,
                image: thumbnail,
                price: data?.price,
            })
            .then(function (response) {
                console.log(response)
                toastSuccess()
                setIsDisableAddCart(false)
            })
            .catch(function (error) {
                console.log(error)
                toastFail()
                setIsDisableAddCart(false)
            })
    }

    const toastSuccess = () => {
        toast.success('Thêm vào giỏ hàng thành công', {
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
        toast.error('thêm vào giỏ hàng thất bại', {
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

    useEffect(() => {
        fetchAPI()
        handleSeaching()
        window.scroll(0, 0)
    }, [state.id])

    return (
        <div>
            <div >
                <Navbar />
                {loading ? (
                    <Loader loading={loading} />
                ) : (
                    <div className="px-10 ">
                        <h1 className="text-2xl font-semibold">{data?.name}</h1>
                        <div className="flex">
                            <div className="flex">
                                <p>Tình trạng:</p>
                                <p className="ml-2">Còn hàng</p>
                            </div>
                            <div className="flex ml-6">
                                <p>Bảo hành:</p>
                                <p className="ml-2">24 tháng</p>
                            </div>
                        </div>
                        <hr className="my-3" />
                        <div className="flex">
                            <div className="w-[33%]">
                                <img className="w-[500px] h-[350px]" src={thumbnail} alt="" />
                                <div className="flex mt-3 justify-around">
                                    {data?.images.map((img, index) => (
                                        <img
                                            key={index}
                                            onClick={() => setThumbnail(img)}
                                            className="w-[100px] h-[70px] ml-14 border border-grey-600 cursor-pointer"
                                            src={img} alt="" />
                                    ))}

                                </div>
                            </div>
                            <div className="w-[33%] px-4">
                                <p>Giá bán: <span>{data?.price} VND</span></p>
                                <div className="mt-2">
                                    <div className="bg-green-600 p-5">
                                        <p className="text-lg text-stale-100">Khuyến mãi - Quà tặng</p>
                                    </div>
                                    <div className="p-5 border-dotted border-gray-500 border-2">
                                        <p className="text-lg font-semibold">Thông tin quà tặng</p>
                                    </div>
                                </div>
                                <div className="flex justify-center my-3">
                                    <div
                                        onClick={() => navigate("/buy", { state: { productInfo: data } })}
                                        className="w-[110px] p-2 bg-red-600 rounded-lg cursor-pointer hover:bg-red-700
                            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...
                            ">
                                        <p className="text-sm font-semibold text-slate-100 text-center">Mua ngay</p>
                                    </div>
                                </div>
                                {localStorage.getItem('name') && (
                                    <div className="flex justify-center my-3">
                                        <div
                                            onClick={!isDisableAddCart && handleAddProductToCart}
                                            className={`w-[150px] p-2 bg-[#1d9fe3] rounded-lg cursor-pointer hover:bg-red-700
                                            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...
                                            ${isDisableAddCart ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                            <p className="text-sm font-semibold text-slate-100 text-center">Thêm vào giỏ hàng</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-center">
                                    <span className="mt-[2px]">Gọi ngay</span>
                                    <span className="mx-2 text-lg text-red-600 font-semibold">010101001011</span>
                                    <span className="mt-[2px]">để giữ hàng!</span>
                                </div>
                            </div>
                            <div className="w-[33%] px-5">
                                <div>
                                    <p className="text-lg font-semibold">Điện thoại tư vấn - Đặt hàng</p>
                                    <ul className="ml-8">
                                        <li className="list-disc">Phone 1: 0101010101</li>
                                        <li className="list-disc">Phone 2: 0202020202</li>
                                        <li className="list-disc">Phone 3: 0303030303</li>
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <p className="text-lg font-semibold">Địa chỉ mua hàng</p>
                                    <ul className="ml-8">
                                        <li className="list-disc">111 Phan Thanh - Đà Nẵng</li>
                                        <li className="list-disc">04 Trần Cao Vân - Đà Nẵng</li>
                                        <li className="list-disc">K435/105 Hà Huy Tập - Đà Nẵng</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="my-5 px-20">
                            <table class="table-fixed w-full mb-10">
                                <thead>
                                    <tr className="text-left border-black">
                                        <th className="w-[20%]">Phần cứng</th>
                                        <th className="w-[20%]">Thông số kỹ thuật</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2">Model</td>
                                        <td className="py-2">{data?.model}</td>
                                    </tr>
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2">CPU</td>
                                        <td className="py-2">{data?.cpu}</td>
                                    </tr>
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2">RAM</td>
                                        <td className="py-2">{data?.ram}</td>
                                    </tr>
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2">Ổ cứng</td>
                                        <td className="py-2">{data?.disk}</td>
                                    </tr>
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2">Card đồ họa</td>
                                        <td className="py-2">{data?.card}</td>
                                    </tr>
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2">Màn hình</td>
                                        <td className="py-2">{data?.monitor}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr className="mt-5" />
                        <p className="text-2xl font-semibold mt-3">Sản phẩm cùng thương hiệu</p>
                        <div className="h-20">
                            <Carousel responsive={responsive}>
                                {listDataBrand?.length > 0
                                    &&
                                    listDataBrand.map((item, index) => (
                                        <BrandCard item={item} key={index} />
                                    ))}
                            </Carousel>
                        </div>
                    </div>
                )
                }


            </div>


        </div>
    )
}

export default ProductDetail