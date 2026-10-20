import { Link } from "react-router-dom";

export default function Footer() {

    return (

        <footer className="bg-black py-3 container-fluid text-center">

            {/* FOOTER */}
            <div className="bg-black container-fluid text-center">

                <div className="d-flex flex-wrap container justify-content-center">

                    {/* LINKS */}
                    <div className="col-md-4 mb-4">
                        <ul
                            className="text-start fw-bold"
                            style={{ listStyle: "none" }}
                        >
                            <li>
                                <Link
                                    to="/about"
                                    className="link-light link-opacity-50-hover text-decoration-none"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="link-light link-opacity-50-hover text-decoration-none"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="link-light link-opacity-50-hover text-decoration-none"
                                >
                                    Terms & Conidtions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* HOTLINE */}
                    <div className="col-md-4 mb-4">

                        <h2 className="text-warning">
                            Hot Line
                        </h2>

                        <a
                            href="tel:0123456"
                            className="link-danger mx-2 fs-3 text-decoration-none"
                        >
                            0123456
                        </a>

                    </div>

                    {/* SOCIAL */}
                    <div className="col-md-4 mb-4">

                        <ul
                            className="d-flex justify-content-center ps-0"
                            style={{ listStyle: "none" }}
                        >

                            <li>
                                <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mx-2"
                                >
                                    <i className="bi bi-facebook fs-2 link-primary"></i>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mx-2"
                                >
                                    <i className="bi bi-instagram fs-2 link-danger"></i>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://x.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mx-2"
                                >
                                    <i className="bi bi-twitter-x fs-2 link-light"></i>
                                </a>
                            </li>


                        </ul>

                    </div>

                </div>

                {/* BACK TO TOP */}
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="position-fixed z-3 border-0 bg-transparent"
                    style={{
                        bottom: "20px",
                        right: "10px"
                    }}
                >
                    <i className="bi bi-arrow-up-circle-fill text-warning fs-2"></i>
                </button>
                {/* COPYRIGHT */}
                <div className="text-center text-light fw-semibold mt-3">

                    <p>

                        <a
                            href="https://www.linkedin.com/in/ahmed-elromaissy-455408228"
                            target="_blank"
                            rel="noreferrer"
                            className="link-primary text-decoration-none"
                        >
                            ROMAISSY
                        </a>
                        &copy;
                    </p>

                </div>

            </div>



        </footer>
    );
}