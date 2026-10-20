import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/storecontext';

export default function ProductCard({ product }) {
    const { dark, addToCart, addToWishList } = useContext(StoreContext);
    return (
        <Card className={`p-3 rounded-4 mx-2 ${dark ? "bgCard " : "bg-subtle shadow"}`}
            style={{ minHeight: "500px", maxHeight: "520px", minWidth: "280px", maxWidth: '360px' }}>
            <Link className='' to={`/product/${product.id}`}>
                <Card.Img className='rounded-3' title={product.name} style={{ minHeight: "200px", height: "200px" }} variant="top" src={product.thumbnailUrl || "/image-not-found.png"}
                    onError={(e) => {
                        e.currentTarget.onerror = null; // Prevent infinite loop
                        e.currentTarget.src = "/image-not-found.png";
                    }} />
            </Link>
            <Card.Body >
                <div className='d-flex flex-column justify-content-center'>
                    <span className='badge bg-danger mb-1 px-2'>{product.productType.toUpperCase()}</span>
                    <span className='badge bg-secondary mb-2 px-2'>{product.productBrand.toUpperCase()}</span>
                </div>
                <Card.Title title={product.name} style={{ minHeight: "30px", fontSize: "clamp(1.1rem, 1.2vw, 2rem)" }}>{product.name.trim().length > 20 ? product.name.trim().slice(0, 20) + `..` : product.name}</Card.Title>
                <div className='d-flex justify-content-between flex-wrap mb-1'>
                    <div >
                        <button className='btn btnAnimate btn-success btn-sm rounded-5 fw-semibold shadow' onClick={() => addToCart(product)}>+To Cart</button>
                        <button className='btn btn-outline-danger btn-sm shadow rounded-5 ms-3 border-0' onClick={() => addToWishList(product)}>❤️</button>
                    </div>
                    <div>
                        <strong className='fs-5 text-success '>${product.price}</strong>
                    </div>
                </div>
                <Card.Text style={{ minHeight: "90px", maxHeight: "90px", fontSize: "clamp(0.8rem, 15px , 16px)" }} className={dark ? "text-secondary my-2" : 'text-muted my-2'}>{product.description.slice(0, 80)}.... </Card.Text>
                <Link className='btn btn-warning fw-semibold mb-2 w-100 rounded-5' to={`/product/${product.id}`} >Details</Link>
            </Card.Body>
        </Card>
    );
};

