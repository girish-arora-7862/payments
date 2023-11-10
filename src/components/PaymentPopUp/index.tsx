import { useEffect, useState } from "react";
import PopUp from "../PopUp";
import "./index.css";
import { isPositiveNumber, validateEmail } from "../../util";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { makePayment } from "../../redux/slice/dataSlice";

const fromOptions = ["USD", "INR"];
type FromOptionsType = "USD" | "INR";

export interface IFormValues {
  to: string;
  from: FromOptionsType;
  amount: string;
  description: string;
}

interface IFormErrors {
  to: string;
  amount: string;
}

interface IFormTouched {
  to: boolean;
  amount: boolean;
}

const initialFormValues: IFormValues = {
  to: "",
  from: "USD",
  amount: "0",
  description: "",
};

const initialFormErrors: IFormErrors = {
  to: "",
  amount: "",
};

const initialFormTouched: IFormTouched = {
  to: false,
  amount: false,
};

interface IProps {
  onClose?: () => void;
}

const PaymentPopUp = ({ onClose = () => {} }: IProps) => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<IFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<IFormErrors>(initialFormErrors);
  const [formTouched, setFormTouched] =
    useState<IFormTouched>(initialFormTouched);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name !== "amount") {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    } else {
      if (isPositiveNumber(value)) {
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
      } else {
        return;
      }
    }

    handleError(e);
  };

  const handleError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "to") {
      validateTo(value);
    } else if (name === "amount") {
      validateAmount(value);
    }
  };

  const validateTo = (value = formValues.to) => {
    if (!value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        to: "Email is required",
      }));
    } else if (!validateEmail(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        to: "Please enter valid email",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        to: "",
      }));
    }
  };

  const validateAmount = (value = formValues.amount) => {
    if (!value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Amount is required",
      }));
    } else if (+value <= 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Please enter valid amount",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        amount: "",
      }));
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched((prevTouched) => ({
      ...prevTouched,
      [e.target.name]: true,
    }));
  };

  const handleSelect = (e: SelectChangeEvent) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      from: e.target.value as FromOptionsType,
    }));
  };

  const handleSubmit = () => {
    dispatch(makePayment(formValues));
    onClose();
  };

  useEffect(() => {
    validateTo();
    validateAmount();
  }, []);

  return (
    <PopUp onClose={onClose}>
      <div className="heading">Payment</div>
      <div className="w-100">
        <div className="field">
          <div>To</div>
          <div>
            <input
              data-cy="payment_to"
              name="to"
              value={formValues.to}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formTouched.to && <div className="error">{formErrors.to}</div>}
          </div>
        </div>
        <div className="field">
          <div>From</div>
          <div>
            <Select value={formValues.from} onChange={handleSelect}>
              {fromOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="field">
          <div>Amount</div>
          <div>
            <input
              data-cy="payment_amount"
              name="amount"
              value={formValues.amount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {formTouched.amount && (
              <div className="error">{formErrors.amount}</div>
            )}
          </div>
        </div>
        <div className="field">
          <div>Description</div>
          <div>
            <input
              name="description"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <button
            data-cy="payment_submit"
            disabled={!!(formErrors.to || formErrors.amount)}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </PopUp>
  );
};

export default PaymentPopUp;
