import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/storecontext"
import SkeltonCard from "../components/skeltonCard";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { addToCart, addToWishList, dark } = useContext(StoreContext)

    const starRating = (rate) => {
        let rateHalf = rate - Math.floor(rate);
        let rateStars = Math.floor(rate);
        let empty = 5 - (rateStars + rateHalf);
        let stars = [
            ...Array.from({ length: rateStars }, (_, i) => (
                <i key={`full-${i}`} className="bi bi-star-fill"></i>
            )),
            ...(rateHalf > 0 ? [<i key="half" className="bi bi-star-half"></i>] : []),
            ...Array.from({ length: empty }, (_, i) => (<i key={`empty-${i}`} className="bi bi-star"></i>))
        ]
        return stars;
    }

    useEffect(() => {
        api.get(`/Products/${id}`).then(res => setProduct(res.data))
    }, [id]);


    if (!product) return (<div className="mt-5 container " style={{ minHeight: "426px" }}>
        <div><SkeltonCard /></div>
    </div>);
    var ratePercentage = ((product.rating / 5) * 100).toFixed(1);
    const reviews = product.reviews;

    return (
        <div className="container position-relative  py-5 " style={{ minHeight: "74vh" }}>
            <div className="row justify-content-around gap-2 mb-5" >
                <div className="col-xl-5 mb-4">
                    <img src={product.images[0] || "/image-not-found.png"}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/image-not-found.png";
                        }} alt="product" className="mb-1 productImg " style={{ maxWidth: "450px", maxHeight: "350px" }} />
                </div>

                <div className="col-xl-6">
                    <h2 >{product.name}</h2>
                    <p className="fs-5 mt-3">{product.description}</p>
                    <div className="d-flex gap-4 mt-4">
                        <h5 className="bg-primary barShadow rounded-4 text-light fw-semibold w-50 text-center py-1">{product.productType.toUpperCase()}</h5>
                        <h5 className="bg-secondary barShadow rounded-4 text-light fw-semibold w-50 text-center py-1">{product.productBrand.toUpperCase()}</h5>
                    </div>
                    <div className="d-flex align-content-center justify-content-between gap-4 mt-4">
                        <div className="d-flex gap-5 align-items-center mt-3">
                            <h3 className={`fw-bold ${product.discountPercentage ? `${dark ? "text-light" : "text-muted"} text-decoration-line-through` : "text-success"}`}>${product.price}</h3>
                            <h6>{product.stockQuantity}<span className="text-muted"> Items Left</span></h6>
                        </div>
                        <div className="d-flex gap-4 mt-3">
                            <button className='btn btn-outline-danger rounded-5 shadow border-0' onClick={() => addToWishList(product)}>❤️</button>
                            <button className='btn btnAnimate btn-success btn-sm rounded-5 fw-semibold shadow' onClick={() => addToCart(product)}>+To Cart</button>
                        </div>
                    </div>
                    <div className="row">
                        <h6 className="text-danger ">Discount: %{product.discountPercentage}</h6>
                        <h4 className="">Price: <span className="text-success">${product.finalPrice.toFixed(2)}</span></h4>

                    </div>
                    <div className=" row justify-content-around gap-2 align-items-center mt-4">
                        <div className="col-2 ">
                            <h4 className="text-secondary">Rated</h4>
                        </div>
                        <div className="progress p-0 col-8 barShadow" style={{ height: "25px" }} role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-success" style={{ width: `${ratePercentage}%` }}><h4 className="my-0">%{ratePercentage}</h4></div>
                        </div>
                    </div>
                </div>
            </div>
            {reviews?.length > 0 ?
                <div className={`row `} >
                    <div className="d-flex justify-content-center gap-2 mt-4">
                        <div id="carouselExample" className="carousel carousel-fade">

                            <div className="carousel-inner d-flex" style={{ width: "clamp(330px, 85vw, 810px)" }}>
                                {reviews?.map((r, i) => (
                                    <div key={r.id} style={{ position: "relative", minHeight: "200px" }} className={`card carousel-item ${dark ? "bg-secondary-subtle" : "bg-light"} ${i === 0 ? "active" : ""} rounded-5 shadow mx-1 px-3 py-3`}>
                                        <h4 className="text-center" style={{ fontSize: "clamp(14px, 18px, 22px)" }}>{r.reviewerName}</h4>
                                        <p className="text-muted text-center" style={{ fontSize: "14px" }}>{r.reviewerEmail}</p>
                                        <p className="fw-semi-bold text-success" style={{ fontSize: "clamp(18px, 20px, 26px)" }}>{r.comment}</p>
                                        <h5 className="text-warning mb-3">{starRating(r.rating)}</h5>
                                        <span style={{ fontSize: "14px", position: "absolute", bottom: "12px", right: "20px" }} className="text-muted">{r.date}</span>
                                    </div>
                                ))}

                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon me-5 btn btn-warning rounded-circle" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>

                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon ms-5 btn btn-warning rounded-circle" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                </div> : <div className="text-center mt-5"><h3 className="mt-5"><i className="bi bi-stars text-warning"></i>No Reviews Yet... </h3> </div>}


        </div >

    );
}