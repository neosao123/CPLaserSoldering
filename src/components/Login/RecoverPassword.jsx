import React, { useState } from "react";
import { useSelector } from 'react-redux'
import swal from "sweetalert";
import { passwordUpdateApi, updatePasswordWithToken } from "../Helper/passwodUpdate"
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
    CRow,
    CContainer,
} from "@coreui/react";
import {
    cilLockLocked,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import logo from "../../Image/logo.png"
import { useNavigate, useParams } from "react-router-dom";

const RecoverPassword = () => {
    const [validated, setValidated] = useState(false);
    const [passwordError, setpasswordError] = useState(false);
    const [conformPasswordError, setconformPasswordError] = useState(false);
    const [passvalue, setpassvalue] = useState("");
    const [loading, setLoading] = useState(false);
    const [conformPassvalue, setconformPassvalue] = useState("");
    const { token } = useParams();
    const navigate = useNavigate()


    const formeset = () => {
        setpassvalue("");
        setconformPassvalue("");
    }


    const handleSubmit = (event) => {
        // event.preventDefault();
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
        } else {
            event.preventDefault();
            event.stopPropagation()

            if (passvalue === conformPassvalue) {
                // console.log("code for update")
                let payloadData = {
                    resetToken: token,
                    password: passvalue,
                    password_confirmation: conformPassvalue,
                };
                setLoading(true);
                updatePasswordWithToken(payloadData)
                    .then(
                        async (res) => {
                            // console.log(" success");
                            if (res.status === 200) {
                                setLoading(false)
                                swal("Success", res.message, "success").then((ok) => {
                                    if (ok) {
                                        navigate("/")
                                    }
                                })
                            } else {
                                setLoading(false)
                                swal("Warning", res.message, "warning")
                            }

                        },
                        (err) => {
                            // console.log("error");
                            setLoading(false);
                            // swal("Customer",  "invalid password", "error");
                            formeset("");
                        }
                    )
                    .catch();

            } else {

                // swal("Customer",  "invalid password", "error")
                formeset("")
            }
            setValidated(true)
        }

    }

    const validationForm = (inputName, value) => {

        if (inputName == "password" && value && value.length != 8) {
            setpasswordError(true)
        } else {
            setpasswordError(false)
        }
        if (inputName == "Confirm_password" && value && value.length != 8) {
            setconformPasswordError(true)
        } else {
            setconformPasswordError(false)
        }
    }

    return (
        <>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">

                <CContainer>
                    <CRow>
                        <CCol md={4} sm={4} lg={4}></CCol>
                        <CCol md={5} sm={4} lg={4}>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm
                                        className="row g-3 needs-validation"
                                        // noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}
                                        method="post"
                                        encType="multipart/form-data"
                                    >
                                        <div className="row  rounded-4 mb-2 ">
                                            <div className="col-3"></div>
                                            <div className="col-4 text-center bg-secondary rounded-4   p-2">
                                                {/* <img src={logo} alt="" style={{ height: "30px" }} />  */}
                                                &nbsp; <b className="text-white">CP Laser Soldering</b>
                                            </div>
                                            <div className="col-3"></div>
                                        </div>
                                        <h4>Change password </h4>


                                        <CFormLabel><CIcon icon={cilLockLocked} className="me-2" />New Password</CFormLabel>
                                        <CFormInput
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            onChange={(e) => {
                                                setpassvalue(e.target.value);
                                                validationForm(e.target.name, e.target.value)
                                            }}
                                            value={passvalue}
                                            required
                                        />

                                        <CFormFeedback invalid>Please Enter Password.</CFormFeedback>

                                        {passwordError === true ? (
                                            <>
                                                <CFormFeedback className="errorMessage-customer">
                                                    Please Enter 8 character password.
                                                </CFormFeedback>
                                            </>
                                        ) : null}

                                        <CFormLabel> <CIcon icon={cilLockLocked} className="me-2" /> Confirm  password</CFormLabel>
                                        <CFormInput
                                            type="password"
                                            name="Confirm_password"
                                            placeholder="Confirm password"
                                            value={conformPassvalue}
                                            onChange={(e) => {
                                                setconformPassvalue(e.target.value);
                                                validationForm(e.target.name, e.target.value)
                                            }}
                                            required
                                        />
                                        <CFormFeedback invalid>Please Enter Confirm Password.</CFormFeedback>

                                        {conformPasswordError === true ? (
                                            <>
                                                <CFormFeedback className="errorMessage-customer">
                                                    Please Enter 8 character password.
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
                                                    disabled={loading}
                                                >
                                                    {loading ? "Wait.." : "Submit"}

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
            </div>
        </>
    )
}

export default RecoverPassword;