import { useContext } from "react"
import { StoreContext } from "../context/storecontext"

export default function WishList() {
    const { wishList, addToCart,DeleteWishList } = useContext(StoreContext)
    return (
        <div className="container py-2 d-flex flex-wrap g-2 justify-content-center " style={{ minHeight: "74vh" }} >

            {wishList.length > 0 ?
                wishList.map(p =>

                    <div key={p.id} className="row m-5 justify-content-center rounded-4 position-relative shadow p-3 w-100 d-flex" style={{ height: "clamp(200px, 260px, 280px)" }}>
                        <button className={`rounded-circle badge btn p-0 fs-6 border-none position-absolute btn-danger`}
                            style={{ height: "25px", width: "25px", top: "-10px" }} onClick={()=>DeleteWishList(p)}>X</button>
                        <div className="col-4 ">
                            <img src={p.images[0]} alt="product" className="rounded-4" style={{ width: "clamp(10vW, 22vw, 100px)", objectFit: "contain" }} />
                        </div>

                        <div className="col-8">
                            <h2 className="fw-bolder mb-4">{p.name}</h2>
                            <div className="d-flex gap-1">
                                <span className="bg-primary px-2 rounded-3 text-light fw-semibold fs-6 myText" >{p.productType.toUpperCase()}</span>
                                <span className="bg-secondary px-2 rounded-3 text-light fw-semibold fs-6 myText" >{p.productBrand.toUpperCase()}</span>
                            </div>
                            <p className="mt-2 text-secondary " style={{ fontSize: "clamp(0.8rem, 1.1vw, 18px)" }}>{p.description}</p>
                            <div className="d-flex align-items-center gap-4">
                                <h3 className={`${p.discountPercentage === 0 ? "text-success" : "text-decoration-line-through text-muted"}`} style={{ fontSize: "clamp(1rem, 1.9vw, 20px)" }}>${p.price}</h3>
                                <h3 className={`${p.discountPercentage === 0 ? "d-none" : "text-danger"}`} style={{ fontSize: "clamp(1rem, 1.9vw, 20px)" }}>%{p.discountPercentage}</h3>
                                <h3 className={`${p.discountPercentage === 0 ? "d-none" : "text-success"}`} style={{ fontSize: "clamp(1rem, 1.9vw, 20px)" }}>${p.finalPrice.toFixed(2)}</h3>
                                <button className='btn btn-success px-3 btnAnimate rounded-5 fw-semibold shadow myText' style={{ fontSize: "clamp(0.5rem, 1.2vw, 18px)" }} onClick={() => addToCart(p)}>+To Cart</button>
                            </div>
                        </div>
                    </div>
                ) : <div className="py-5">
                    <img alt="empty cart" title="Cart Is Empty" src="/emptyWishlist.png" className="border-none rounded-4" style={{ width: "clamp(300px, 50vw, 550px)", height: "clamp(300px, 50vw, 550px)" }} />
                </div>
            }


        </div>)
}