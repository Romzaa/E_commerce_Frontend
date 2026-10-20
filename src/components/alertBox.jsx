import { useContext, useEffect } from "react"
import { AdminContext } from "../context/adminContext"
import '../App.css';

export default function AlertBox() {
    const { requestState, setRequestState, showAlert, setShowAlert } = useContext(AdminContext);

    useEffect(() => {
        if (!requestState.message) return;
        setShowAlert(true);
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, [requestState.message, setShowAlert])

    useEffect(() => {
        if (showAlert) return;

        const timer = setTimeout(() => {
            setRequestState({
                message: null,
                type: null
            });
        }, 1000); // same as CSS transition

        return () => clearTimeout(timer);
    }, [showAlert, setRequestState]);

    return (
        <>
            {<div className={`position-relative container justify-content-center`}>
                <div className={`alert position-fixed alert-${requestState.type} text-center container alertBox 
            ${showAlert ? 'alertBoxShow' : 'alertBoxHide'}`}
                    style={{ height: "50px" }}>
                    <h6>{requestState.message}</h6>
                </div>
            </div>}
        </>
    )
}