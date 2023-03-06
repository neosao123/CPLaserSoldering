import { axiosPrivate } from "./axios";

export const dashbordApi = async (userId) => {
  let res = await axiosPrivate.get("/dashboard?userId="+userId); 
  return res.data;
};

export const dashbordPreviewBillsApi = async (userId,offset,customerId,fromDate,toDate) => {
  let res = await axiosPrivate.get("dashboard/bill/list?userId="+userId+"&offset="+offset+"&customerId="+customerId+"&fromDate="+fromDate+"&toDate="+toDate); 
  return res.data;
};


