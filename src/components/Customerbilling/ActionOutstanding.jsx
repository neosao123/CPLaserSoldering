import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CBreadcrumb, CBreadcrumbItem, CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormInput, CFormLabel, CHeaderDivider, CRow } from '@coreui/react';
import moment from 'moment-js';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { BillAdd, BillDelete, BillView } from '../Helper/outstanding';

const ActionOutstanding = () => {
    const [amount, setAmount] = useState();
    const [payMode, setPayMode] = useState();
    const [billData, setBillData] = useState();
    const [billDate, setBillDate] = useState();
    const [note, setNote] = useState();
    let { state } = useLocation();
    let orderId = state?.orderId;
    let customerId = state?.customerId;
    let orderDate = state?.orderDate;
    console.log(customerId)
    const userData = useSelector((state) => state.userData);
    let userId = userData.userinfo.userId;
    const navigate = useNavigate();
    useEffect(() => {
        fetchBillView()
    }, [])

    const fetchBillView = () => {
        let payLoadData = {
            userId: userId,
            customerId: customerId,
            orderId: orderId,
        }

        BillView(payLoadData).then((res) => {
            console.log(res)
            if (res.status === 200) {
                setBillData(res.data)
            }
        })
    }


    const handleAddBill = (e) => {
        e.preventDefault();
        let validate = true;
        let payLoadData = {
            userId: userId,
            customerId: customerId,
            orderId: orderId,
            amount: amount,
            billDate: billDate,
            paymentMode: payMode ?? "G pay",
        }
        console.log(payLoadData);

        // if (payLoadData.amount === undefined) {
        //     setAmountErr("Please enter amount");
        //     validate = false;
        // }
        // if(payLoadData.billDate === undefined){
        //     setDateErr("Please select date")
        // }

        BillAdd(payLoadData).then((res) => {
            console.log(res)
            if (res.status === 200) {
                swal("Success", res.message, "success").then((ok) => {
                    if (ok) {
                        window.location.reload()
                    }
                })
            } else {
                swal("Warning", res.message, "warning")
            }

        })
    }



    const handleDeleteBill = (billId) => {
        let payLoadData = {
            billId: billId,
            customerId: customerId,
            orderId: orderId,
            userId: userId
        }
        BillDelete(payLoadData).then((res) => {
            if (res.status === 200) {
                swal("Success", res.message, "success").then((ok) => {
                    if (ok) {
                        window.location.reload()
                    }
                })
            }
        })
    }

    const columns = [
        {
            name: "Sr.No",
            selector: (row, i) => i + 1,
        },
        {
            name: "Bill Date",
            wrap: true,
            selector: (row) => row.amountPaid,
        },
        {
            name: "Payment Mode",
            selector: (row) => row.paymentMode,
        },


        {
            name: "Action",
            selector: (row) => {
                return (
                    <div className="button-customerorder">
                        <CButton
                            color="primary"
                            variant="outline"
                            className="buttonsOrderPage px-0"
                            onClick={() => handleDeleteBill(row.billId)}
                        >
                            <CIcon icon={cilTrash} size="lg" />
                        </CButton>
                    </div>)
            },
        },
    ]
    const paginationComponentOptions = {
        rowsPerPageText: "",
        noRowsPerPage: true,
    };
    return (
        <div>
            <CHeaderDivider />
            <CContainer fluid>
                <CRow>
                    <CCol xs={12}>
                        <h5 className="main-title"> Outstanding </h5>
                    </CCol>
                    <CCol xs={8}>
                        <CBreadcrumb
                            className="m-0 ms-2"
                            style={{ "--cui-breadcrumb-divider": "'>'" }}
                        >
                            <CBreadcrumbItem>
                                {" "}
                                <Link to="/dashboard">Home</Link>
                            </CBreadcrumbItem>
                            <CBreadcrumbItem >
                                <Link to="/customerbilling">Customer Order</Link>
                            </CBreadcrumbItem>
                            <CBreadcrumbItem actives>Outstanding</CBreadcrumbItem>
                        </CBreadcrumb>
                    </CCol>
                </CRow>
                <CRow className='mt-3'>
                    <CCard>
                        <CCardHeader >
                            <strong>Customer Info : </strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="justify-content-start">
                                <CCol md={4} sm={12}>
                                    Customer Name :  {billData?.customerName}
                                </CCol>
                                <CCol md={4} sm={12}>
                                    Customer Phone :  {billData?.customerPhone}
                                </CCol>
                                <CCol md={4} sm={12}>
                                    Balance :  {billData?.remainingAmount}
                                </CCol>
                                <CCol md={4} sm={12} >
                                    Total Charges :  {billData?.totalCharges}
                                </CCol>
                                <CCol md={4} sm={12}>
                                    Total Paid :  {billData?.totalPaid}
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CRow>
                <CRow className="mt-3">
                    <CCol md={6} sm={12}>
                        <CCard>
                            <CCardHeader >
                                <strong>Add Bill </strong>
                            </CCardHeader>
                            <form className='form p-4'>
                                {/* <div className="mt-3">
                                    <lable> Customer Name </lable><br />
                                    <input type="text" readOnly value={customerName} className="form-control" />
                                </div> */}
                                <div className="mt-3">
                                    <lable> Unpaid Bill Amount </lable><br />
                                    <input
                                        type="text"
                                        value={billData?.remainingAmount}
                                        readOnly
                                        placeholder="Remaining Amount"
                                        className='form-control'
                                    />
                                    {/* <input type="text" readOnly value={orderDate} className="form-control" /> */}

                                </div>
                                <div className="mt-3">
                                    <lable> Bill Date </lable><br />
                                    <CFormInput
                                        type="date"
                                        value={billDate}
                                        onChange={(e) => setBillDate(e.target.value)}
                                        placeholder="Order Date"
                                    />
                                    {/* <input type="text" readOnly value={orderDate} className="form-control" /> */}

                                </div>
                                <div className="mt-3">
                                    <lable> Amount </lable><br />

                                    <input type="text" onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" value={amount} className="form-control" />

                                </div>
                                <div className="mt-3">
                                    <lable> Payment Mode </lable><br />
                                    <select name="" id="" className='form-select' onChange={(e) => {
                                        setPayMode(e.target.value);
                                        console.log(e.target.value)
                                    }}>net, card, upi, cash
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
                                        <option value="UPI">UPI</option>
                                        <option value="net banking">Net Banking</option>
                                        <option value="cheque">Cheque</option>
                                    </select>


                                </div>
                                <div className="mt-3">
                                    <lable> Note </lable><br />
                                    <textarea name="" id="" cols="30" rows="3" className='form-control' onChange={(e) => setNote(e.target.value)}></textarea>
                                </div>
                                <div className="mt-3">
                                    <button className='btn btn-primary' onClick={handleAddBill}>
                                        Add Bill
                                    </button>
                                </div>
                            </form>
                        </CCard>
                    </CCol>
                    <CCol md={6} sm={12}>
                        <CCard>
                            <CCardHeader >
                                <strong>Bill History </strong>
                            </CCardHeader>
                            <CCard>
                                <CCardBody>
                                    <DataTable
                                        className="tableTopSpace  border border-table"
                                        columns={columns}
                                        responsive={true}
                                        data={billData?.billPaidList}
                                        pagination
                                        paginationComponentOptions={paginationComponentOptions}
                                        paginationServer
                                    />
                                </CCardBody>
                            </CCard>

                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>


        </div >
    )
}

export default ActionOutstanding;