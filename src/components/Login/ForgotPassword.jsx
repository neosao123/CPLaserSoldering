import React, { useState } from "react";
// import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { checkLogin } from "../Store/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

import swal from "sweetalert";
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CFormLabel,
    CFormFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { resetPassword } from "../Helper/passwodUpdate";
import logo from "../../Image/logo.png"


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginemail, setloginemail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // setLoading(true)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {

            console.log("click");
            console.log("login email :", loginemail);
            let payloadData = {
                email: loginemail,
            };

            resetPassword(payloadData)
                .then(
                    async (res) => {
                        console.log("login success");
                        console.log("res", res);
                        if (res.status === 200) {
                            swal("Success", res.message, "success");
                        } else {
                            swal("Error", res.message, "error");
                        }
                    },
                    (err) => {
                        console.log("login error");
                        setLoading(false);
                    }
                )
                .catch();

        }
        setValidated(true);
    };




    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="row  rounded-4 mb-2 ">
                                            <div className="col-4"></div>
                                            <div className="col-4 text-center bg-secondary rounded-4   p-2">
                                                {/* <img src={logo} alt="" style={{ height: "30px" }} />  */}
                                                &nbsp; <b className="text-white">CP Laser Soldering</b>
                                            </div>
                                            <div className="col-4"></div>
                                        </div>
                                        {/* <div className="bg-success"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> */}
                                        {/* </div> */}
                                        <h4>Forgot Password</h4>

                                        <CInputGroup className="mb-3 mt-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Email"
                                                type="email"
                                                name="email"
                                                onChange={(e) => {
                                                    setloginemail(e.target.value); setValidated(false)
                                                }}
                                                required
                                            />
                                            <CFormFeedback invalid>Please enter email.</CFormFeedback>
                                        </CInputGroup>


                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" type="submit"
                                                    disabled={loading}>
                                                    {loading ? "Wait.." : "Send Email"}
                                                </CButton>
                                            </CCol>

                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default ForgotPassword;