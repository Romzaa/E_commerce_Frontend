import { useEffect, useContext, useState } from "react";
import ProductCard from "../components/productcard";
import SkeltonCard from "../components/skeltonCard";
import { StoreContext } from "../context/storecontext";
import { Link } from "react-router-dom";
export default function Home() {


    const { dark, setBrandQ, setTypeQ, setSearchV, setSortQ, setPageIndexQ,
        setPageSizeQ, loading, pageNavs, categories, brands } = useContext(StoreContext);



    const products = pageNavs.data;
    const pageIndex = Number(pageNavs?.pageIndex) || 1;
    const pageSize = Number(pageNavs?.pageSize) || 10;
    const resultCount = Number(pageNavs?.count) || 0;
    const totalPages = Math.ceil(resultCount / pageSize);

    const nextPage = () => pageIndex < totalPages ? setPageIndexQ(pageIndex + 1) : false;
    const firstPage = () => pageIndex > 0 ? setPageIndexQ(1) : false;
    const lastPage = () => pageIndex < totalPages ? setPageIndexQ(totalPages) : false;
    const prevPage = () => pageIndex > 1 ? setPageIndexQ(pageIndex - 1) : false;

    const setpageSize = (e) => {
        const newPageSize = Number(e);
        setPageSizeQ(newPageSize);
        const newTotalPages = Math.ceil(resultCount / newPageSize);
        if (pageIndex > newTotalPages) { setPageIndexQ(1) };
    };

    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }) }, [pageIndex])
    useEffect(() => { setPageIndexQ(1) }, [setSearchV, setBrandQ, setTypeQ, setSortQ, pageSize, setPageIndexQ])


    const [newSearch, setNewSearch] = useState("");
    const handleSearch = (value) => {
        setTimeout(() => {
            setSearchV(value);
            setNewSearch("");
        }, 1500);
    }


    return (
        <div className="container d-flex justify-content-center flex-column py-4" >
            {/*Search, Filter, Sort, Page Count*/}
            <div className="row d-flex gap-1  justify-content-center align-items-center mt-3">
                <div className="col-lg-5 mt-1">
                    <div className="input-group">
                        <input value={newSearch}
                            type="text" style={{ height: "40px" }} className=" form-control bg-secondary-subtle" placeholder="Search"
                            aria-label="Search" aria-describedby="button-addon2" onChange={e => { setNewSearch(e.target.value); }} />
                        <button className="btn btn-secondary" onClick={() => handleSearch(newSearch)} type="button" id="button-addon2"><i className="bi bi-search"></i></button>
                    </div>
                </div>
                <div className="col-lg-2">

                    <select style={{ height: "40px" }} className="form-control bg-secondary-subtle" placeholder="Filter" onChange={e => setTypeQ(e.target.value)}>
                        <option value="">Categories-All</option>
                        {categories.map(c => {
                            return (
                                <option key={c.id} value={c.id}>{c.name}</option>)
                        })}
                    </select>
                </div>
                <div className="col-lg-2">
                    <select style={{ height: "40px" }} className="form-control bg-secondary-subtle" placeholder="Filter" onChange={e => setBrandQ(e.target.value)}>
                        <option value="">Brands-All</option>
                        {brands.map(c => {
                            return (
                                <option key={c.id} value={c.id}>{c.name}</option>)
                        })}
                    </select>
                </div>
                <div className="col-lg-1 d-flex flex-column gap-1 align-items-center">
                    <select className="rounded-3 ps-1 border-0 bg-secondary-subtle" placeholder="Sort" onChange={e => setSortQ(e.target.value)}>
                        <option value="0">Sort</option>
                        <option value="1">A-Z</option>
                        <option value="2">Z-A</option>
                        <option value="3">Price-Up</option>
                        <option value="4">Price-Down</option>
                    </select>
                    <select className="rounded-3 ps-1 border-0 bg-secondary-subtle" placeholder="Count" onChange={e => setpageSize(e.target.value)}>
                        <option value="12">Page Count</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                    </select>
                </div>
                <span className={`text-center mt-1 ${dark ? "text-light" : "text-muted"}`}><span className={`fw-semibold ${dark ? "text-warning" : "text-dark"}`}>{resultCount}</span> Items Found</span>

            </div>

            <div className="d-flex px-4 flex-wrap justify-content-center mt-2" style={{ minHeight: "74vh" }}>

                {loading &&

                    Array.from({ length: 8 }).map((_, i) => (
                        <div className="col-lg-3 col-sm-6 mb-4" key={i}><SkeltonCard /></div>
                    ))}

                <>{!loading && products.length === 0 && <h1>No Products Found !</h1>}
                    {(products.map(p => <div className=" col-xxl-3 col-lg-4 col-md-6 mb-4" key={p.id}><ProductCard product={p} /></div>))
                    }
                    <div className="container d-flex justify-content-center mt-3">
                        <div className=" d-flex gap-3 " style={{ maxHeight: "35px" }}>
                            <Link className="fs-2" onClick={prevPage} title="Previous Page" hidden={pageIndex === 1}><i className="bi bi-chevron-double-left"></i></Link>
                            <Link className="fs-5 my-2 text-dark fw-bold text-decoration-none" title="First Page" onClick={firstPage} hidden={pageIndex <= 1}>{pageIndex - pageIndex + 1}</Link>
                            <h4 className='text-center my-1 fw-bold mb-1 text-secondary'>{pageIndex}</h4>
                            <Link className="fs-5 my-2 text-dark fw-bold text-decoration-none" title="Last Page" onClick={lastPage} hidden={pageIndex >= totalPages}>{totalPages}</Link>
                            <Link className="fs-2" onClick={nextPage} title="Next Page" hidden={pageIndex >= totalPages}><i className="bi bi-chevron-double-right"></i></Link>
                        </div>
                    </div>

                </>

            </div>



        </div >
    )
}