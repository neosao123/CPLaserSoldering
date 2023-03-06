import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import DataTable, { FilterComponent } from 'react-data-table-component';
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
  CModalFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPlus, cilInfo } from "@coreui/icons";
import { createOrderApi, fetchCustomerListApi } from "../Helper/order";
import { useSelector } from "react-redux";
import { customerApi } from "../Helper/customer";
import { Routes, Route, useParams } from "react-router-dom";
import { orderEditByIdApi } from "../Helper/order";
import Select from "react-select";



function View() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [preview, setPreview] = useState();
  const [formFields, setFormFields] = useState([
    { item: "", charges: "", type: "" },
  ]);
  const [customername, setcustomername] = useState("");
  const [customernameError, setCustomernameError] = useState(false);
  const [chargestotal, setchargestotal] = useState();
  const [customerlist, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorderId, setEditorderId] = useState(0);
  const [validated, setValidated] = useState(false);
  const [note, setNote] = useState("");
  const [Date, setDate] = useState();
  const [selectedCustomer, setSelectedCusomer] = useState();
  const [OrderPhoto, setOrderPhoto] = useState();
  let { Id } = useParams();

  //for modal order add customer
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [nameErr, setNameErr] = useState();
  const [contactErr, setContactErr] = useState();

  const userData = useSelector((state) => state.userData);
  let userId = userData.userinfo.userId;

  useEffect(() => {
    fetchCustomerListApi().then(
      (res) => {
        var data = res.data;
        var customerLive = [];
        data.forEach((element) => {
          customerLive.push({
            value: element.customerId,
            label: element.customerName,
          });
        });
        setCustomerList(customerLive);
        console.log("customerLive", customerLive);
      },
      (err) => {
        console.log(err);
      }
    );
    // const getCustomerList = async () => {
    //   const apireturnData = await fetchCustomerListApi();
    //   // console.log("result",apireturnData)
    //   setCustomerList(apireturnData.data ? apireturnData.data : [])
    // }
    // getCustomerList();
    getorderDataForEdit();
  }, []);
  // create a preview as a side effect, whenever selected file is changed
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // let startDate = "";
    // if (Date ) {
    //   let datestart = new Date(Date);
    //   startDate = datestart.toLocaleDateString("es-CL", {
    //     day: "2-digit",
    //     month: "2-digit",
    //     year: "numeric",
    //   });
    // }

    const formm = event.currentTarget;
    if (formm.checkValidity() === false) {
      event.preventDefault();
    } else {
      if (selectedCustomer && selectedCustomer != "0") {
        let items = [];
        let charges = [];
        let types = [];
        formFields.map((e) => {
          items.push(e.item);
          charges.push(e.charges);
          types.push(e.type);
        });

        const formData = new FormData();
        formData.append("userId", userData.userinfo.userId);
        formData.append("customerId", selectedCustomer);
        formData.append("orderItems", JSON.stringify(formFields));
        formData.append("totalCharges", chargestotal);
        formData.append("note", note);
        formData.append("orderPhoto", image ?? "");
        formData.append("orderDate", Date);
        // formData.append(startDate)

        await createOrderApi(formData).then((res) => {
          if (res.status === 200) {
            swal("Success", res.message, "success").then((ok) => {
              if (ok) {
                navigate("/customerbilling");
              }
            });
          } else {
            swal("Error", res.message, "warning");
          }
        });
        setLoading(false);
        setImageError(false);
      } else {
        // console.log("customername",customername)
        if (image.type === "image/png" || image.type === "image/jpeg") {
          setImageError(false);
        } else {
          setImageError(true);
        }
        if (!selectedCustomer || selectedCustomer == "0") {
          setCustomernameError(true);
        }
      }
    }
    setValidated(true);
  };

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
    if (event.target.name == "charges") {
      let totalcharges = 0;
      formFields.map((e) => {
        totalcharges = totalcharges + parseFloat(e.charges);
      });
      setchargestotal(totalcharges);
      // console.log("tota",totalcharges)
    }
  };
  const formreset = () => {
    window.location.reload();
    setImage(null);
    setImageError(false);
    setPreview(null);
    setSelectedCusomer("");
    setchargestotal("");
    setFormFields([{ item: "", charges: "", type: "" }]);
  };

  const addFields = () => {
    let object = {
      item: "",
      charges: "",
      type: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index, charges) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields([...data]);
    setchargestotal(chargestotal - charges);
  };
  const handleFileChangeImage = (e) => {
    if (e.target.files) {
      if (
        e.target.files[0].type == "image/png" ||
        e.target.files[0].type == "image/jpeg"
      ) {
        setImageError(false);
      } else {
        setImageError(true);
      }
      setImage(e.target.files[0]);
    }
  };

  const getorderDataForEdit = async () => {
    let orderId = Id;
    await orderEditByIdApi(orderId)
      .then(
        async (res) => {
          console.log("res", res.data);
          if (res.status === 200) {
            var items = [];
            res.data.orderItems.forEach((element) => {
              console.log("element", element);
              items.push({
                item: element.item,
                type: element.type,
                charges: element.charges,
              });
              setFormFields(items);
            });

            //       res.data.orderItems.forEach((itemm)=>{
            //       setFormFields([
            //         { item: itemm.res.data.orderItems.item, type: itemm.res.data.orderItems.type, charges: itemm.res.data.orderItems.charges  }
            //       ]);
            // })
            setNote(res.data.note);
            setDate(res.data.orderDate);
            setSelectedCusomer(res.data.customerId);
            setchargestotal(res.data.totalCharges);
            setOrderPhoto(res.data.orderPhoto);
          }
        },
        (err) => { }
      )
      .catch();
  };

  const handleAddCustomer = (e) => {
    let validate = true;
    e.preventDefault();
    let data = {
      userId: userId,
      customerName: name,
      customerPhone: contact,
    };
    if (data.customerName?.trim() === "" || data.customerName === undefined) {
      setNameErr("Please enter valid name");
      validate = false;
    }
    if (data.customerPhone?.trim() === "" || data.customerPhone === undefined) {
      setContactErr("Please enter contact number");
      validate = false;
    }
    if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-.]?([0-9]{4})$/.test(
        data.customerPhone
      )
    ) {
      setContactErr("Please enter 10 digit number");
      validate = false;
    }

    if (validate) {
      customerApi(data).then((res) => {
        console.log(res);
        if (res.status === 200) {
          swal("Success", res.message, "success").then((Ok) => {
            if (Ok) {
              window.location.reload();
            }
          });
        } else {
          swal("Warning", res.message, "warning");
        }
      });
    }
  };
  function handleCustomer(e) {
    setSelectedCusomer(e.value);
    setCustomernameError("");
  }

  return (
    <div>
      <CHeaderDivider />
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <h5 className="main-title">View </h5>
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
              <CBreadcrumbItem actives>View Order</CBreadcrumbItem>
            </CBreadcrumb>
          </CCol>
          <CCol xs={4}>
            <div className="text-end">
              <Link to="/customerbilling">
                <CButton
                  color="info"
                  size="sm"
                  className="px-4 text-end text-white "
                  type="button"
                  style={{ marginTop: "-52px" }}
                >
                  Back
                </CButton>
              </Link>
            </div>
          </CCol>
        </CRow>
      </CContainer>
      <br />

      <CRow className="justify-content-start">
        <CCol md={12} sm={12} lg={12}>
          <CCard style={{ margin: "10px" }} className="mb-4">
            <CCardHeader>
              <strong>View</strong>
            </CCardHeader>
            <CCardBody>
              <br />
              <div>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  // onSubmit={popswalfun}
                  onSubmit={handleSubmit}
                  method="post"
                >
                  <CRow className="mb-3">
                    <CCol md={7} sm={12} xs={12}>
                      <CFormLabel>Customer</CFormLabel>

                      <div className="">
                        <Select
                          options={customerlist}
                          isDisabled={true}
                          className="text-start"

                          placeholder={
                            <div className="select-placeholder-text">
                              Select options
                            </div>
                          }
                          value={customerlist?.find(
                            (obj) => obj.value === selectedCustomer
                          )}
                          onChange={handleCustomer}
                          isSearchable={true}
                        />
                      </div>
                      <CFormFeedback invalid>
                        Please Choose a Customer Name.
                      </CFormFeedback>
                      {customernameError === true ? (
                        <>
                          <CFormFeedback className="errorMessage mb-3">
                            Please Choose a Customer Name.
                          </CFormFeedback>
                        </>
                      ) : null}

                      {/* <CFormSelect
                          aria-describedby="validationCustom04Feedback"
                          feedbackInvalid="Please choose a Customer Name."
                          id="validationCustom04"
                          required
                          onChange={(e) => { setcustomername(e.target.value); if (e.target?.value == "0") { setCustomernameError(true); } }}
                          name="customer_name"
                          value={customername}
                        >
                          <option value="0">Select Customer</option>
                          {
                            customerlist.map((e) => {

                              return <option value={e.customerId}>{e.customerName}</option>
                            })
                          }
                        </CFormSelect>
                        <CFormFeedback invalid >Please Choose a Customer Name.</CFormFeedback>
                        {customernameError === true ? (
                          <>
                            <CFormFeedback className="errorMessage">
                              Please Choose a Customer Name.
                            </CFormFeedback>
                          </>
                        ) : null} */}
                    </CCol>
                    <CCol md={1} sm={1} xs={2}>
                      {/* <div className="mt-2">
                        <CButton
                          onClick={() => setVisible(!visible)}
                          className="text-white mt-4 p-1"
                          type="button"
                          color="primary"
                        >
                          <CIcon icon={cilPlus} className="text-white" />
                        </CButton>
                      </div> */}
                    </CCol>

                    <CCol md={3} sm={5}>
                      <CFormLabel>OrderDate</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          type="date"
                          name="date"
                          value={Date}
                          disabled
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                          placeholder="Date"
                        />
                      </CInputGroup>
                    </CCol>

                  </CRow>

                  {/* <CCol md={6} sm={12} className='text-end'> */}
                  {/* <Link to="/customerbilling">  <CButton color="info"   className='m-2 text-white' type="button">
           Customer Billing
             </CButton> </Link>  */}
                  {/* </CCol> */}

                  {formFields.map((form, index) => {
                    return (
                      <CRow key={index}>
                        <CCol md={4} sm={12} xs={12}>
                          <CFormLabel htmlFor="validationCustom01">
                            Item
                          </CFormLabel>
                          <CFormInput
                            type="text"
                            id="validationCustom01"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.item}
                            disabled
                            name="item"
                            required
                          />
                          <CFormFeedback invalid>
                            Please select item
                          </CFormFeedback>
                        </CCol>
                        <CCol md={4} sm={12} xs={12}>
                          <CFormSelect
                            aria-describedby="validationTooltip04Feedback"
                            feedbackInvalid="Please select type."
                            id="validationTooltip04"
                            label="Type"
                            disabled
                            name="type"
                            value={form.type}
                            onChange={(event) => handleFormChange(event, index)}
                            required
                          >
                            <option value="">Choose</option>
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={3} sm={11} xs={10}>
                          <CFormLabel htmlFor="validationCustom02">
                            Charges
                          </CFormLabel>
                          <CFormInput
                            type="number"
                            id="validationCustom02"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.charges}
                            disabled
                            name="charges"
                            placeholder="Charges"
                            required
                          />
                          <CFormFeedback invalid>
                            Please enter charges
                          </CFormFeedback>
                        </CCol>

                        <CCol md={1} sm={1} xs={2}>
                          {/* <CButton
                            color="primary"
                            disabled={formFields.length === 1 ? true : false}
                            onClick={() => {
                              removeFields(index, form.charges);
                            }}
                            className="removeButton"
                          >
                            <CIcon icon={cilTrash} />
                          </CButton> */}
                        </CCol>
                      </CRow>
                    );
                  })}
                  <CRow className="mt-3">
                    <CCol md={8} sm={12} xs={12}>
                      {/* <CButton
                        color="danger"
                        className="text-white mt-4"
                        onClick={addFields}
                        type="button"
                        disabled
                      > */}
                      {/* Add More. */}
                      {/* <CIcon icon={cilPlus} className="text-white " />
                      </CButton> */}
                    </CCol>
                    {/* <CCol md={4} sm={5} className=''>
        <CFormLabel htmlFor="validationCustom03" >Total Charges :</CFormLabel>
          
         </CCol> */}
                    <CCol md={3} sm={11} xs={10}>
                      <CFormLabel htmlFor="validationCustom03">
                        Total Charges :
                      </CFormLabel>
                      <CFormInput
                        type="number"
                        // onChange={toalcount}
                        id="validationCustom03"
                        disabled
                        name="total_number"
                        value={chargestotal}
                        placeholder="Total"
                        required
                      />
                      <CFormFeedback invalid>
                        Please enter Total Charges
                      </CFormFeedback>
                    </CCol>
                  </CRow>

                  <CRow className="mt-3">
                    <CForm>
                      <CCol md={8} sm={12} xs={12}>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">
                          Note
                        </CFormLabel>
                        <CFormTextarea
                          id="exampleFormControlTextarea1"
                          name="note"
                          rows={3}
                          text=""
                          disabled
                          onChange={(e) => setNote(e.target.value)}
                          value={note}
                        ></CFormTextarea>
                      </CCol>
                    </CForm>
                  </CRow>

                  <CRow className="mt-3">
                    <CCol md={7} sm={12} xs={12}>
                      {/* <CFormLabel htmlFor="validationCustom02">
                        Image
                      </CFormLabel> */}
                      {/* <CFormInput
                        name="image"
                        type="file"
                        id="validationTextarea"
                        disabled
                        aria-label="file example"
                        // value={""}
                        onChange={handleFileChangeImage}
                      /> */}

                      {/* <img src={OrderPhoto} /> */}
                      {/* 
                      {imageError === true ? (
                        <>
                          <CFormFeedback className="errorMessage">
                            Please upload image only
                          </CFormFeedback>
                        </>
                      ) : null} */}
                    </CCol>
                  </CRow>
                  <CCol xs={12}>
                    {preview ? (
                      <img src={preview} className="imagePreview" />
                    ) : (
                      <img src={OrderPhoto} className="imagePreview" />
                    )}
                  </CCol>

                  <CCol md={6} sm={12}>
                    {/* <CButton
                      color="primary"
                      disabled={imageError || loading ? true : false}
                      type="submit"
                      onClick={() => {
                        !selectedCustomer || selectedCustomer === "0"
                          ? setCustomernameError(true)
                          : setCustomernameError(false);
                      }}
                    >
                      {loading ? "wait.." : "Submit"}
                    </CButton> */}

                    {/* <CButton href='#'    className="px-4 text-end text-white m-2  " type="link" >
            Reset
         </CButton> */}
                    {/* <CButton
                      color="link"
                      className="px-0 text-end text-decoration-none m-2"
                      onClick={formreset}
                    >
                      Reset
                    </CButton> */}
                  </CCol>
                </CForm>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default View;