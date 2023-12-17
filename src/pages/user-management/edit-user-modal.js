// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Button,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { selectThemeColors } from "@utils";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditUserModal = ({ show, setShow, selectedUser }) => {
  const MySwal = withReactContent(Swal);

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "اطمینان دارید !",
      text: "آیا میخواهید اطلاعات جدید ثبت شوند ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: " بله ",
      cancelButtonText: "لغو",
      customClass: {
        confirmButton: "btn btn-warning",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "error",
          title: "موفقیت آمیز نبود !",
          text: "مشکلی پیش آمده لطفا مجدد تلاش کنید",
          confirmButtonText: "تایید",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      }
    });
  };

  const statusOptions = [
    { value: "active", label: "فعال" },
    { value: "inactive", label: "غیر فعال" },
  ];

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: selectedUser.gmail,
      lastName: selectedUser.fName,
      firstName: selectedUser.lName,
    },
  });

  const handleReset = () => {
    reset({
      username: selectedUser.gmail,
      lastName: selectedUser.fName,
      firstName: selectedUser.lName,
    });
  };

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
      handleSuspendedClick();
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <Modal
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
          <h1 className="mb-1">ویرایش اطلاعات کاربر</h1>
          {/* <p></p> */}
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gy-1 pt-75">
            <Col md={6} xs={12}>
              <Label className="form-label" for="firstName">
                نام
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
                    placeholder="pending"
                    invalid={errors.firstName && true}
                  />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="lastName">
                نام خانوادگی
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
                    placeholder="coding"
                    invalid={errors.lastName && true}
                  />
                )}
              />
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="username">
                پست الکترونیکی
              </Label>
              <Controller
                defaultValue={selectedUser.gmail}
                control={control}
                id="username"
                name="username"
                render={({ field }) => (
                  <Input
                    type="email"
                    {...field}
                    id="username"
                    placeholder="pendingcoding@gmail.com"
                    invalid={errors.username && true}
                  />
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="billing-email">
                نام کاربری
              </Label>
              <Input
                type="content"
                id="billing-email"
                defaultValue={selectedUser.userName}
                placeholder="PendingCoding"
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="status">
                وضیعت
              </Label>
              <Select
                id="status"
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                theme={selectThemeColors}
                defaultValue={statusOptions[0]}
              />
            </Col>
            {/* <Col md={6} xs={12}>
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
          </Col> */}
            <Col md={6} xs={12}>
              <Label className="form-label" for="contact">
                شماره موبایل
              </Label>
              <Input
                id="contact"
                defaultValue={selectedUser.phoneNumber}
                placeholder="0911-782-8923"
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="language">
                بیوگرافی
              </Label>
              <Input
                id="contact"
                defaultValue={selectedUser.userAbout}
                placeholder="سلام من ..."
              />
            </Col>
            {/* <Col md={6} xs={12}>
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
          </Col> */}
            {/* <Col xs={12}>
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
          </Col> */}

            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-2" color="primary">
                ثبت اطلاعات
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
                لغو عملیات
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditUserModal;
