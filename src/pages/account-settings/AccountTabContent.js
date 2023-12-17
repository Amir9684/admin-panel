// ** React Imports
import { Fragment, useState } from "react";

// ** Third Party Components
// import Select from 'react-select'
import Cleave from "cleave.js/react";
import { useForm, Controller } from "react-hook-form";
import "cleave.js/dist/addons/cleave-phone.us";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from "reactstrap";

import avatarImg from "../../assets/images/avatars/avatar-blank.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Utils
// import { selectThemeColors } from '@utils'

// ** Demo Components
// import DeleteAccount from './DeleteAccount'

// const countryOptions = [
//   { value: 'uk', label: 'UK' },
//   { value: 'usa', label: 'USA' },
//   { value: 'france', label: 'France' },
//   { value: 'russia', label: 'Russia' },
//   { value: 'canada', label: 'Canada' }
// ]

// const languageOptions = [
//   { value: 'english', label: 'English' },
//   { value: 'spanish', label: 'Spanish' },
//   { value: 'french', label: 'French' },
//   { value: 'german', label: 'German' },
//   { value: 'dutch', label: 'Dutch' }
// ]

// const currencyOptions = [
//   { value: 'usd', label: 'USD' },
//   { value: 'euro', label: 'Euro' },
//   { value: 'pound', label: 'Pound' },
//   { value: 'bitcoin', label: 'Bitcoin' }
// ]

// const timeZoneOptions = [
//   { value: '(GMT-12:00) International Date Line West', label: '(GMT-12:00) International Date Line West' },
//   { value: '(GMT-11:00) Midway Island, Samoa', label: '(GMT-11:00) Midway Island, Samoa' },
//   { value: '(GMT-10:00) Hawaii', label: '(GMT-10:00) Hawaii' },
//   { value: '(GMT-09:00) Alaska', label: '(GMT-09:00) Alaska' },
//   { value: '(GMT-08:00) Pacific Time (US & Canada)', label: '(GMT-08:00) Pacific Time (US & Canada)' },
//   { value: '(GMT-08:00) Tijuana, Baja California', label: '(GMT-08:00) Tijuana, Baja California' },
//   { value: '(GMT-07:00) Arizona', label: '(GMT-07:00) Arizona' },
//   { value: '(GMT-07:00) Chihuahua, La Paz, Mazatlan', label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan' },
//   { value: '(GMT-07:00) Mountain Time (US & Canada)', label: '(GMT-07:00) Mountain Time (US & Canada)' },
//   { value: '(GMT-06:00) Central America', label: '(GMT-06:00) Central America' },
//   { value: '(GMT-06:00) Central Time (US & Canada)', label: '(GMT-06:00) Central Time (US & Canada)' },
//   {
//     value: '(GMT-06:00) Guadalajara, Mexico City, Monterrey',
//     label: '(GMT-06:00) Guadalajara, Mexico City, Monterrey'
//   },
//   { value: '(GMT-06:00) Saskatchewan', label: '(GMT-06:00) Saskatchewan' },
//   { value: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco', label: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco' },
//   { value: '(GMT-05:00) Eastern Time (US & Canada)', label: '(GMT-05:00) Eastern Time (US & Canada)' },
//   { value: '(GMT-05:00) Indiana (East)', label: '(GMT-05:00) Indiana (East)' },
//   { value: '(GMT-04:00) Atlantic Time (Canada)', label: '(GMT-04:00) Atlantic Time (Canada)' },
//   { value: '(GMT-04:00) Caracas, La Paz', label: '(GMT-04:00) Caracas, La Paz' },
//   { value: '(GMT-04:00) Manaus', label: '(GMT-04:00) Manaus' },
//   { value: '(GMT-04:00) Santiago', label: '(GMT-04:00) Santiago' },
//   { value: '(GMT-03:30) Newfoundland', label: '(GMT-03:30) Newfoundland' }
// ]

