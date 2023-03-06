import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CWidgetStatsF,
    CWidgetStatsB,
    CRow,
    CHeaderDivider,
    CBreadcrumb,
    CBreadcrumbItem,
    CContainer,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilInfo } from "@coreui/icons";
import DataTable, { FilterComponent } from "react-data-table-component";
import { outstandingHistory, OutstandingList } from "../Helper/outstanding";
import { useSelector } from "react-redux";
import Select, { components } from "react-select";
import { Routes, Route, useParams } from "react-router-dom";
import { customerListApi } from "../Helper/customer";
import { fetchCustomerListApi } from "../Helper/order";

export default function TotalOutstanding() {
    const [data, setData] = useState();
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [filterdata, setfilterdata] = useState();
    const [customerId, setCustomerId] = useState("");
    const [totalRows, setTotalRows] = useState();
    const [perPage, setPerPage] = useState(10);
    const userData = useSelector((state) => state.userData);
    const [customerList, setCustomerList] = useState();
    const [listLoading, setListLoading] = useState();
    const [selectedCustomer, setSelectedCustomer] = useState("");
    let { customerIdd } = useParams();
    let UserId = userData.userinfo.userId
    const columns = [
        {
            name: "Sr. No.",
            selector: (row, index) => index + 1,
        },
        {
            name: "Amount Paid",
            selector: (row) => row.amountPaid,
        },
        {
            name: "Bill Date",
            selector: (row) => row.billDate,
        },
        {
            name: "Payment Mode",
            selector: (row) => row.paymentMode,
        },
    ];

    const handlePerRowChange = (page) => {
        if (page === undefined) {
            page = 0;
        }
        var ofs = (page - 1) * 10;
        setListLoading(true)
        outstandingHistory(customerIdd, ofs, UserId).then((res) => {
            setListLoading(false)
            if (res.status === 200) {
                console.log(res)
                setData(res.data.billPaidList);
                setSelectedCustomer(res.data);
                setTotalRows(res.data.totalBills)
            } else {
                setListLoading(false)
            }
        }).catch(
            setListLoading(false)
        )
    }
    const handlePageChange = (page) => {
        if (page === undefined) {
            page = 0;
        }
        var ofs = (page - 1) * 10;
        outstandingHistory(customerIdd, ofs, UserId).then((res) => {
            setListLoading(false)
            if (res.status === 200) {
                setData(res.data.billPaidList);
                setSelectedCustomer(res.data);
                setTotalRows(res.data.totalBills)
            } else {
                setListLoading(false)
            }
        }).catch(
            setListLoading(false)
        )
    }
    useEffect(() => {
        handlePerRowChange(0)
    }, [])

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
                        <h5 className="main-title">View</h5>
                    </CCol>
                    <CCol xs={8}>
                        <CBreadcrumb
                            className="m-0 ms-2"
                            style={{ "--cui-breadcrumb-divider": "'>'" }}
                        >
                            <CBreadcrumbItem>
                                <Link to="/dashboard">Home</Link>
                            </CBreadcrumbItem>
                            <CBreadcrumbItem ><Link to="/totaloutstanding">Outstanding</Link></CBreadcrumbItem>
                            <CBreadcrumbItem actives>View Details</CBreadcrumbItem>
                        </CBreadcrumb>
                    </CCol>
                    <CCol xs={4}></CCol>
                </CRow>
            </CContainer>

            <CRow className="justify-content-center">
                <CCol md={12} lg={12}>
                    <CCard style={{ margin: "10px" }} className="mb-4">
                        <CCardHeader>
                            <strong>Outstanding Info</strong>
                        </CCardHeader>

                        <CRow className="justify-content-start m-3">

                            <CCol md={4} sm={12}>
                                <b>Customer Name</b>  :  {selectedCustomer?.customerName}
                            </CCol>
                            <CCol md={4} sm={12}>
                                <b>Customer Phone</b>  :  {selectedCustomer?.customerPhone}
                            </CCol>
                            <CCol md={4} sm={12}>
                                <b>Outstanding</b>  :  {selectedCustomer?.outstanding}
                            </CCol>
                            <CCol md={4} sm={12}>
                                <b>Total Paid</b>  :  {selectedCustomer?.paid}
                            </CCol>
                            <CCol md={4} sm={12}>
                                <b>Balance</b>  :  {selectedCustomer?.balance}
                            </CCol>
                        </CRow>
                        <CCardBody>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow className="justify-content-center">
                <CCol md={12} lg={12}>
                    <CCard style={{ margin: "10px" }} className="mb-4">
                        <CCardHeader>
                            <strong>View</strong>
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                className="tableTopSpace  border border-table"
                                columns={columns}
                                data={data}
                                highlightOnHover
                                pagination
                                paginationServer
                                progressPending={listLoading}
                                paginationRowsPerPageOptions={[]}
                                paginationComponentOptions={paginationComponentOptions}
                                paginationTotalRows={totalRows}
                                onChangePage={handlePageChange}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
}