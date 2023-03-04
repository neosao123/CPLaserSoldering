import React from "react";

import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import avatar8 from "./../../assets/images/avatars/8.jpg";
import swal from "sweetalert";
import strings from "../../components/strings";

const PHOTO_URL = strings

const AppHeaderDropdown = () => {
  const userData = useSelector((state) => state.userData);
  let navigate = useNavigate();
  const logout = () => {
    console.log("Hello");
    //  alert("hiii")
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to logout?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Ok"],
    }).then((willDelete) => {
      if (willDelete) {
        swal("Success", "successfully logged out", "success");
        localStorage.removeItem("userId");
        navigate("/login");
      }
    });
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={userData.userinfo.profile_photo} size="md" />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Name
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          {userData.userinfo.name}
        </CDropdownItem>

        {/* <CDropdownHeader className="bg-light fw-semibold py-2">
          Email
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          {userData.userinfo.email}
        </CDropdownItem> */}

        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>

        <Link to="/changepass" className="text-decoration-none">
          <CDropdownItem>
            <CIcon icon={cilLockLocked} className="me-2" />
            Change Password
          </CDropdownItem>
        </Link>

        <Link to="/profilepage" className="text-decoration-none">
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            My Profile
          </CDropdownItem>
        </Link>

        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
