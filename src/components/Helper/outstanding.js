import { axiosPrivate } from "./axios";
export const OutstandingList = async (userId, offset, customerId, paid) => {
    let res = await axiosPrivate.get("/customer/bill/list?userId=" + userId + "&offset=" + offset + "&customerId=" + customerId + "&type=" + paid);
    return res.data;
};

export const BillAdd = async (payloadData) => {
    let res = await axiosPrivate.post("/customer/bill/add", payloadData);
    return res.data;
}
export const BillHistory = async (userId, offset, cusomerId, fromDate, toDate) => {
    let res = await axiosPrivate.get(`/billHistory/list?userId=${userId}&offset=${offset}&customerId=${cusomerId}&fromDate=${fromDate}&toDate=${toDate}`);
    return res.data;
}
export const BillDelete = async (payloadData) => {
    let res = await axiosPrivate.post("/customer/bill/delete", payloadData);
    return res.data;
}
export const BillView = async (payloadData) => {
    let res = await axiosPrivate.post("/customer/bill/view", payloadData);
    return res.data;
}
export const outstandingHistory = async (customerId, offset, userId) => {
    let res = await axiosPrivate.get(`https://neotesting.online/cplasersoldering/testing/api/customer/outstanding/history?customerId=${customerId}&offset=${offset}&userId=${userId}`);
    return res.data;
}