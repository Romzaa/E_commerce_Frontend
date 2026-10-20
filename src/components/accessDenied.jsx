export default function AccessDenied() {
    return (
        <div className=""
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f9fa",
                color: "#333",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 20px"
          
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "60px",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    padding: "60px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)"
                }}
            >
                {/* Left Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "25px"
                    }}
                >
                    <div
                        style={{
                            fontSize: "64px",
                            color: "#ff4757"
                        }}
                    >
                        🚫
                    </div>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: "48px",
                            color: "#222",
                            fontWeight: "bold",
                            lineHeight: "1.2"
                        }}
                    >
                        Access{" "}
                        <span style={{ color: "#0033cc" }}>
                            Denied
                        </span>
                    </h1>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "16px",
                            color: "#666",
                            lineHeight: "1.6"
                        }}
                    >
                        We're sorry, but you don't have permission to
                        access this resource. Your current user role or
                        membership status doesn't grant you access to
                        this section.
                    </p>

                    <div
                        style={{
                            backgroundColor: "#f0f0f0",
                            padding: "12px 16px",
                            borderRadius: "6px",
                            fontFamily: "'Courier New', monospace",
                            fontSize: "14px",
                            color: "#333"
                        }}
                    >
                        Error Code: 403 - Forbidden Access
                    </div>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "16px",
                            color: "#666",
                            lineHeight: "1.6"
                        }}
                    >
                        If you believe this is an error or need elevated
                        permissions, please contact the system administrator
                        for assistance.
                    </p>

                    <div style={{ marginTop: "10px" }}>
                        <button
                            type="button"
                            onClick={() => window.location.href = "/"}
                            style={{
                                padding: "12px 28px",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                backgroundColor: "#0033cc",
                                color: "#fff"
                            }}
                        >
                            Return to Home
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            fontSize: "120px",
                            opacity: 0.8
                        }}
                    >
                        🔒
                    </div>
                </div>
            </div>
        </div>
    );
}