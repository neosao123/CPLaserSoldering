import { axiosPrivate } from "./axios";

export const loginApi = async (payloadData) => {
  let res = await axiosPrivate.post("/login",payloadData);
  return res.data;
};