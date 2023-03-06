import { axiosPrivate } from "./axios";

export const profilePhotoApi = async (payloadData) => {
  let res = await axiosPrivate.post("/profile/update", payloadData);
  return res.data;
};