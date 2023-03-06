import { axiosPrivate } from "./axios";

export const createOrderApi = async (payloadData) => {
  let res = await axiosPrivate.post("/order/save", payloadData);
  return res.data;
};

export const fetchCustomerListApi = async () => {
  let res = await axiosPrivate.get("/order/customers");
  return res.data;
};

export const orderListApi = async (
  userId,
  offset,
  fromDate,
  toDate,
  customerId
) => {
  let res = await axiosPrivate.get(
    "/order/list?userId=" +
    userId +
    "&offset=" +
    offset +
    "&customerId=" +
    customerId +
    "&fromDate=" +
    fromDate +
    "&toDate=" +
    toDate
  );
  return res.data;
};
export const deleteorderByIdApi = async (payloadData) => {
  let res = await axiosPrivate.post("/order/delete", payloadData);
  return res.data;
};
export const orderEditByIdApi = async (orderId) => {
  let res = await axiosPrivate.get("/order/edit?orderId=" + orderId);
  return res.data;
};
export const OrderPhotoUpdate = async (payloadData) => {
  let res = await axiosPrivate.post("/order/upload/photo", payloadData);
  return res.data;
};

export const OrderSendSms = async (payloadData) => {
  let res = await axiosPrivate.post("/order/send-sms", payloadData);
  return res.data;
}
export const OrderUpdate = async (payloadData) => {
  let res = await axiosPrivate.post("/order/update", payloadData);
  return res.data;
}
export const deleteOrderItem = async (orderItemId) => {
  let res = await axiosPrivate.post("/order/delete/item", orderItemId);
  return res.data;
}