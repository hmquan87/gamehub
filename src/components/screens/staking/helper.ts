import * as yup from "yup";

export const validationSchema = yup.object({
  deposit: yup.string().required("Deposit is required"),
  totalReward: yup.string().required("Reward is required"),
});
