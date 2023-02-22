import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../components/navbar";
import ProductCard from "../../components/product-card";
import Slider from "../../components/slider";
import { fakeData } from "./data";
import axios from 'axios'
import Loader from "../../components/loader";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import './style.css'

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [data, setData] = useState([])
    const [brand, setBrand] = useState([])
    const [totalPage, setTotalPage] = useState(0)
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

    const handleSeaching = (productName, productBrand, sortPrice) => {
        setLoading(true)
        axios
            .get(`https://lapcenter-v1.onrender.com/api/product`, {
                params: {
                    productName: productName,
                    productBrand: productBrand,
                    orderByDirection: sortPrice,
                    orderByColumn: 'price',
                    pageSize: 12,
                    pageNumber: 1
                },
            })
            .then(function (response) {
                setData(response.data.products)
                setLoading(false)
                setTotalPage(response.data.totalPage)
            })
            .catch(function (error) {
                setLoading(false)
            })
    }

    const handleSearchProductName = () => {
        handleSeaching(search, brand, sort)
    }

    const handleChangePage = (pageNumber) => {
        console.log("PAGE: ", pageNumber);
        handlePagination(search, brand, sort, pageNumber)
    }

    const handlePagination = (productName, productBrand, sortPrice, pageNumber) => {
        setLoading(true)
        axios
            .get(`https://lapcenter-v1.onrender.com/api/product`, {
                params: {
                    productName: productName,
                    productBrand: productBrand,
                    orderByDirection: sortPrice,
                    orderByColumn: 'price',
                    pageSize: 4,
                    pageNumber: pageNumber
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
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pb-20">
                                {data?.map((item) => (
                                    <ProductCard item={item} />
                                ))}
                            </div>
                        </div>
                    )}
                <div className="pagination">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={totalPage}
                        onPageChange={(e) => handleChangePage(e.selected + 1)}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage