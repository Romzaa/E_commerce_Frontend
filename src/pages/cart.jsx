import { useContext, useEffect, useState } from "react"
import { StoreContext, stripePromise } from "../context/storecontext"
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./paymentForm";
export default function Cart() {
    const { cart, increase, decrease, cartCount,
        orderDto, setOrderDto, SubmitOrder,
        dark, getDeliveryMethods, deliveryMethodsList } = useContext(StoreContext);
    useEffect(() => { getDeliveryMethods() }, [getDeliveryMethods])

    const [deliveryId, setDeliveryId] = useState();
    const [payCart, setPayCart] = useState();
    const [finalBill, setFinalBill] = useState();
    const [checkOut, setCheckOut] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const selectedDelivery = deliveryMethodsList.find(
        d => d.id === deliveryId
    );

    const ConfirmOrder = async (e) => {
        e.preventDefault();
        const token = await localStorage.getItem("token");
        let myorderDto = {
            deliveryMethodId: selectedDelivery.id,
            cartId: cart.id,
            shipToAddress: {
                firstName: orderDto.firstName,
                lastName: orderDto.lastName,
                street: orderDto.street,
                city: orderDto.city,
                country: orderDto.country
            }
        };

        console.log("ORDER DTO:", myorderDto);

        try {
            if (token) {
                const res = await SubmitOrder(myorderDto, token);
                setFinalBill(res.order);
                setPayCart(res.cart);
                console.log("ORDER RESULT:", res);
                setCheckOut(true);
            }
        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("REQUEST:", error.config?.data);
        }
    }

    const Purchase = async () => {
        await setCheckOut(false);
        await setShowPaymentForm(true);
    }

    return (
        <div className="container p-3 d-flex flex-column gap-2 justify-items-center " style={{ minHeight: "74vh" }} >
            <div className="d-flex mt-3 gap-2 justify-content-center align-items-center">
                <h4 className=""><span className="text-warning fs-2"><i className="bi bi-cart4"></i></span> :</h4>
                <span className={`${dark ? "text-light" : "text-muted "} fw-bold`}>{cart.id}</span>
            </div>
            {cartCount > 0 ? (
                <div className="d-flex flex-column justify-content-center">
                    {cart.cartItems.map(p => (

                        <div key={p.id} className="row m-3 align-items-center rounded-5 shadow p-2 d-flex" style={{ height: "clamp(20vh, 35vh, 35vh)" }}>
                            <div className="col-4">
                                <img src={p.pictureUrl} alt="product" className="img-fluid productImg rounded-5" style={{ width: "clamp(10vW, 22vw, 100px)", objectFit: "contain" }} />
                            </div>

                            <div className="col-8">
                                <h2>{p.productName}</h2>
                                <p className="mt-2 text-secondary" style={{ fontSize: "clamp(0.8rem, 1.1vw, 18px)" }}>{p.description}</p>
                                <h3 className="text-success">${p.price * p.quantity}</h3>
                                <div>
                                    <button className="btn-sm  btn btn-outline-primary" onClick={() => increase(p.id)}>➕</button>
                                    <span className="mx-2 fs-5">{p.quantity}</span>
                                    <button className="btn-sm btn btn-outline-danger" onClick={() => decrease(p.id)}>➖</button>
                                </div>
                            </div>


                        </div>

                    ))}
                    <div className="my-2 text-center ">
                        <strong className="fs-2">Subtotal : </strong ><strong className="fs-3 text-success">${cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</strong>
                    </div>

                    <form onSubmit={ConfirmOrder} className="container border border-2 rounded-4 p-3" style={{ maxWidth: "50vw", minWidth: "400px" }}>

                        <div className="row mb-2 d-flex  align-items-center">
                            <label className="col-6 fw-semibold" htmlFor="deliveryMethod">Delivery Type :</label>
                            <select required aria-label="deliveryMethod" placeholder="" className="form-control w-50 "
                                onChange={e => { setDeliveryId(Number(e.target.value)) }}>
                                <option>Choose Delivery Method</option>
                                {deliveryMethodsList.map(d => (
                                    <option key={d.id} value={d.id} label={d.shortName}>{d.shortName}</option>
                                ))}
                            </select>
                            {selectedDelivery && (
                                <div className="mt-2 ms-1">
                                    <p><span className="fw-bold text-secondary">Description:</span> <span className="mx-2 fw-semibold text-primary">{`${selectedDelivery.description}`}</span> </p>
                                    <span><span className="fw-bold text-secondary">Duration:</span> <span className="mx-2 fw-semibold text-primary">{`${selectedDelivery.deliveryTime}`}</span></span>
                                    <span><span className="fw-bold text-secondary">- Cost:</span> <span className="mx-2 fw-semibold text-primary">{`$${selectedDelivery.cost}`}</span></span>
                                </div>)
                            }
                        </div>
                        <div className="">
                            <h5>Shipping Address</h5>
                            <div className="d-flex gap-2">
                                <input onChange={e =>
                                    setOrderDto(prev => ({
                                        ...prev,
                                        firstName: e.target.value
                                    }))
                                } required className="form-control w-50" placeholder="First Name"></input>
                                <input onChange={e =>
                                    setOrderDto(prev => ({
                                        ...prev,
                                        lastName: e.target.value
                                    }))
                                } required className="form-control w-50" placeholder="Last Name"></input>
                            </div>
                            <div className="d-flex gap-2 mt-1">
                                <input onChange={e =>
                                    setOrderDto(prev => ({
                                        ...prev,
                                        city: e.target.value
                                    }))
                                } required className="form-control w-50" placeholder="City"></input>
                                <input onChange={e =>
                                    setOrderDto(prev => ({
                                        ...prev,
                                        country: e.target.value
                                    }))
                                } required className="form-control w-50" placeholder="Country"></input>
                            </div>
                            <input onChange={e =>
                                setOrderDto(prev => ({
                                    ...prev,
                                    street: e.target.value
                                }))
                            } className="form-control mt-1" placeholder="Street, Marks, Specific Directions..."></input>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button title="Confirm Order" type="submit" className="mt-3 btn btn-primary badge btnAnimate rounded-3"
                            >Confirm Order <i className="bi bi-bag-check"></i>
                            </button>
                        </div>
                    </form>
                    {checkOut && (
                        <div className="modal fade show d-block" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                        <button type="button" onClick={() => { setCheckOut(false) }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="d-flex flex-column">
                                            <span><span className="fs-5 text-primary"><i className="bi bi-cart4"></i></span> : {finalBill.id}</span>
                                            <span><span className="fw-semibold fs-6">Email : </span>{finalBill.buyerEmail}</span>
                                            <span><span className="fw-semibold fs-6">Order Date : </span>{finalBill.orderDate}</span>
                                        </div>
                                        <h6>Items</h6>
                                        {finalBill.items.map((i) =>
                                            <div className="container d-flex gap-3">
                                                <span>{i.productName}</span>
                                                <span>$ {i.price}</span>
                                                <span>{i.quantity}</span>
                                            </div>)}
                                        <div>
                                            <h6>Shipping To : </h6>
                                            <div className="container d-flex gap-1">
                                                <span>{finalBill.shipToAddress.firstName}</span>
                                                <span>{finalBill.shipToAddress.lastName} || </span>
                                                <span>{finalBill.shipToAddress.street}-</span>
                                                <span>{finalBill.shipToAddress.city}-</span>
                                                <span>{finalBill.shipToAddress.country}</span>
                                            </div>
                                        </div>
                                        <h6>Delivery : {finalBill.deliveryMethod}</h6>
                                        <h6>Order Is : {finalBill.status}</h6>
                                        <div className="text-center">
                                            <h6>Sub Total : $ {finalBill.subTotal}</h6>
                                            <h6><span className="text-primary">Delivery Cost :</span> $ {finalBill.deliveryCost}</h6>
                                            <h6 className="text-success">Total : $ {finalBill.total}</h6>
                                        </div>
                                    </div>
                                    <div className="modal-footer justify-content-center">
                                        <button title="Purchase" type="button" onClick={() => Purchase()} className="btn btn-primary btnAnimate py-0 rounded-4">Purchase <i class="bi bi-credit-card-2-back"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showPaymentForm && payCart?.clientSecret && (
                        <div className=" modal fade show bg-primary-subtle d-block" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Payment Form</h1>
                                <button type="button" onClick={() => { setShowPaymentForm(false); window.location.reload() }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body justify-content-center mt-5">
                                <Elements stripe={stripePromise} options={{ clientSecret: payCart.clientSecret }}>
                                    <PaymentForm />
                                </Elements>
                            </div>
                        </div>

                    )}
                </div>
            ) : <div className="d-flex justify-content-center">
                <img alt="empty cart" title="Cart Is Empty" src="/emptyCart.png" style={{ width: "clamp(300px, 50vw, 550px)", height: "clamp(300px, 50vw, 550px)" }} />
            </div>
            }

        </div >
    )
}