import React, { useState, useEffect } from 'react'
import './TotalOutstanding/TotalOutstanding.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CCardHeader,
  CInputGroup,
  CInputGroupText,
  CRow,
  CContainer,
  CCardGroup,
  CFormLabel,
  CHeaderDivider, CBreadcrumb, CBreadcrumbItem
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilInfo, cilPencil, cilTrash } from '@coreui/icons'
import DataTable from 'react-data-table-component';
import AppBreadcrumb from './AppBreadcrumb'
import { customerApi, customerByIdApi, customerListApi, updateCustomerByIdApi, deleteCustomerByIdApi } from "./Helper/customer"
import swal from "sweetalert";



export default function FormComponent() {
  const [validated, setValidated] = useState(false)
  const [Contact, setcontact] = useState()
  const [editCustomerId, setEditCustomerId] = useState(0)
  const [name, setname] = useState()
  const [loading, setLoading] = useState(false);
  const [customeNamerError, setcustomeNamerError] = useState(false)
  const [customerPhoneError, setcustomerPhoneError] = useState(false)
  const [custmerList, setCustomerList] = useState([])
  const [listLoading, setListLoading] = useState(false);
  const [custmerTotalRecord, setCustomerTotalRecord] = useState()
  const [perPage, setPerPage] = useState(10);
  const userData = useSelector((state) => state.userData);
  const columns = [
    {
      name: ' No',
      selector: row => row.customerId,
    },
    {
      name: 'Customer Name',
      // allowOverflow:true,
      wrap: true,
      selector: row => row.customerName,
    },
    {
      name: 'Contact Number',
      selector: row => row.customerPhone,
    },
    {
      name: 'View',
      allowOverflow: true,
      selector: row => (<>
        <div className='button-customerorder'>
          {/* <CButton color="primary" variant="outline" className="px-0 buttonsOrderPage "> 
          <CIcon icon={cilInfo} size="lg"  />
        </CButton>&nbsp;&nbsp; */}
          <CButton color="primary" variant="outline" onClick={() => getCustomerDataForEdit(row.customerId)} className="px-0 buttonsOrderPage ">
            <CIcon icon={cilPencil} size="lg" />
          </CButton>&nbsp;&nbsp;
          <CButton color="primary" variant="outline" onClick={() => deleteCustomer(row.customerId)} className="px-0 buttonsOrderPage ">
            <CIcon icon={cilTrash} size="lg" />
          </CButton>&nbsp;&nbsp;
        </div>
      </>),
    },
  ]
  useEffect(() => {
    if (custmerList.length == 0) {
      getcustomer(0);
    }
  }, []);
  const getcustomer = async (page) => {
    if (userData.userinfo.userId) {
      setListLoading(true)
      await customerListApi(userData.userinfo.userId, page ? page : 0)
        .then(
          async (res) => {
            setCustomerList(res.data);
            setListLoading(false)
            setCustomerTotalRecord(res.totalRecords);
          },
          (err) => {
            setListLoading(false)
          }
        )
        .catch();
    }
  }

  const handlePageChange = page => {
    let currentPage = page;
    var offset = (currentPage - 1) * perPage;
    getcustomer(offset);
  };


  const set1 = () => {
    setname("");
    setcontact("");
    setEditCustomerId(0);
  }
  let regx = /^[A-Za-z\s]*$/;
  const handleSubmit = (event) => {
    event.preventDefault()

    const formm = event.currentTarget;
    if (formm.checkValidity() === false) {
      event.preventDefault();
    } else {
      event.preventDefault();
      event.stopPropagation()
      if (regx.test(name) && Contact.length == 10) {

        if (editCustomerId && editCustomerId > 0) {
          // console.log("code for update")
          let payloadData = {
            userId: userData.userinfo.userId,
            customerName: name,
            customerId: editCustomerId,
            customerPhone: Contact,
          };
          setLoading(true);
          updateCustomerByIdApi(payloadData)
            .then(
              async (res) => {
                // console.log(" success");
                // console.log("res", res);
                if (res.status == 500) {
                  swal("Customer", res.message, "error")
                } else {
                  setValidated(false)
                  set1();
                  // swal("Customer",  res.message, "success")
                  getcustomer(0);
                }
                setLoading(false);
              },
              (err) => {
                // console.log("error");
                setLoading(false);
                swal("Customer", "invalid Customer", "success")
              }
            )
            .catch();
        } else {
          // console.log("code for create")
          let payloadData = {
            userId: userData.userinfo.userId,
            customerName: name,
            customerPhone: Contact,
          };
          setLoading(true);
          customerApi(payloadData)
            .then(
              async (res) => {
                // console.log(" success");
                // console.log("res", res);
                if (res.status == 500) {
                  swal("Customer", res.message, "error")
                } else {
                  setValidated(false)
                  set1();
                  swal("Customer", res.message, "success")
                  getcustomer(0);
                }
                setLoading(false);
              },
              (err) => {
                // console.log("error");
                setLoading(false);
                swal("Customer", "invalid Customer", "success")
              }
            )
            .catch();
        }
      } else {
        if (regx.test(name) === false) {
          setcustomeNamerError(true)
        }
        if (Contact.length != 10) {
          setcustomerPhoneError(true)
        }
      }
    }
    setValidated(true)
  }

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
    rowsPerPageText: '',
    noRowsPerPage: true
  };

  const getCustomerDataForEdit = async (editCustomerId) => {
    // console.log("editCustomerId",editCustomerId)
    await customerByIdApi(userData.userinfo.userId, editCustomerId)
      .then(
        async (res) => {
          if (res.data) {
            setcontact(res.data.customerPhone);
            setEditCustomerId(editCustomerId);
            setname(res.data.customerName);
          }
        },
        (err) => {

        }
      )
      .catch();

  }
  const deleteCustomer = async (deleteCustomerId) => {
    let payloadData = {
      userId: userData.userinfo.userId,
      customerId: deleteCustomerId
    };
    swal({
      title:"Are you sure to delete Order?",
      // text: "Are you sure to delete Order?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Ok"],
    }).then((willDelete) => {
      if (willDelete) {
        deleteCustomerByIdApi(payloadData)
          .then(
            async (res) => {
              if (res.status === 200) {
                swal("Success", res.message, "success").then((ok) => {
                  if (ok) {
                    let custmerListt = custmerList.filter((e) => {
                      if (e.customerId != deleteCustomerId) {
                        return e
                      }
                    });
                    //  console.log("custmerListt",custmerListt)
                    setCustomerList([...custmerListt])
                    setCustomerTotalRecord(custmerTotalRecord - 1)
                  }
                });
              }
            });
      }
    },
      (err) => {

      }
    )
      .catch();
  }


  return (
    <div>
      <CHeaderDivider />

      <CContainer fluid>
        <CRow className='mb-3' >
          <CCol xs={12}>
            <h5 className="main-title">Customer</h5>
          </CCol>
          <CCol xs={8}>

            <CBreadcrumb className="m-0 ms-2" style={{ "--cui-breadcrumb-divider": "'>'" }}>
              <CBreadcrumbItem > <Link to="/dashboard">Home</Link></CBreadcrumbItem>
              <CBreadcrumbItem actives>Customer</CBreadcrumbItem>
            </CBreadcrumb>
          </CCol>
          <CCol xs={4}>
            <div class="text-end">
              {/* <Link to="/dashboard"><CButton color="warning"  size="sm" className="px-4 text-end text-white" style={{marginTop: "-52px"}} type="button">
         Back
      </CButton></Link> */}

            </div>
          </CCol>
        </CRow>
        <CRow >
          <CCol md={12} sm={12} lg={5}>

            <CCard className="p-4">
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  method="post"
                  encType="multipart/form-data"
                >
                  <h4>Customer</h4>
                  <CFormLabel >Name</CFormLabel>
                  <CFormInput
                    placeholder="Name"
                    name='name'
                    type="text"
                    onChange={(e) => {
                      setname(e.target.value);
                      validationForm(e.target.name, e.target.value)
                    }}
                    value={name}
                    required />
                  <CFormFeedback invalid> Please Enter Valid Name.</CFormFeedback>
                  {customeNamerError === true ? (
                    <>
                      <CFormFeedback className="errorMessage-customer">
                        Please Enter Valid Name.
                      </CFormFeedback>
                    </>
                  ) : null}
                  <br />
                  <CFormLabel>Contact</CFormLabel>
                  <CFormInput
                    type="number"
                    name='contact'
                    placeholder="Contact"
                    value={Contact}
                    onChange={(e) => {
                      setcontact(e.target.value);
                      validationForm(e.target.name, e.target.value)
                    }}
                    required
                  />
                  <CFormFeedback invalid>Please Enter Contact Number.</CFormFeedback>
                  {customerPhoneError === true ? (
                    <>
                      <CFormFeedback className="errorMessage-customer">
                      Enter 10 Digit Number.
                      </CFormFeedback>
                    </>
                  ) : null}
                  <CRow>
                    <CCol xs={6}>
                      <br />
                      <CButton color="primary" className="px-4" type="submit"
                        disabled={loading}>
                        {loading ? "Wait.." : "Submit"}
                      </CButton>
                    </CCol>

                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <br />

          </CCol>

          <CCol md={12} lg={7} >
            <CCard>
              <CCardHeader>
                <strong>Customer List</strong>
              </CCardHeader>
              <CCardBody>
                <DataTable
                  className='tableTopSpace  border border-table'
                  columns={columns}
                  progressPending={listLoading}
                  responsive={true}
                  data={custmerList}
                  paginationTotalRows={custmerTotalRecord}
                  onChangePage={handlePageChange}
                  pagination
                  paginationComponentOptions={paginationComponentOptions}
                  paginationServer
                />
              </CCardBody>
            </CCard>
          </CCol>

        </CRow>

      </CContainer>


    </div>
  )
}
