import api from "../api/axios";
import { useState, createContext, useEffect, useCallback, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { LoginContext } from "./loginContext";
import { AdminContext } from "./adminContext";
export const stripePromise = loadStripe("pk_test_51TziUz8rVPZccizNYjSMOAMmnTR15YERgfRQwZsE6IMp23hjlmPOxl5DGIkcfv27pQwx4Dhmt77hoaYlbfg4mQEo00qIFMNOP9")
export const StoreContext = createContext();
export function StoreProvider({ children }) {

    const { setIsLoggedIn, setShowLoginModal } = useContext(LoginContext);
    const { setRequestState } = useContext(AdminContext);
    ////Cart
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState(() => {
        const existingId = localStorage.getItem("CartId") ?? crypto.randomUUID();
        localStorage.setItem("CartId", existingId);
        return {
            id: existingId,
            cartItems: [],
            clientSecret: null,
            paymentIntentId: null,
            deliveryMethodId: 0,
            shippingPrice: 0
        }
    });

    ///Wishlist
    const [wishList, setWishList] = useState(() => {
        const saved = localStorage.getItem("WishList");
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem("WishList", JSON.stringify(wishList));
    }, [wishList]);

    ///Order-DTO
    const [orderDto, setOrderDto] = useState({
        cartId: "",
        deliveryMethodId: "",
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        country: ""


    })
    ///DeliveryList
    const [deliveryMethodsList, setDeliveryMethodsList] = useState([])

    ///Store-Context
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(true);

    //Query-Params >> followed with (q,Q) <<
    const [brandq, setBrandQ] = useState();
    const [typeq, setTypeQ] = useState();
    const [searchv, setSearchV] = useState();
    const [sortq, setSortQ] = useState();
    const [pageIndexq, setPageIndexQ] = useState(1);
    const [pageSizeq, setPageSizeQ] = useState(12);
    //===========
    // Result Navigations(Count, Pagination, Data)
    const [pageNavs, setPageNavs] = useState({
        count: 0,
        PageSize: 0,
        PageIndex: 1,
        data: []
    });

    ///// Load All Product 
    useEffect(() => {
        let token = localStorage.getItem('token');
        setLoading(true);
        api.get("/Products", {
            params: {
                BrandId: brandq,
                TypeId: typeq,
                SearchValue: searchv,
                Sort: sortq,
                PageIndex: pageIndexq,
                PageSize: pageSizeq
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setPageNavs(res.data))
            .catch(error => {
                setRequestState({
                    message: error.response?.data.detail,
                    type: "danger"
                });
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    setShowLoginModal(true);
                }
            })
            .finally(() => setTimeout(() => {
                setLoading(false)
            }, 600))

    }, [pageSizeq, pageIndexq, sortq, searchv, typeq, brandq, setIsLoggedIn, setShowLoginModal, setRequestState]);

    ///// Load All Categories    
    useEffect(() => {
        api.get("/Products/types")
            .then(res => setCategories(res.data))
            .catch(e =>
                setRequestState({
                    message: e.response?.data.detail,
                    type: "danger"
                })
            )
            .finally(() => setLoading(false))
    }, [setRequestState]);

    ///// Load All Brands
    useEffect(() => {
        api.get("/Products/brands")
            .then(res => setBrands(res.data))
            .catch(e =>
                setRequestState({
                    message: e.response?.data.detail,
                    type: "danger"
                })
            )
            .finally(() => setLoading(false))
    }, [setRequestState]);

    ///// Load Cart If Avilable    
    useEffect(() => {
        const cartId = localStorage.getItem("CartId");
        const cartExists = localStorage.getItem("CartExists");

        if (!cartId || cartExists !== "true") {
            return;
        }
        const loadCart = async () => {
            try {
                const res = await api.get(
                    `/Carts/${cartId}`).catch(error => {
                        if (error.response === 500) {
                            setCart({
                                id: cartId,
                                cartItems: [],
                                clientSecret: null,
                                paymentIntentId: null,
                                deliveryMethodId: 0,
                                shippingPrice: 0
                            });
                            localStorage.setItem("CartExists", "false");
                            setCartCount(0);
                            return;
                        }
                    }
                    )
                if (res.status === 200) {
                    setCart(res.data);
                    setCartCount(res.data.cartItems?.length || 0);
                }


            } catch (error) {
                localStorage.setItem("CartExists", "false");
                console.error("Request failed:", error);
            }
        };

        loadCart();
    }, []);

    ///// Create Or Update Cart    
    const addToCart = async (product) => {

        const existing = cart.cartItems.find(i => i.id === product.id);

        let updatedItems;

        if (existing) {
            updatedItems = cart.cartItems.map(i =>
                i.id === product.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            );
        } else {
            updatedItems = [
                ...cart.cartItems,
                {
                    id: product.id,
                    productName: product.name,
                    pictureUrl: product.thumbnailUrl,
                    price: product.finalPrice.toFixed(2),
                    quantity: 1
                }
            ];
        }

        const updatedCart = {
            ...cart,
            cartItems: updatedItems
        };

        setCart(updatedCart);

        const res = await api.post(
            "/Carts",
            updatedCart
        );

        setCart(res.data);
        setCartCount(res.data.cartItems.length)
        localStorage.setItem("CartExists", "true");
        localStorage.setItem("CartId", res.data.id);
    };

    ///// Increase Quantity Inside Cart    
    const increase = async (pid) => {
        const updateCart = {
            ...cart, cartItems:
                cart.cartItems.map(item => item.id === pid ? { ...item, quantity: item.quantity + 1 } : item)
        }
        setCart(updateCart);

        const res = await api.post("/Carts", updateCart);
        setCart(res.data);
    };

    ///// Decrease Quantity Inside Cart
    const decrease = async (pid) => {
        const updateCart = {
            ...cart, cartItems:
                cart.cartItems.map(item => item.id === pid ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0)
        }
        setCart(updateCart);
        if (updateCart.cartItems.length === 0) {
            api.delete(`/Carts/${updateCart.id}`)
            setCartCount(0)
            const newId = crypto.randomUUID();
            localStorage.setItem("CartId", newId);
            localStorage.setItem("CartExists", "false");

            setCart({
                id: newId,
                cartItems: [],
                clientSecret: null,
                paymentIntentId: null,
                deliveryMethodId: 0,
                shippingPrice: 0
            })

        }
        else {
            const res = await api.post("/Carts", updateCart)
            setCart(res.data);
            setCartCount(res.data.cartItems.length)

        }
    };

    ///// Add To Wishlist >> (Local-Storage Only)
    const addToWishList = (product) => {
        setWishList(prevs => {
            const exists = prevs.find(p => p.id === product.id);
            if (exists) return prevs
            return [...prevs, { ...product }];
        })
    };

    //// Delete Wishlist 
    const DeleteWishList = (product) => {
        setWishList(prevs => {
            return prevs.filter(p => p.id !== product.id)
        })
    };

    //// Get Delivery Methods => On Cart-Page
    const getDeliveryMethods = useCallback(async () => {
        let res = await api.get(`/Orders/deliverymethods`);
        setDeliveryMethodsList(res.data);
    }, []);

    //// Payment Intent => On Cart-Page
    const addDeliveryMethod = async (deliveryId, cartId) => {
        let cart = await api.get(`/Carts/${cartId}`).then(response => response.data);
        let updateCart = { ...cart, deliveryMethodId: deliveryId };

        let res = await api.post(`/Carts`, updateCart).then(response => response.data);
        return res;
    }

    const placeOrder = async (myorderDto, token) => {
        let res = await api.post(`/Orders`, myorderDto,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); if (res.status === 200) {
                localStorage.setItem("CartExists", "false");
            }

        return res.data;
    }

    const createPaymentIntent = async (myorderDto, token) => {
        const id = myorderDto.cartId;
        const res = await api.post(
            `/Payments/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(res => res.data);
        return res;
    }

    const SubmitOrder = async (myorderDto, token) => {
        const deliveryId = myorderDto.deliveryMethodId;
        const cartId = myorderDto.cartId;
        await addDeliveryMethod(deliveryId, cartId)
        const updatedCart = await createPaymentIntent(myorderDto, token);
        const order = await placeOrder(myorderDto, token);
        return {
            cart: updatedCart,
            order: order
        };
    }

    return (
        <StoreContext.Provider value={{
            setBrandQ, setTypeQ, setSearchV, setSortQ, searchv, setPageIndexQ, setPageSizeQ,
            pageNavs, categories, brands, cart, cartCount, dark, setDark, loading, wishList,
            increase, decrease, addToCart, addToWishList, DeleteWishList, setOrderDto, orderDto,
            getDeliveryMethods, deliveryMethodsList, stripePromise, SubmitOrder
        }}>
            {children}
        </StoreContext.Provider>
    )
};