import { useContext } from "react";
import { LoginContext } from "../context/loginContext";
export default function LoginModal() {
    const { showLoginModal, logIn, setLoginDto, goRegister } = useContext(LoginContext);

    return (<div>

        {showLoginModal && (
            <form onSubmit={logIn}>
                <div className="modal-backdrop fade show"></div>
                <div className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    aria-modal="true">

                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h1 className="modal-title fs-5">
                                    Login Required
                                </h1>
                            </div>

                            <div className="modal-body">
                                <p>
                                    Please log in or create an account to continue.
                                </p>
                                <div className="container d-flex flex-column gap-2" >
                                    <div className="input-group">
                                        <span className="input-group-text" id="visible-addon">@</span>
                                        <input type="text" required className="form-control" placeholder="Username" onChange={(e) => { setLoginDto(prevs => ({ ...prevs, email: e.target.value })) }}
                                            aria-label="Email" aria-describedby="visible-addon" />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text" id="visible-addon"><i className="bi bi-key"></i></span>
                                        <input type="password" required className="form-control" placeholder="Password" onChange={(e) => { setLoginDto(prevs => ({ ...prevs, password: e.target.value })) }}
                                            aria-label="Password" aria-describedby="visible-addon" />
                                    </div>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    type="submit"
                                >
                                    Log In
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => goRegister()}
                                >
                                    Register
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        )}
    </div>)
}