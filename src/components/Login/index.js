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
import { loginApi } from "../Helper/loginapi";
import { resetPassword } from "../Helper/passwodUpdate";
import logo from "../../Image/logo.png"
const Login = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginemail, setloginemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    console.log("click");
    console.log("login email :", loginemail);
    console.log("login password :", password);
    let payloadData = {
      email: loginemail,
      password: password,
    };
    loginApi(payloadData)
      .then(
        async (res) => {
          console.log("login success");
          console.log("res", res);
          if (res.data?.userId) {
            await localStorage.setItem("userId", res.data.userId);
            await dispatch(checkLogin(res.data.userId))
            console.log("hiii")
            // swal("Login",  res.message, "success")
            navigate("/dashboard")
            setLoading(false);
          } else {
            swal("Login", res.message, "error");
            console.log("login error");
            setLoading(false);
          }
        },
        (err) => {
          console.log("login error");
          swal("Login", "Invalid password or email!!!", "error");
          setLoading(false);
        }
      )
      .catch();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const handleForgotPassWord = (e) => {
    e.preventDefault();
    navigate("/forgot-password")
  }
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
                    <div className="row rounded-4 mb-2 ">
                      <div className="col-4"></div>
                      <div className="col-4 text-center bg-secondary rounded-4   p-2">
                        {/* <img src={logo} alt="" style={{ height: "30px" }} />  */}
                        &nbsp; <b className="text-white">CP Laser Soldering</b>
                      </div>
                      <div className="col-4"></div>
                    </div>
                    <h4>Login</h4>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        type="email"
                        name="email"
                        onChange={(e) => {
                          setloginemail(e.target.value);
                        }}
                        required
                      />
                      <CFormFeedback invalid>Please enter email.</CFormFeedback>
                    </CInputGroup>
                    {/* <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
                    <CFormInput
                      type="text"
                      id="validationCustomUsername"
                      defaultValue=""
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                  </CInputGroup> */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                        autoComplete="current-password"
                        required
                      />
                      <CFormFeedback invalid>
                        Please enter password.
                      </CFormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit"
                          disabled={loading}>
                          {loading ? "Wait.." : "Login"}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={handleForgotPassWord}>
                          Forgot Password?
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
  );
};
export default Login;