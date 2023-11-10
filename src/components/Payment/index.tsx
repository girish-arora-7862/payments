import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser, resetPaymentResponse } from "../../redux/slice/dataSlice";
import "./index.css";
import PaymentPopUp from "../PaymentPopUp";
import Loader from "../Loader";
import { redirect } from "react-router-dom";
import PaymentResponsePopUp from "../PaymentResponsePopUp";

const Payment = () => {
  const dispatch = useAppDispatch();
  const [showPaymentPopUp, setShowPaymentPopUp] = useState<boolean>(false);
  const [showPaymentResponsePopUp, setShowPaymentResponsePopUp] =
    useState<boolean>(false);
  const { isLoading, paymentResponse } = useAppSelector((state) => state.data);

  useEffect(() => {
    if (paymentResponse) {
      setShowPaymentResponsePopUp(true);
      if (paymentResponse.status === 401) {
        dispatch(resetPaymentResponse());
        dispatch(logoutUser());
        redirect("/login");
      }
    }
  }, [dispatch, paymentResponse]);

  return (
    <div className="payment_wrapper">
      {isLoading && <Loader />}
      {showPaymentPopUp && !paymentResponse && (
        <PaymentPopUp onClose={() => setShowPaymentPopUp(false)} />
      )}
      {showPaymentResponsePopUp && (
        <PaymentResponsePopUp
          onClose={() => {
            setShowPaymentResponsePopUp(false);
          }}
        />
      )}
      <div className="payment_main_wrapper">
        <div className="payment_logout_wrapper">
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
        <div className="payment_btn_wrapper" data-cy="start_payment">
          <button onClick={() => setShowPaymentPopUp(true)}>Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
