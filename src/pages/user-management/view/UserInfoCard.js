// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
// import Select from "react-select";
import { BookOpen, Folder } from "react-feather";
// import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

import { getPersianNumbers } from "../../../utility/get-persian-numbers";
import EditUserModal from "../edit-user-modal";

const roleColors = {
  CourseAssistance: "light-info",
  Administrator: "light-danger",
  "Employee.Admin": "light-warning",
  Teacher: "light-success",
  Student: "light-primary",
  "Employee.Writer": "light-secondary",
  Referee: "light-info",
  TournamentAdmin: "light-secondary",
  TournamentMentor: "light-warning",
};

const statusColors = {
  true: "light-success",
  false: "light-secondary",
};

// const statusOptions = [
//   { value: "active", label: "Active" },
//   { value: "inactive", label: "Inactive" },
//   { value: "suspended", label: "Suspended" },
// ];

// const countryOptions = [
//   { value: "uk", label: "UK" },
//   { value: "usa", label: "USA" },
//   { value: "france", label: "France" },
//   { value: "russia", label: "Russia" },
//   { value: "canada", label: "Canada" },
// ];

// const languageOptions = [
//   { value: "english", label: "English" },
//   { value: "spanish", label: "Spanish" },
//   { value: "french", label: "French" },
//   { value: "german", label: "German" },
//   { value: "dutch", label: "Dutch" },
// ];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser, teachers, show, setShow }) => {
  const currentTeacher = teachers?.find(
    (t) => t.fullName === selectedUser?.fName + "-" + selectedUser?.lName
  );

  // ** State

  // ** Hook
  // const {
  //   reset,
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     email: selectedUser.email,
  //     lastName: selectedUser.fName,
  //     firstName: selectedUser.lName,
  //   },
  // });

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.currentPictureAddress) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={selectedUser.currentPictureAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={selectedUser.avatarColor || "light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedUser.fName + " " + selectedUser.lName}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

  // const onSubmit = (data) => {
  //   if (Object.values(data).every((field) => field.length > 0)) {
  //     setShow(false);
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: "manual",
  //         });
  //       }
  //     }
  //   }
  // };

  // const handleReset = () => {
  //   reset({
  //     username: selectedUser.email,
  //     lastName: selectedUser.fName,
  //     firstName: selectedUser.lName,
  //   });
  // };

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const insertDate = new Date(selectedUser?.insertDate)
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const months = [
    "فروردين",
    "ارديبهشت",
    "خرداد",
    "تير",
    "مرداد",
    "شهريور",
    "مهر",
    "آبان",
    "آذر",
    "دي",
    "بهمن",
    "اسفند",
  ];

  return (
    <Fragment>
      <Card className="bg-white">
        <CardBody>
          <div className="user-avatar-section" style={{ margin: "-20px 0 0" }}>
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedUser !== null ? selectedUser.fName : "تکمیل نشده"}
                  </h4>
                  {selectedUser !== null ? (
                    <>
                      {selectedUser.roles?.map((role) => (
                        <Badge
                          color={roleColors[role.roleName]}
                          className="text-capitalize"
                          style={{ margin: "10px 5px 0" }}
                        >
                          {role.roleName}
                        </Badge>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center gap-2 my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-info" className="rounded p-75">
                <Folder className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {getPersianNumbers(currentTeacher?.courseCounts)}
                </h4>
                <small>دوره ها</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-info" className="rounded p-75">
                <BookOpen className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {getPersianNumbers(currentTeacher?.newsCount)}
                </h4>
                <small>تعداد اخبار</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1"> مشخصات </h4>
          <div className="info-container">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span
                    className="fw-bolder me-25"
                    style={{ direction: "rtl" }}
                  >
                    نام :{" "}
                  </span>
                  <span style={{ direction: "rtl" }}>
                    {" "}
                    {selectedUser.fName + " " + selectedUser.lName}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">پست الکترونیکی : </span>
                  <span>{selectedUser.gmail}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضیعت : </span>
                  <Badge
                    className="text-capitalize px-2"
                    color={statusColors[`${selectedUser.active}`]}
                  >
                    {selectedUser.active ? "فعال" : "غیر فعال"}
                  </Badge>
                </li>
                {/* <li className="mb-75">
                  <span className="fw-bolder me-25">Role:</span>
                  <span className="text-capitalize">{selectedUser.role}</span>
                </li> */}
                {/* <li className="mb-75">
                  <span className="fw-bolder me-25">Tax ID:</span>
                  <span>
                    Tax-
                    {selectedUser.phoneNumber.substr(
                      selectedUser.phoneNumber.length - 4
                    )}
                  </span>
                </li> */}
                <li className="mb-75" style={{ direction: "rtl" }}>
                  <span className="fw-bolder me-25">شماره موبایل : </span>
                  <span>
                    {/* {`${selectedUser.phoneNumber?.slice(
                    0,
                    4
                  )} ${selectedUser.phoneNumber?.slice(
                    9,
                    selectedUser.phoneNumber.length
                  )}`} */}
                    {getPersianNumbers(selectedUser.phoneNumber, true)}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ ثبت نام : </span>
                  <span>
                    {" "}
                    {`${getPersianNumbers(insertDate?.[2], true)} ${
                      months[insertDate?.[1] - 1]
                    } ${getPersianNumbers(insertDate?.[0], true)}`}
                  </span>
                </li>
                {/* <li className="mb-75">
                  <span className="fw-bolder me-25">Country:</span>
                  <span>England</span>
                </li> */}
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              غیر فعال کردن
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  First Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Last Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="username"
                  name="username"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      placeholder="john.doe.007"
                      invalid={errors.username && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="billing-email">
                  Billing Email
                </Label>
                <Input
                  type="email"
                  id="billing-email"
                  defaultValue={selectedUser.email}
                  placeholder="example@domain.com"
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="status">
                  Status:
                </Label>
                <Select
                  id="status"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={
                    statusOptions[
                      statusOptions.findIndex(
                        (i) => i.value === selectedUser.status
                      )
                    ]
                  }
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="tax-id">
                  Tax ID
                </Label>
                <Input
                  id="tax-id"
                  placeholder="Tax-1234"
                  defaultValue={selectedUser.phoneNumber.substr(
                    selectedUser.contact.length - 4
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="contact">
                  Contact
                </Label>
                <Input
                  id="contact"
                  defaultValue={selectedUser.phoneNumber}
                  placeholder="+1 609 933 4422"
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="language">
                  language
                </Label>
                <Select
                  id="language"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center mt-1">
                  <div className="form-switch">
                    <Input
                      type="switch"
                      defaultChecked
                      id="billing-switch"
                      name="billing-switch"
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="billing-switch"
                    >
                      <span className="switch-icon-left">
                        <Check size={14} />
                      </span>
                      <span className="switch-icon-right">
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label
                    className="form-check-label fw-bolder"
                    for="billing-switch"
                  >
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal> */}

      <EditUserModal
        show={show}
        setShow={setShow}
        selectedUser={selectedUser}
      />
    </Fragment>
  );
};

export default UserInfoCard;
