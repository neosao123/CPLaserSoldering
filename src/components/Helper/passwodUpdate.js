import { axiosPrivate } from "./axios";
export const passwordUpdateApi = async (payloadData) => {
  let res = await axiosPrivate.post("/password/update", payloadData);
  return res.data;
};
export const resetPassword = async (email) => {
  let res = await axiosPrivate.post("/reset-password", email);
  return res.data;
}
export const updatePasswordWithToken = async (payloadData) => {
  let res = await axiosPrivate.post("/update-password", payloadData);
  return res.data;
}