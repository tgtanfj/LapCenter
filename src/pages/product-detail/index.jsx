import React from "react";
import Navbar from '../../components/navbar'
import ProductCard from "../../components/product-card";


const ProductDetail = () => {
    return (
        <div>
            <div className="px-10 py-5">
                <Navbar />
                <h1 className="text-2xl font-semibold">Tên sản phẩm</h1>
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
                        <img className="w-full h-auto" src="https://fptshop.com.vn/Uploads/images/2015/0511/Lenovo-IdeaPad-Gaming-3-fpt-1.jpg" alt="" />
                        <div className="flex mt-3 justify-around">
                            <img className="w-[100px] h-[70px] ml-14 border border-grey-600 cursor-pointer" src="https://fptshop.com.vn/Uploads/images/2015/0511/Lenovo-IdeaPad-Gaming-3-fpt-1.jpg" alt="" />
                            <img className="w-[100px] h-[70px] border border-grey-600 cursor-pointer" src="https://fptshop.com.vn/Uploads/images/2015/0511/Lenovo-IdeaPad-Gaming-3-fpt-1.jpg" alt="" />
                            <img className="w-[100px] h-[70px] mr-14 border border-grey-600 cursor-pointer" src="https://fptshop.com.vn/Uploads/images/2015/0511/Lenovo-IdeaPad-Gaming-3-fpt-1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="w-[33%] px-4">
                        <p>Giá bán: <span>100000 VND</span></p>
                        <div>
                            <div className="bg-green-600 p-5">
                                <p className="text-lg text-stale-100">Khuyến mãi - Quà tặng</p>
                            </div>
                            <div className="p-5 border-dotted border-gray-500 border-2">
                                <p className="text-lg font-semibold">Thông tin quà tặng</p>
                            </div>
                        </div>
                        <div className="flex justify-center my-3">
                            <div className="w-[110px] p-2 bg-red-600 rounded-lg cursor-pointer hover:bg-red-700
                            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...
                            ">
                                <p className="text-sm font-semibold text-slate-100 text-center">Mua ngay</p>
                            </div>
                        </div>
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
                                <td className="py-2">Dell G7</td>
                            </tr>
                            <tr className="border-b-[1px] border-gray-200 py-2">
                                <td className="py-2">CPU</td>
                                <td className="py-2">Intel Core i7</td>
                            </tr>
                            <tr className="border-b-[1px] border-gray-200 py-2">
                                <td className="py-2">RAM</td>
                                <td className="py-2">8GB 3200MHZ</td>
                            </tr>
                            <tr className="border-b-[1px] border-gray-200 py-2">
                                <td className="py-2">Ổ cứng</td>
                                <td className="py-2">256GB</td>
                            </tr>
                            <tr className="border-b-[1px] border-gray-200 py-2">
                                <td className="py-2">Card đồ họa</td>
                                <td className="py-2">GTX-1050ti</td>
                            </tr>
                            <tr className="border-b-[1px] border-gray-200 py-2">
                                <td className="py-2">Màn hình</td>
                                <td className="py-2">15.6inch FHD (1920x1080)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail