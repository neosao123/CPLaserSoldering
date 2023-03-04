import { axiosPrivate } from "./axios";

export const customerApi = async (payloadData) => {
  let res = await axiosPrivate.post("/customer/add",payloadData );
  return res.data;
};

export const customerListApi = async (userId,offset) => {
  let res = await axiosPrivate.get("/customer/list?userId="+userId+"&offset="+offset+"" );
  return res.data;
};

export const customerByIdApi = async (userId,customerId) => {
  let res = await axiosPrivate.get("/customer/edit?userId="+userId+"&customerId="+customerId+"" );
  return res.data;
};

export const updateCustomerByIdApi = async (payloadData) => {
  let res = await axiosPrivate.post("/customer/update",payloadData);
  return res.data;
};
export const deleteCustomerByIdApi = async (payloadData) => {
  let res = await axiosPrivate.post("/customer/delete",payloadData);
  return res.data;
};
