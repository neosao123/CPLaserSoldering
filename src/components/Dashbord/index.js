import React, { useState, useEffect } from "react";
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
import { dashbordApi } from "../Helper/dashbord";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilInfo, cilPencil, cilTrash, cilChartPie } from "@coreui/icons";
import DataTable from "react-data-table-component";
import "./dashbord.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { customerApi, customerListApi } from "../Helper/customer"
import swal from "sweetalert";
import { dashbordPreviewBillsApi } from "../Helper/dashbord"
import { OrderSendSms } from "../Helper/order";

export default function Dashboard() {
  const [customers, setcustomers] = useState();
  const [validated, setValidated] = useState(false);
  const [orders, setorders] = useState();
  const [todaysOrders, settodaysOrders] = useState();
  const [perPage, setPerPage] = useState(10);
  const [listLoading, setListLoading] = useState(false);
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [tablebill, settablebill] = useState();
  const [customeNamerError, setcustomeNamerError] = useState(false)
  const [customerPhoneError, setcustomerPhoneError] = useState(false)
  const [customerList, setCustomerList] = useState()
  const [totalRows, setTotalRows] = useState();
  const [customerTotalRecords, setCustomerTotalRecord] = useState();
  const [unpaidBill, setUnpaidBill] = useState();
  const userData = useSelector((state) => state.userData);
  let userId = userData.userinfo.userId;
  const handleSMSFlag = async (orderId) => {
    console.log(orderId)
    let payloadData = {
      userId: userId,
      orderId: orderId,
    }
    await OrderSendSms(payloadData).then((res) => {
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
  const columns = [
    {
      name: " No",
      selector: (row) => row.orderId,
    },
    {
      name: " Name",
      allowOverflow: true,
      wrap: true,
      selector: (row) => row.customerName,
    },
    {
      name: "Contact",
      allowOverflow: true,
      selector: (row) => row.customerPhone,
    },
    {
      name: "Bill Date",
      selector: (row) => row.billDate,
    },
    {
      name: "SMS Notifications",
      allowOverflow: true,
      selector: (row) => (<>
        {row.smsSendFlag !== "0" ? (
          <>
            <h6 className="badge p-2" style={{ backgroundColor: "lightgreen", color: "#006400", fontSize: "0.7rem" }}>
              Message Sent </h6>
          </>
        ) : <span className="badge p-2" style={{ backgroundColor: "lightpink", color: "red", fontSize: "0.7rem" }}> Not Sent</span>
        }&nbsp;
      </>)
    },
    {
      name: "Actions",
      allowOverflow: true,
      selector: (row) => (<>
        {
          row.smsSendFlag === "0" ? (<>
            <CButton
              color="primary"
              variant="outline"
              className="px-0 buttonsOrderPage "
              onClick={(e) => handleSMSFlag(row.orderId)}
            >
              <i class="fa fa-comment" aria-hidden="true"></i>
            </CButton>
          </>) : (<></>)
        }&nbsp;&nbsp;

        <CButton color="primary" variant="outline" className="px-0 buttonsOrderPage ">
          <CIcon icon={cilInfo} size="lg" />
        </CButton>
      </>),
    },
  ];



  useEffect(() => {
    // getcustomer()
    Dashboardcard();
    dashbordPreview()
  }, []);



  const Dashboardcard = () => {
    dashbordApi(userData.userinfo.userId)
      .then(
        async (res) => {
          // console.log(" success");
          console.log("res", res);
          setcustomers(res.data.customers);
          setorders(res.data.orders);
          settodaysOrders(res.data.todaysOrders);
          setUnpaidBill(res.data.customerWithoutBill)
        },
        (err) => {
          // console.log("error");
        }
      )
      .catch();
  };
  const handlePageChange = (page) => {
    // console.log("page",page)
    let currentPage = page;
    var offset = (currentPage - 1) * perPage;
    // console.log("offset",offset)
    // getcustomer(offset);
  };
  let regx = /^[A-Za-z\s]*$/;
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    } else {
      event.stopPropagation();
      event.preventDefault();
      if (regx.test(name) && contact.length === 10) {
        let payloadData = {
          userId: userData.userinfo.userId,
          customerName: name,
          customerPhone: contact,
        };
        customerApi(payloadData).then((res) => {
          // console.log(res.status)
          if (res.status === 200) {
            swal("Success", res.message, "success").then((Ok) => {
              if (Ok) {
                window.location.reload()
              }
            })
          } else {
            swal("Error", res.message, "warning")
          }
        }, (err) => {
          // console.log(err)
        })
      } else {
        if (regx.test(name) === false) {
          setcustomeNamerError(true)
        }
        if (contact.length != 10) {
          setcustomerPhoneError(true)
        }
      }
    }
    setValidated(true);
  };
  const validationForm = (inputName, value) => {
    if (inputName == "name" && value && regx.test(value) === false) {
      setcustomeNamerError(true)
    } else {
      setcustomeNamerError(false)
    }
    if (inputName == "contact" && value && value.length != 10) {
      setcustomerPhoneError(true)
    } else {
      setcustomerPhoneError(false)
    }
  }

  const paginationComponentOptions = {
    rowsPerPageText: "",
    noRowsPerPage: true,
  };

  // Dashbord Table Api 


  const dashbordPreview = () => {
    setListLoading(true)
    dashbordPreviewBillsApi(userId, "", "", "", "")
      .then(
        async (res) => {
          // console.log(" success");
          console.log("res table", res);
          settablebill(res.data)
          setTotalRows(res.totalRecords);
          setListLoading(false)
        },
        (err) => {
          // console.log("error");
          setListLoading(false)
        }
      )
      .catch();
  };


  return (
    <div>
      <CHeaderDivider />
      <br />
      <div>
        {/* 
     <CCard style={{margin:"10px"}} className="mb-4">
        <CCardBody> */}

        <CContainer fluid>
          <CRow className="mb-3">
            <CCol xs={12}>
              <h5 className="main-title">Dashboard </h5>
            </CCol>
            {/* <CCol xs={8}>
              <CBreadcrumb
                className="m-0 ms-2"
                style={{ "--cui-breadcrumb-divider": "'>'" }}
              >
                <CBreadcrumbItem>

                  <Link to="/dashboard">Home</Link>
                </CBreadcrumbItem>
                <CBreadcrumbItem actives>Dashboard</CBreadcrumbItem>
              </CBreadcrumb>
            </CCol> */}
          </CRow>



          {/* <CCol xs={12} sm={6} lg={3}>
              <CWidgetStatsB
                className="mb-4 dashbord-card-line"
                // text="Lorem ipsum dolor sit amet enim."
                value="Todays Orders"
                title={todaysOrders}
              />
            </CCol> */}

          <CRow>
            <CCol xs={12} sm={6} lg={3} >
              <CCard className="mt-3">
                <div class="p-3">
                  <strong class="">Customers</strong>
                  <div className="d-flex justify-content-between">
                    <p className="mt-1">
                      <h5>{customers}</h5>
                    </p>
                    <Link to="/customer">
                      <CButton color="primary" variant="outline" className="px-0 buttonsOrderPage ">
                        <CIcon icon={cilInfo} size="lg" />
                      </CButton>
                    </Link>
                  </div>
                </div>
              </CCard>
            </CCol>
            <br />
            <CCol xs={12} sm={6} lg={3}>
              <CCard className="mt-3">
                <div className="p-3 ">
                  <strong className="">Orders</strong>
                  <div className="d-flex justify-content-between">
                    <p className="mt-1">
                      <h5>{orders}</h5>
                    </p>
                    <Link to="/customerbilling">
                      <CButton color="primary" variant="outline" className="px-0 buttonsOrderPage ">
                        <CIcon icon={cilInfo} size="lg" />
                      </CButton>
                    </Link>
                  </div>
                </div>
              </CCard>
            </CCol>
            <br />
            <CCol xs={12} sm={6} lg={3}>
              <CCard className="mt-3">
                <div className="p-3 ">
                  <strong className="">Today's Orders</strong>
                  <div className="d-flex justify-content-between">
                    <p className="mt-1">
                      <h5>{todaysOrders}</h5>
                    </p>
                    <Link to="/customerbilling">
                      <CButton color="primary" variant="outline" className="px-0 buttonsOrderPage ">
                        <CIcon icon={cilInfo} size="lg" />
                      </CButton>
                    </Link>
                  </div>
                </div>
              </CCard>
            </CCol>
            <br />
            <CCol xs={12} sm={6} lg={3}>
              <CCard className="mt-3">
                <div className="p-3 ">
                  <strong className="">Unpaid Bills</strong>
                  <div className="d-flex justify-content-between">
                    <p className="mt-1">
                      <h5>{unpaidBill}</h5>
                    </p>
                    <Link to="/totaloutstanding">
                      <CButton color="primary" variant="outline" className="px-0 buttonsOrderPage ">
                        <CIcon icon={cilInfo} size="lg" />
                      </CButton>
                    </Link>
                  </div>
                </div>
              </CCard>
            </CCol>
            <br />

            <CCol md={12} sm={12} lg={7}>
              <CCard className="mt-3">
                <CCardHeader>
                  <strong>Preview Bills </strong>
                </CCardHeader>
                <CCardBody>
                  <DataTable
                    className="tableTopSpace  border border-table"
                    columns={columns}
                    progressPending={listLoading}
                    responsive={true}
                    data={tablebill}
                    // items={items}
                    onChangePage={handlePageChange}
                    // pagination
                    // paginationTotalRows={totalRows}
                    paginationComponentOptions={paginationComponentOptions}
                  // paginationServer
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={12} sm={12} lg={5}>
              <CCard className="p-4 mt-3">
                <CCardBody>
                  <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    method="post"
                    encType="multipart/form-data"
                  >
                    <h4>Add Customer</h4>

                    <CFormLabel className='mb-0 text-start'>Name :</CFormLabel>
                    <CFormInput
                      placeholder="Name"
                      className='mt-0 text-start'
                      name="name"
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                        validationForm(e.target.name, e.target.value)
                      }}
                      value={name}
                      required
                    />
                    <CFormFeedback invalid>Please Enter Name.</CFormFeedback>
                    {customeNamerError === true ? (
                      <>
                        <CFormFeedback className="errorMessage-customer" >
                          Please Enter Name.
                        </CFormFeedback>
                      </>
                    ) : null}
                    <br />

                    <CFormLabel className='mb-0 text-start'> Contact :</CFormLabel>
                    <CFormInput
                      type="number"
                      className='mt-0 text-start'
                      name="number"
                      placeholder="Number"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        validationForm(e.target.name, e.target.value)
                      }}
                      required
                    />
                    <CFormFeedback invalid>Please Enter 10 digit Number.</CFormFeedback>
                    {customerPhoneError === true ? (
                      <>
                        <CFormFeedback className="errorMessage-customer" >
                          Please Enter 10 digit Number.
                        </CFormFeedback>
                      </>
                    ) : null}

                    <CRow>
                      <CCol xs={6}>
                        <br />
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                        //  disabled={loading}
                        >
                          {/* {loading ? "Wait..":"Update"} */}
                          {/* Update */}
                          Submit
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <br />
            </CCol>
          </CRow>
        </CContainer>

        {/*
</CCardBody>
</CCard>
*/}
      </div>
    </div>
  );
}
