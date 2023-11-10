import { IFormValues } from "../components/PaymentPopUp";

export interface IPaymentApiResponse {
  status: number;
  message: string;
}

export function paymentApi(values: IFormValues) {
  return new Promise<IPaymentApiResponse>((resolve, reject) =>
    setTimeout(() => {
      if (values.to === "hacker@gmail.com") {
        reject({ status: 401, message: "Unauthorized" });
      } else if (+values.amount < 10) {
        reject({ status: 400, message: "Bad Request" });
      } else if (+values.amount > 99999 && values.from === "USD") {
        reject({ status: 500, message: "Internal Server Error" });
      } else {
        resolve({ status: 200, message: "Payment Success" });
      }
    }, 2000)
  );
}
