import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { StoreContext } from '../context/storecontext';
import { Link, useLocation } from 'react-router-dom';
import { LoginContext } from '../context/loginContext';
export default function MyNav() {
    const { dark, setDark, setPageIndexQ, cartCount } = useContext(StoreContext);
    const { setShowLoginModal, logOut, isLoggedIn, isAdmin } = useContext(LoginContext);

    const cartId = localStorage.getItem("CartId")
    const showLogin = () => setShowLoginModal(true);
    const location = useLocation();
    return (

        <div className='mb-4'>
            {/*Home Logo*/}
            <div style={{}} className='d-flex justify-content-center py-0 my-0'>
                <Link className='position-fixed z-2' to="/" onClick={() => {
                    setPageIndexQ(1); window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => {
                        window.location.reload();
                    }, 200);
                }}>
                    <img src='/123-removebg.png' alt='logo' className='navlogo' />
                </Link>
            </div>

            {/*LogIn/LogOut & Dashboard*/}
            <div className="adminNav position-fixed d-flex flex-column gap-2" style={{ right: "0px", top: "5px" }}>
                {(<button className={` ${isLoggedIn ? "btn-danger" : "btn-success"} badge btn  shadow border-0 ps-4  `}
                    style={{ borderRadius: "20px 0px 0px 20px" }} onClick={isLoggedIn ? logOut : showLogin}>{isLoggedIn ? " Log Out" : "Log In"}</button>)}

                {isAdmin && <Link to={"/adminDashboard"}
                    onClick={() =>
                        setTimeout(() => { if (location.pathname === "/adminDashboard") window.location.reload(); }, 1000)}
                    className={`btn btn-warning link-dark badge shadow border-0 py-2 ps-4 `}
                    style={{ borderRadius: "20px 0px 0px 20px" }}>Dashboard</Link>}
            </div>

            {/*Store Navigation Bar*/}
            <Navbar style={{ marginTop: "180px", right: "0" }} expand="lg" className={`myNav shadow rounded-5 position-fixed p-0 ${dark ? "bgNav" : " bg-white"}`}>
                <Container className='p-0'>
                    <div className='container px-1 d-flex flex-column align-items-center justify-content-center'>
                        <Nav className="p-0 d-flex flex-column">
                            <Link className={`nav-link py-0 fs-2  rounded-5 link-primary ${dark ? "btn btn-outline-light " : "btn btn-outline-secondary "}`} to="/" onClick={() => { setPageIndexQ(1); window.scrollTo({ top: 0, behavior: "smooth" }) }} ><i className="bi bi-house"></i></Link>

                            <Link className={`nav-link py-0 fs-2  rounded-5 position-relative link-success ${dark ? "btn btn-outline-light " : "btn btn-outline-secondary"}`} to={`/carts/${cartId}`}>
                                <i className={` bi ${cartCount === 0 ? "bi-cart-plus" : "bi-cart-check"}`}></i>
                                <span className="position-absolute cartSpan translate-middle badge p-1 bg-danger "
                                >{cartCount}</span></Link>

                            <Link className={`nav-link py-0 fs-2  rounded-5 ${dark ? "btn btn-outline-light link-success" : "btn btn-outline-secondary link-black"}`} to="/wishlist"><i className="text-danger bi bi-bookmark-heart"></i></Link>

                        </Nav>


                        <button className={`fs-5 p-0 border-0 rounded-5 my-2 ${dark ? 'btn btn-outline-light'
                            : 'btn btn-outline-dark'}`} onClick={() => setDark(dark ? false : true)}>{dark ? "🌞" : "🌚"}</button>
                    </div>
                </Container>

            </Navbar>

        </div>



    )
}