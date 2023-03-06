import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";
import "./customerbilling.css";
import DataTable, { FilterComponent } from "react-data-table-component";
import CIcon from "@coreui/icons-react";
import { cilInfo, cilPencil, cilTrash } from "@coreui/icons";
import {
  fetchCustomerListApi,
  orderListApi,
  OrderPhotoUpdate,
  OrderSendSms,
} from "../Helper/order";
import { deleteorderByIdApi } from "../Helper/order";
import swal from "sweetalert";
import Select from "react-select";

export default function Customerbilling() {
  const [data, setData] = useState();
  const [filterStartDate, setfilterStartDate] = useState("");
  const [filterEndDate, setfilterEndDate] = useState("");
  const [orderList, setorderList] = useState([]);
  const [filterdata, setfilterdata] = useState(orderList);
  const [perPage, setPerPage] = useState(10);
  const [editOrderId, seteditOrderId] = useState(0);
  const [orderTotalRecord, setorderTotalRecord] = useState();
  const [filterOnCustomer, setfilterOnCustomer] = useState("");
  const [filterOnbillNo, setfilterOnbillNo] = useState();
  const [listLoading, setListLoading] = useState(false);
  const [customerList, setCustomerList] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [visible, setVisible] = useState(false);
  const [imageError, setImageError] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [smsSendFlag, setsmsSendFlag] = useState();
  const [orderPhoto, setOrderPhoto] = useState("");
  const [orderIdForPhoto, setOrderIdForPhoto] = useState();
  const userData = useSelector((state) => state.userData);
  let navigate = useNavigate()
  let userId = userData.userinfo.userId;
  useEffect(() => {
    if (orderList.length == 0) {
      getorderlist(0);
      getCutomerlist();
    }
  }, []);

  const getCutomerlist = () => {
    fetchCustomerListApi().then((res) => {
      var result = res?.data;
      var customerLive = [];
      result.forEach((element) => {
        customerLive.push({
          value: element.customerId,
          label: element.customerName,
        });
      });
      setCustomerList(customerLive);
    });
  };

  const handleCustomer = (e) => {
    setSelectedCustomer(e.value);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "",
    noRowsPerPage: true,
  };

  const getorderlist = async (page) => {
    // if(userData.userinfo.userId){
    // console.log("sart",filterStartDate)
    // console.log("end",filterEndDate)
    // console.log("Customer",filterOnCustomer)
    let startformattedDate = "";
    let endformattedDate = "";
    if (filterStartDate != "" && filterEndDate != "") {
      let datestart = new Date(filterStartDate);
      startformattedDate = datestart.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      let dateend = new Date(filterEndDate);
      endformattedDate = dateend.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    setListLoading(true);
    let customerId = selectedCustomer ?? "";

    await orderListApi(
      userData.userinfo.userId,
      page ? page : 0,
      startformattedDate,
      endformattedDate,
      customerId
    )
      .then(
        async (res) => {
          setorderList(res.data);
          setsmsSendFlag(res.data.smsSendFlag)
          setData(res.data);
          setListLoading(false);
          setorderTotalRecord(res.totalRecords);

        },
        (err) => {
          setListLoading(false)
        }
      )
      .catch(
        setListLoading(false)
      );
  };

  const handlePageChange = (page) => {
    let currentPage = page;
    var offset = (currentPage - 1) * perPage;
    getorderlist(offset);
  };

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    if (image.type === "image/png" || image.type === "image/jpeg") {
      // console.log("ok")
      setPreview(objectUrl);
    } else {
      // console.log("notok");
      setPreview(null);
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleFileChangeImage = (e) => {
    console.log(e.target.files[0])
    if (e.target.files) {
      if (
        e.target.files[0].type == "image/png" ||
        e.target.files[0].type == "image/jpeg"
      ) {
        setImageError("");
      } else {
        setImageError("Please select Image Type of png or jpg");
      }
      setImage(e.target.files[0]);
    }
  };

  const deleteorder = async (orderId) => {
    let payloadData = {
      // userId: userData.userinfo.userId,
      orderId: orderId,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure to delete Order?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Ok"],
    }).then((willDelete) => {
      if (willDelete) {
        deleteorderByIdApi(payloadData).then((res) => {
          if (res.status === 200) {
            swal("Success", res.message, "success").then((ok) => {
              if (ok) {
                window.location.reload();
              }
            });
          }
        });
      }
    });
  };

  const handleModal = (oid) => {
    setVisible(true);
    setOrderIdForPhoto(oid);
  };

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

  const uploadPhoto = (e) => {
    let formData = new FormData()
    formData.append("orderId", orderIdForPhoto);
    formData.append("orderPhoto", image);
    OrderPhotoUpdate(formData).then((res) => {
      if (res.status === 200) {
        swal("Success", res.message, "success").then((ok) => {
          if (ok) {
            window.location.reload();
          }
        })
      } else {
        swal("Warning", res.message, "warning")
      }
    });
  };

  const handleCustomerOutstanding = (orderId, orderDate, customerId) => {
    console.log(orderId, orderDate, customerId)

  }


  const columns = [
    {
      name: "Order No",
      selector: (row) => row.orderId,
    },
    {
      name: "Customer Name",
      wrap: true,
      selector: (row) => row.customerName,
    },
    {
      name: "Customer Phone",
      selector: (row) => row.customerPhone,
    },
    {
      name: "Notes",
      wrap: true,
      selector: (row) => row.note,
    },

    {
      name: "Order Date",
      wrap: true,
      selector: (row) => row.orderDate,
    },
    {
      name: "Total Charges",
      selector: (row) => row.totalCharges,
    },
    {
      name: "Outstanding",
      selector: (row) => {
        return (
          <div className="button-customerorder">
            <CButton
              color="primary"
              variant="outline"
              className="buttonsOrderPage px-0"
              onClick={() => navigate('/customerbilling/actionoutstanding', { state: { orderId: row.orderId, orderDate: row.orderDate, customerId: row.customerId, customerName: row.customerName } })}
            // onClick={() => handleCustomerOutstanding(row.orderId, row.orderDate, row.customerId)}
            >
              <i class="fa fa-history" aria-hidden="true"></i>
            </CButton>
          </div>)
      },
    },
    {
      name: "SMS Notifications",
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
      selector: (row) => (
        <>
          <div className="button-customerorder">
            &nbsp;{row.orderPhoto === "No Image" ? (
              <>
                <CButton
                  color="primary"
                  variant="outline"
                  className="px-0 buttonsOrderPage "
                  onClick={(e) => handleModal(row.orderId)}
                >
                  <i class="fa fa-upload" aria-hidden="true"></i>
                </CButton>
              </>
            ) : <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>}&nbsp;
            &nbsp;

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
            }


            &nbsp;&nbsp;
            <Link to={"/view/" + row.orderId}>
              <CButton
                color="primary"
                variant="outline"
                className="px-0 buttonsOrderPage "
              >
                <CIcon icon={cilInfo} size="lg" />
              </CButton>
            </Link>
            &nbsp;&nbsp;
            <Link to={"/order/" + row.orderId}>
              <CButton
                color="primary"
                variant="outline"
                className="px-0 buttonsOrderPage "
              >
                <CIcon icon={cilPencil} size="lg" />
              </CButton>
            </Link>
            &nbsp;&nbsp;
            <CButton
              color="primary"
              // onClick={()=>getorderDataForEdit(row.customerId)}
              variant="outline"
              onClick={() => deleteorder(row.orderId)}
              className="px-0 buttonsOrderPage "
            >
              <CIcon icon={cilTrash} size="lg" />
            </CButton>
            &nbsp;&nbsp;
          </div>
        </>
      ),
    },
  ];

  const handleClear = (e) => {
    window.location.reload();
  };

  return (
    <div>
      <CHeaderDivider />
      <CContainer fluid>
        <CRow>
          <CCol xs={12}>
            <h5 className="main-title"> Order </h5>
          </CCol>
          <CCol xs={8}>
            <CBreadcrumb
              className="m-0 ms-2"
              style={{ "--cui-breadcrumb-divider": "'>'" }}
            >
              <CBreadcrumbItem>
                <Link to="/dashboard">Home</Link>
              </CBreadcrumbItem>
              <CBreadcrumbItem actives>Customer Order</CBreadcrumbItem>
            </CBreadcrumb>
          </CCol>
          <CCol xs={4}>
            <div class="text-end">
              {/* <Link to="/customer"><CButton color="warning"  size="sm" className="px-4 text-end text-white" type="button" style={{marginTop: "-52px"}}>
         Back
      </CButton></Link> */}
              <Link to="/order">
                <CButton
                  color="info"
                  size="sm"
                  className="px-4 text-end text-white"
                  type="button"
                  style={{ marginTop: "-52px" }}
                >
                  New Order
                </CButton>
              </Link>
            </div>
          </CCol>
        </CRow>
      </CContainer>
      <br />

      <CRow className="justify-content-center">
        <CCol md={12} lg={12}>
          <CCard>
            <CCardHeader>
              <strong>Filter:</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="justify-content-start">
                {/* <CCol md={12} sm={12} className="text-end">
                 <Link to="/order"> <CButton color="info"  className='m-2 text-white' type="button">
                  New Order
                 </CButton></Link>
              </CCol> */}
                <CCol md={12}>
                  {/* <CFormLabel ><b>Filter:</b></CFormLabel> */}
                </CCol>

                <CCol md={5} sm={12}>
                  <CFormLabel>Order Start/End Date</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="date"
                      onChange={(e) => {
                        setfilterStartDate(e.target.value);
                      }}
                      placeholder="Start Date"
                    />
                    <CButton color="primary" type="button">
                      To
                    </CButton>
                    <CFormInput
                      onChange={(e) => {
                        setfilterEndDate(e.target.value);
                      }}
                      type="date"
                      placeholder="End Date"
                    />
                  </CInputGroup>
                </CCol>

                <CCol md={3}>
                  <CFormLabel>Customer Name</CFormLabel>
                  <Select
                    options={customerList}
                    placeholder={
                      <div className="select-placeholder-text">
                        Select Customer
                      </div>
                    }
                    className="text-start mb-3"
                    value={customerList?.find(
                      (obj) => obj.value === selectedCustomer
                    )}
                    onChange={handleCustomer}
                  />
                </CCol>
                {/* <CCol md={3}>
                  <CFormLabel>Order No</CFormLabel>
                  <CFormInput
                    onChange={(e) => {
                      setfilterOnbillNo(e.target.value);
                    }}
                    placeholder="Order No"
                    type="text"
                  />
                </CCol> */}

                <CCol xs={12}>
                  <div className="text-center ">
                    <CButton
                      color="success"
                      className="m-2 text-white"
                      onClick={() => {
                        getorderlist(0);
                      }}
                      type="button"
                    >
                      Search
                    </CButton>
                    <CButton
                      color="dark"
                      type="submit"
                      className="text-white"
                      onClick={() => {
                        handleClear();
                      }}
                    >
                      Clear
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CModal
            alignment="center"
            scrollable
            visible={visible}
            onClose={() => { setVisible(false); setOrderIdForPhoto(""); setImage(""); setImageError("") }}
          >
            <CModalHeader>
              <CModalTitle>Order Add Image</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CContainer>
                <CRow className="mt-3">
                  <CCol md={7} sm={12} xs={12}>
                    <CFormLabel htmlFor="validationCustom02">Image</CFormLabel>
                    <CFormInput
                      name="image"
                      type="file"
                      id="validationTextarea"
                      aria-label="file example"

                      onChange={handleFileChangeImage}
                    />
                  </CCol>
                  <CCol xs={12} className="mt-3">
                    {
                      preview ? (<>
                        <img src={preview} className="imagePreview" />
                      </>) : (<></>)
                    }
                  </CCol>
                  <span className="text-danger">{imageError}</span>
                  <button
                    className="btn btn-success mt-3"
                    onClick={(e) => {
                      uploadPhoto();
                    }}
                  >
                    Upload Photo
                  </button>
                </CRow>
              </CContainer>
            </CModalBody>
          </CModal>
          <br />
          <CCard>
            <CCardBody>
              <DataTable
                className="tableTopSpace  border border-table"
                columns={columns}
                responsive={true}
                data={orderList}
                progressPending={listLoading}
                paginationTotalRows={orderTotalRecord}
                onChangePage={handlePageChange}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                paginationServer
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}
