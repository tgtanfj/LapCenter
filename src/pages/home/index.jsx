import React, { useState } from "react";
import Navbar from "../../components/navbar";
import ProductCard from "../../components/product-card";
import Slider from "../../components/slider";
import { fakeData } from "./data";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(fakeData)

    const handleSearchProduct = (val) => {
        if (val) {
            setSearch(val)
        } else {
            setSearch(val)
            setData(fakeData)
        }
        
    }

    const handleSubmitSearch = () => {
        setData(
            fakeData.filter(item => item.productName.toLowerCase().includes(search.toLowerCase()))
        )
    }

    return (
        <div className="mx-10">
            <Navbar />
            <div className="">
                <Slider />
                <div className="flex mb-5 justify-end">
                    <div className="flex mr-5">
                        <input
                            onChange={(e) => handleSearchProduct(e.target.value)}
                            className="outline-none mr-1 rounded py-2 px-2 border-[1px] border-gray-400" placeholder="Nhập tên sản phẩm" type="text" name="" id="" />
                        <div onClick={handleSubmitSearch} className="p-2 cursor-pointer text-[#fff] rounded h-10 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">Tìm kiếm</div>
                    </div>
                    <div className="flex mr-5">
                        <p className="mt-2 mr-1">Hãng</p>
                        <select className="w[140px] cursor-pointer rounded py-2 px-2 border-[1px] border-gray-400 ">
                            <option value="">Dell</option>
                            <option value="">Acer</option>
                            <option value="">Asus</option>
                            <option value="">Macbook</option>
                            <option value="">WallE-Simple</option>
                        </select>
                    </div>
                    <div className="flex">
                        <p className="mt-2 mr-1">Giá</p>
                        <select className="w[240px] cursor-pointer rounded py-2 px-2 border-[1px] border-gray-400">
                            <option value="">Thấp đến cao</option>
                            <option value="">Cao đến thấp</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((item) => (
                        <ProductCard item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage