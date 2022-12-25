import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../components/navbar";
import ProductCard from "../../components/product-card";
import Slider from "../../components/slider";
import { fakeData } from "./data";
import axios from 'axios'
import Loader from "../../components/loader";

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [data, setData] = useState([])
    const [brand, setBrand] = useState([])
    const [loading, setLoading] = useState(false)


    const handleSearchProduct = (val) => {
        setSearch(val)
    }

    const handleFilterBrand = (value) => {
        setBrand(value)
        handleSeaching(search, value, sort)
    }

    const handleSortPrice = (value) => {
        setSort(value)
        handleSeaching(search, brand, value)
    }

    useEffect(() => {
        // fetchAPIAxios()
        handleSeaching('', '', '')
    }, [])

    const fetchAPIAxios = () => {
        setLoading(true)
        axios.get('https://lapcenter-v1.onrender.com/api/product')
            .then(function (response) {
                setData(response.data.products)
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error);
            })
            .finally(function () {
                setLoading(false)
            });
    }

    const handleSeaching = (productName, productBrand, sortPrice) => {
        setLoading(true)
        axios
            .get(`https://lapcenter-v1.onrender.com/api/product`, {
                params: {
                    productName: productName,
                    productBrand: productBrand,
                    orderByDirection: sortPrice,
                    orderByColumn: 'price',
                },
            })
            .then(function (response) {
                setData(response.data.products)
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
            })
    }

    const handleSearchProductName = () => {
        handleSeaching(search, brand, sort)
    }

    return (
        <div className="">
            <Navbar />
            <div className="mx-10 px-10">
                {localStorage.getItem('name') && (
                    <p className="text-right font-semibold">Xin chào, {localStorage.getItem(('name'))}!</p>
                )}
                <Slider />
                <div className="flex mb-5 justify-end">
                    <div className="flex mr-5">
                        <input
                            onChange={(e) => handleSearchProduct(e.target.value)}
                            className="outline-none mr-1 rounded py-2 px-2 border-[1px] border-gray-400" placeholder="Nhập tên sản phẩm" type="text" name="" id="" />
                        <div
                            onClick={() => handleSearchProductName()}
                            className="p-2 cursor-pointer text-[#fff] rounded h-10 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                            Tìm kiếm
                        </div>
                    </div>
                    <div className="flex mr-5">
                        <p className="mt-2 mr-1">Hãng</p>
                        <select
                            onChange={(e) => handleFilterBrand(e.target.value)}
                            className="w[140px] cursor-pointer rounded py-2 px-2 border-[1px] border-gray-400 ">
                            <option value="">Tất cả</option>
                            <option value="dell">Dell</option>
                            <option value="acer">Acer</option>
                            <option value="asus">Asus</option>
                            <option value="lenovo">Lenovo</option>
                        </select>
                    </div>
                    <div className="flex">
                        <p className="mt-2 mr-1">Giá</p>
                        <select
                            onChange={(e) => handleSortPrice(e.target.value)}
                            className="w[240px] cursor-pointer rounded py-2 px-2 border-[1px] border-gray-400">
                            <option value="">Tất cả</option>
                            <option value="asc">Thấp đến cao</option>
                            <option value="desc">Cao đến thấp</option>
                        </select>
                    </div>
                </div>
                {loading ? (
                    <Loader loading={loading} />
                )
                    :
                    (
                        <div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {data?.map((item) => (
                                    <ProductCard item={item} />
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default HomePage