const AccountTabs = ({ data }) => {
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

  // ** Hooks
  const defaultValues = {
    lastName: "Coding",
    firstName: "Pending",
    gmail: "pendingcoding@gmail.com",
    phoneNumber: "09117828923",
    userName: "PC",
    nationalCode: "2081186020",
    userAbout: "biooooooooooo",
    homeAddress: "sari,saat square",
  };
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** States
  const [avatar, setAvatar] = useState(
    "https://acadapi.etacorealtime.ir\\Pictures\\ProfileImageThumbnail\\my-profile_1033624f-de7c-44e7-b3c0-ffa1ebb69a4b.jpg"
  );

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
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

  const handleImgReset = () => {
    setAvatar(avatarImg);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">مشخصات پروفایل</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          <div className="d-flex">
            <div className="me-25">
              <img
                className="rounded me-50"
                src={avatar}
                alt="عکسی موجود نیست !"
                height="100"
                width="100"
              />
            </div>
            <div className="d-flex align-items-end mt-75 ms-1">
              <div>
                <Button
                  tag={Label}
                  className="mb-75 me-75"
                  size="sm"
                  color="primary"
                >
                  آپلود عکس
                  <Input
                    type="file"
                    onChange={onChange}
                    hidden
                    accept="image/*"
                  />
                </Button>
                <Button
                  className="mb-75"
                  color="secondary"
                  size="sm"
                  outline
                  onClick={handleImgReset}
                >
                  بازنشانی عکس
                </Button>
                <p className="mb-0">
                  میتوانید عکس خود را بصورت JPG , PNG یا GIF آپلود کنید
                </p>
              </div>
            </div>
          </div>
          <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  نام
                </Label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="firstName"
                      placeholder="P C"
                      invalid={errors.firstName && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.firstName && (
                  <FormFeedback> لطفا یک مقدار صحیح وارد کنید </FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="lastName">
                  نام خانوادگی
                </Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                      {...field}
                    />
                  )}
                />
                {errors.lastName && (
                  <FormFeedback>لطفا یک مقدار صحیح وارد کنید </FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="emailInput">
                  پست الکترونیکی
                </Label>
                <Input
                  id="emailInput"
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={defaultValues.gmail}
                />
              </Col>
              {/* <Col sm='6' className='mb-1'>
                <Label className='form-label' for='company'>
                  Company
                </Label>
                <Input defaultValue={data.company} id='company' name='company' placeholder='Company Name' />
              </Col> */}
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="phNumber">
                  شماره تلفن
                </Label>
                <Input
                  id="phNumber"
                  name="phNumber"
                  className="form-control"
                  placeholder="09117828923"
                  defaultValue={defaultValues.phoneNumber}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="address">
                  آدرس
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="12, Business Park"
                  defaultValue={defaultValues.homeAddress}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="accountState">
                  کد ملی
                </Label>
                <Input
                  id="accountState"
                  name="state"
                  placeholder={defaultValues.nationalCode}
                  defaultValue={defaultValues.nationalCode}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="zipCode">
                  بیوگرافی
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  defaultValue={defaultValues.userAbout}
                  placeholder={defaultValues.userAbout}
                  maxLength="6"
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="zipCode">
                  نام کاربری
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  defaultValue={defaultValues.userName}
                  placeholder={defaultValues.userName}
                  maxLength="6"
                />
              </Col>
              {/* <Col sm='6' className='mb-1'>
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
              </Col> */}
              {/* <Col sm='6' className='mb-1'>
                <Label className='form-label' for='language'>
                  Language
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                />
              </Col> */}
              {/* <Col sm='6' className='mb-1'>
                <Label className='form-label' for='timeZone'>
                  Timezone
                </Label>
                <Select
                  id='timeZone'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={timeZoneOptions}
                  theme={selectThemeColors}
                  defaultValue={timeZoneOptions[0]}
                />
              </Col> */}
              {/* <Col sm='6' className='mb-1'>
                <Label className='form-label' for='currency'>
                  Currency
                </Label>
                <Select
                  id='currency'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={currencyOptions}
                  theme={selectThemeColors}
                  defaultValue={currencyOptions[0]}
                />
              </Col> */}
              <Col className="mt-2" sm="12">
                <Button type="submit" className="me-1" color="primary">
                  ذخیره اطلاعات
                </Button>
                <Button color="secondary" outline>
                  لغو عملیات
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* <DeleteAccount /> */}
    </Fragment>
  );
};

export default AccountTabs;
