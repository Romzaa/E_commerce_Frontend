import { useContext } from "react"
import { RegisterContext } from "../context/registerContext"
import { AdminContext } from "../context/adminContext";


export default function Register() {
    const { registerDto, setRegisterDto, registerUser } = useContext(RegisterContext);
    const { setRequestState } = useContext(AdminContext);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setRegisterDto(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registerDto.password !== registerDto.confirmPassword) {
            setRequestState({
                message: "Password Doesn't Match With Confirmation Password",
                type: "danger"
            });
            return;
        }

        const { confirmPassword, ...registerDataToSend } = registerDto;

        await registerUser(registerDataToSend);
    };

    return (
        <>
            <div
                className="container-fluid d-flex align-items-center"
                style={{ minHeight: "74vh" }}
            >
                <div className="container py-4 px-5 rounded-5 shadow">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            {/* Email */}
                            <div className="col-md-6">
                                <label className="form-label">Email</label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-envelope"></i>
                                    </span>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        name="email"
                                        value={registerDto.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div className="col-md-6">
                                <label className="form-label">Username</label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-person"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        name="userName"
                                        value={registerDto.userName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Display Name */}
                            <div className="col-md-6">
                                <label className="form-label">Display Name</label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-person-badge"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Display Name"
                                        name="displayName"
                                        value={registerDto.displayName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-telephone"></i>
                                    </span>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Phone Number (optional)"
                                        name="phoneNumber"
                                        value={registerDto.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="col-md-6">
                                <label className="form-label">Password</label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock"></i>
                                    </span>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        value={registerDto.password}
                                        onChange={handleChange}
                                        minLength={8}
                                        required
                                    />
                                </div>

                                <small className="text-muted">
                                    Minimum 8 characters
                                </small>
                            </div>

                            {/* Confirm Password */}
                            <div className="col-md-6">
                                <label className="form-label">Confirm Password</label>

                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Retype Password"
                                        name="confirmPassword"
                                        value={registerDto.confirmPassword}
                                        onChange={handleChange}
                                        minLength={8}
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="mt-3 btn btn-primary shadow px-5 py-1"
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );

}