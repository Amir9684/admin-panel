// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardTitle, CardHeader, Badge } from "reactstrap";

// // ** Third Party Components
// import Select from 'react-select'
// import { Home, Check, X, Briefcase } from 'react-feather'
// import { useForm, Controller } from 'react-hook-form'

// // ** Utils
// import { selectThemeColors } from '@utils'

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { Linkedin, Send } from "react-feather";
import { Link } from "react-router-dom";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";

// const countryOptions = [
//   { value: 'uk', label: 'UK' },
//   { value: 'usa', label: 'USA' },
//   { value: 'france', label: 'France' },
//   { value: 'russia', label: 'Russia' },
//   { value: 'canada', label: 'Canada' }
// ]

// const defaultValues = {
//   lastName: '',
//   firstName: ''
// }

const BillingAddress = ({ selectedUser }) => {
  // ** States
  // const [show, setShow] = useState(false)

  // ** Hooks
  // const {
  //   reset,
  //   control,
  //   setError,
  //   clearErrors,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({ defaultValues })

  // const onSubmit = data => {
  //   if (Object.values(data).every(field => field.length > 0)) {
  //     setShow(false)
  //     reset()
  //   } else {
  //     setError('firstName', {
  //       type: 'manual'
  //     })
  //     setError('lastName', {
  //       type: 'manual'
  //     })
  //   }
  // }

  // const onDiscard = () => {
  //   clearErrors()
  //   setShow(false)
  //   reset()
  // }

  const birthDay = new Date(selectedUser?.birthDay)
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
      <Card>
        <CardHeader>
          <CardTitle tag="h4">سایر مشخصات</CardTitle>
          {/* <Button color='primary' size='sm' onClick={() => setShow(true)}>
            Edit Address
          </Button> */}
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl="7" xs="12">
              <Row tag="dl" className="mb-0">
                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  نام کاربری :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser.userName
                    ? selectedUser.userName
                    : "تکمیل نشده ! "}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  ایمیل بازیابی :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser.recoveryEmail
                    ? selectedUser.recoveryEmail
                    : "تکمیل نشده ! "}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  تایید دو مرحله ای :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser.twoStepAuth === false ? <Badge color="light-danger"> غیر فعال </Badge> : <Badge color="light-success"> فعال</Badge>}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  بیوگرافی :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser.userAbout
                    ? selectedUser.userAbout
                    : "تکمیل نشده ! "}
                </Col>

                {/* <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  پروفایل لینکدین :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser.linkdinProfile ? (
                    <>
                      {" "}
                      <Link to={selectedUser.linkdinProfile}>
                        {` ${selectedUser.linkdinProfile} `}
                      </Link>
                      <Linkedin
                        color="#7367f0"
                        size={18}
                        style={{ marginTop: "-7px", marginRight: "3px" }}
                      />
                    </>
                  ) : (
                    "تکمیل نشده ! "
                  )}
                </Col> */}
              </Row>
            </Col>
            <Col xl="5" xs="12">
              <Row tag="dl" className="mb-0">
                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  لوکیشن :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {/* {selectedUser.telegramLink ? (
                    <>
                      {" "}
                      <Link to={selectedUser.telegramLink}>
                        {" "}
                        {` ${selectedUser.telegramLink} `}{" "}
                      </Link>
                      <Send
                        color="#7367f0"
                        size={18}
                        style={{ marginTop: "-3px", marginRight: "3px" }}
                      />
                    </>
                  ) : (
                    "تکمیل نشده ! "
                  )} */}
                  <Link to="https://maps.app.goo.gl/eRpNApDWCFaN5YdF7" target="blank">
                    {" "}
                    https://maps.app.goo.gl/eRpNApDWCFaN5YdF7{" "}
                  </Link>
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  آدرس خانه :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser.homeAdderess
                    ? selectedUser.homeAdderess
                    : "تکمیل نشده !"}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  شماره ملی :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {selectedUser.nationalCode
                    ? getPersianNumbers(selectedUser.nationalCode, true)
                    : "تکمیل نشده !"}
                </Col>

                <Col tag="dt" sm="4" className="fw-bolder mb-1">
                  تاریخ تولد :
                </Col>
                <Col tag="dd" sm="8" className="mb-1">
                  {`${getPersianNumbers(birthDay?.[2], true)} ${
                    months[birthDay?.[1] - 1]
                  } ${getPersianNumbers(birthDay?.[0], true)}`}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* <Modal
        isOpen={show}
        onClosed={onDiscard}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-4 mx-50'>
          <h1 className='address-title text-center mb-1'>Add New Address</h1>
          <p className='address-subtitle text-center mb-2 pb-75'>Add address for billing address</p>
          <Row tag='form' className='gy-1 gx-2' onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <Row className='custom-options-checkable'>
                <Col md={6} className='mb-md-0 mb-2'>
                  <Input
                    type='radio'
                    defaultChecked
                    id='homeAddress'
                    name='addressRadio'
                    value='homeAddress'
                    className='custom-option-item-check'
                  />
                  <label className='custom-option-item px-2 py-1' htmlFor='homeAddress'>
                    <span className='d-flex align-items-center mb-50'>
                      <Home className='font-medium-4 me-50' />
                      <span className='custom-option-item-title h4 fw-bolder mb-0'>Home</span>
                    </span>
                    <span className='d-block'>Delivery time (7am – 9pm)</span>
                  </label>
                </Col>
                <Col md={6} className='mb-md-0 mb-2'>
                  <Input
                    type='radio'
                    id='officeAddress'
                    name='addressRadio'
                    value='officeAddress'
                    className='custom-option-item-check'
                  />
                  <label className='custom-option-item px-2 py-1' htmlFor='officeAddress'>
                    <span className='d-flex align-items-center mb-50'>
                      <Briefcase className='font-medium-4 me-50' />
                      <span className='custom-option-item-title h4 fw-bolder mb-0'>Office</span>
                    </span>
                    <span className='d-block'>Delivery time (10am – 6pm)</span>
                  </label>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6}>
              <Label className='form-label' for='firstName'>
                First Name
              </Label>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => {
                  console.log(field)
                  return <Input placeholder='John' id='firstName' invalid={errors.firstName && true} {...field} />
                }}
              />
              {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
            </Col>
            <Col xs={12} md={6}>
              <Label className='form-label' for='lastName'>
                Last Name
              </Label>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <Input id='lastName' placeholder='Doe' invalid={errors.lastName && true} {...field} />
                )}
              />
              {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='country'>
                Country
              </Label>
              <Select
                id='country'
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={countryOptions}
                theme={selectThemeColors}
                defaultValue={countryOptions[0]}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='addressLine1'>
                Address Line 1
              </Label>
              <Input id='addressLine1' placeholder='12, Business Park' />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='addressLine2'>
                Address Line 2
              </Label>
              <Input id='addressLine2' placeholder='Mall Road' />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='town'>
                Town
              </Label>
              <Input id='town' placeholder='Los Angeles' />
            </Col>
            <Col xs={12} md={6}>
              <Label className='form-label' for='state-province'>
                State / Province
              </Label>
              <Input id='state-province' placeholder='California' />
            </Col>
            <Col xs={12} md={6}>
              <Label className='form-label' for='zip-code'>
                Zip Code
              </Label>
              <Input id='zip-code' placeholder='99950' />
            </Col>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='form-switch'>
                  <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                  <Label className='form-check-label' htmlFor='billing-switch'>
                    <span className='switch-icon-left'>
                      <Check size={14} />
                    </span>
                    <span className='switch-icon-right'>
                      <X size={14} />
                    </span>
                  </Label>
                </div>
                <Label className='form-check-label fw-bolder' for='billing-switch'>
                  Use as a billing address?
                </Label>
              </div>
            </Col>
            <Col className='text-center' xs={12}>
              <Button type='submit' className='me-1 mt-2' color='primary'>
                Submit
              </Button>
              <Button type='reset' className='mt-2' color='secondary' outline onClick={onDiscard}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal> */}
    </Fragment>
  );
};

export default BillingAddress;
