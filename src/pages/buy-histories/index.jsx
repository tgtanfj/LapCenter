import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import axios from 'axios'
import Loader from "../../components/loader";
import { useNavigate } from "react-router";

const BuyHistorise = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    const handleGetAllProductInHistory = () => {
        setLoading(true)
        axios.get(`https://lapcenter-v1.onrender.com/api/history/${localStorage.getItem('userId')}`, {
        })
            .then(function (response) {
                setLoading(false)
                console.log('thanh cong: ', response);
                setData(response?.data.products)
            })
            .catch(function (error) {
                console.log('that bai: ', error);
                setLoading(false)
            });
    }

    useEffect(() => {
        handleGetAllProductInHistory()
    }, [])
    console.log('check data: ', data)

    return (
        <div>

            <Navbar />
            {loading ? <Loader /> :
                <div className="px-20 py-5">
                    <p className="text-center my-5 font-semibold text-xl">
                        Đơn hàng đã mua của {localStorage.getItem('name')}
                    </p>
                    <div className="my-5 px-20">
                        <table class="table-fixed w-full mb-10">
                            <thead>
                                <tr className="text-left border-black">
                                    <th className="w-[20%]">Địa chỉ</th>
                                    <th className="w-[20%]">Tên sản phẩm</th>
                                    <th className="w-[20%]">Hãng</th>
                                    <th className="w-[20%]">Số điện thoại</th>
                                    <th className="w-[20%]">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr className="border-b-[1px] border-gray-200 py-2">
                                        <td className="py-2">{item?.address}</td>
                                        <td className="py-2">{item?.productName}</td>
                                        <td className="py-2">{item?.productBrand}</td>
                                        <td className="py-2 font-semibold">{item?.phone}</td>
                                        <td className="py-2 font-semibold">{item?.quantity}</td>
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

export default BuyHistorise