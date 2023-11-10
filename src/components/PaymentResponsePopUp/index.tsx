import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetPaymentResponse } from "../../redux/slice/dataSlice";
import PopUp from "../PopUp";
import "./index.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface IProps {
  onClose?: () => void;
}

const PaymentResponsePopUp = ({ onClose = () => {} }: IProps) => {
  const dispatch = useAppDispatch();
  const { paymentResponse } = useAppSelector((state) => state.data);

  const handleClose = () => {
    dispatch(resetPaymentResponse());
    onClose();
  };

  return (
    <PopUp onClose={handleClose}>
      <div
        className={
          paymentResponse?.status === 200 ? "response_green" : "response_red"
        }
      >
        {paymentResponse && paymentResponse.status === 200 ? (
          <CheckCircleOutlineIcon />
        ) : (
          <ErrorOutlineIcon />
        )}
      </div>
      <div data-cy="payment_response">
        {paymentResponse && paymentResponse.status === 200
          ? paymentResponse.message
          : "Some Error Occurred...!!!"}
      </div>
    </PopUp>
  );
};

export default PaymentResponsePopUp;
