// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Modal } from "reactstrap";
import { createUser } from "../../../services/api/create-user";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// ** Store & Actions
// import { addUser } from '../store'
// import { useDispatch } from 'react-redux'

const defaultValues = {
  gmail: "",
  phoneNumber: "",
  password: "",
  // company: "",
  firstName: "",
  lastName: "",
  // country: null,
};

// const countryOptions = [
//   { label: 'Australia', value: 'Australia' },
//   { label: 'Bangladesh', value: 'Bangladesh' },
//   { label: 'Belarus', value: 'Belarus' },
//   { label: 'Brazil', value: 'Brazil' },
//   { label: 'Canada', value: 'Canada' },
//   { label: 'China', value: 'China' },
//   { label: 'France', value: 'France' },
//   { label: 'Germany', value: 'Germany' },
//   { label: 'India', value: 'India' },
//   { label: 'Indonesia', value: 'Indonesia' },
//   { label: 'Israel', value: 'Israel' },
//   { label: 'Italy', value: 'Italy' },
//   { label: 'Japan', value: 'Japan' },
//   { label: 'Korea', value: 'Korea' },
//   { label: 'Mexico', value: 'Mexico' },
//   { label: 'Philippines', value: 'Philippines' },
//   { label: 'Russia', value: 'Russia' },
//   { label: 'South', value: 'South' },
//   { label: 'Thailand', value: 'Thailand' },
//   { label: 'Turkey', value: 'Turkey' },
//   { label: 'Ukraine', value: 'Ukraine' },
//   { label: 'United Arab Emirates', value: 'United Arab Emirates' },
//   { label: 'United Kingdom', value: 'United Kingdom' },
//   { label: 'United States', value: 'United States' }
// ]

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();

  //alerts
  const handleSuccess = () => {
    return MySwal.fire({
      title: "کاربر با موفقیت ایجاد شد !",
      text: "میتوانید جزییات کاربر را ببینید و درصورت نیاز آنرا اصلاح کنید",
      icon: "success",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn",
      },
      confirmButtonText: `مشاهده جزییات`,
      cancelButtonText: "بازگشت",
      showCancelButton: true,
      showCloseButton: true,
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        navigate("/");
      }
    });
  };

  const handleError = () => {
    return MySwal.fire({
      title: "! عملیات نا موفق",
      text: "شماره موبایل یا ایمیل تکراری است ، لطفا دوباره تلاش کنید",
      icon: "error",
      customClass: {
        confirmButton: "btn btn-danger",
      },
      showCloseButton: true,
      confirmButtonText: "تایید",
      buttonsStyling: false,
    });
  };

  // ** States
  const [data, setData] = useState(null);
  // const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");

  const [isStudent, setIsStudent] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);

  // ** Store Vars
  // const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Function to handle form submit
  const onSubmit = async (data) => {
    setData(data);
    if (checkIsValid(data)) {
      // dispatch(
      //   addUser({
      //     role,
      //     avatar: '',
      //     status: 'active',
      //     gmail: data.gmail,
      //     currentPlan: plan,
      //     billing: 'auto debit',
      //     company: data.company,
      //     phoneNumber: data.phoneNumber,
      //     firstName: data.firstName,
      //     lastName: data.lastName,
      //     country: data.country.value
      //   })
      // )

      const obj = {
        firstName: data.firstName,
        lastName: data.lastName,
        gmail: data.gmail,
        password: data.password,
        phoneNumber: data.phoneNumber,
        isStudent: isStudent,
        isTeacher: isTeacher,
      };

      const createUserApi = await createUser(obj);

      console.log(createUserApi, obj);

      if (createUserApi.success === true) {
        handleSuccess();
        toggleSidebar();
      } else if (createUserApi.success === false) {
        handleError();
      }
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError({
            type: "manual",
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setRole("subscriber");
    // setPlan("basic");
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="کاربر جدید"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="firstName">
            نام <span className="text-danger">*</span>
          </Label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                id="firstName"
                placeholder="محمد حسین"
                invalid={errors.firstName && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="lastName">
            نام خانوادگی <span className="text-danger">*</span>
          </Label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                id="lastName"
                placeholder="بحرالعلوم"
                invalid={errors.lastName && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            پست الکترونیکی <span className="text-danger">*</span>
          </Label>
          <Controller
            name="gmail"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="userEmail"
                placeholder="pendingcoding@gmail.com"
                invalid={errors.gmail && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="password">
            رمز عبور<span className="text-danger">*</span>
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                id="password"
                placeholder="•••••••••••••"
                invalid={errors.password && true}
                {...field}
              />
            )}
          />
          <FormText color="muted">
            میتوانید از حروف ، اعداد و نشانه ها استفاده کنید
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="phoneNumber">
            شماره موبایل <span className="text-danger">*</span>
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="phoneNumber"
                placeholder="09XX XXX XXXX"
                invalid={errors.phoneNumber && true}
                {...field}
              />
            )}
          />
        </div>
        {/* <div className="mb-1">
          <Label className="form-label" for="company">
            Company <span className="text-danger">*</span>
          </Label>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <Input
                id="company"
                placeholder="Company Pvt Ltd"
                invalid={errors.company && true}
                {...field}
              />
            )}
          />
        </div> */}
        {/* <div className="mb-1">
          <Label className="form-label" for="country">
            Country <span className="text-danger">*</span>
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix="select"
                // options={countryOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.country === null,
                })}
                {...field}
              />
            )}
          />
        </div> */}
        <div className="mb-1">
          <Label className="form-label" for="user-role">
            انتخاب نقش
          </Label>
          <div
            id="user-role"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "7px",
              userSelect: "none",
            }}
          >
            <div>
              <Input
                type="checkbox"
                id="student"
                checked={isStudent}
                onChange={() => setIsStudent(!isStudent)}
              />
              <Label
                for="student"
                className="form-label"
                style={{ padding: "0 7px" }}
              >
                دانشجو
              </Label>
            </div>
            <div>
              <Input
                type="checkbox"
                id="teacher"
                checked={isTeacher}
                onChange={() => setIsTeacher(!isTeacher)}
              />
              <Label
                for="teacher"
                className="form-label"
                style={{ padding: "0 7px" }}
              >
                استاد
              </Label>
            </div>
          </div>
        </div>
        {/* <div
          className="mb-1"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <Label className="form-label" for="select-plan">
            Select Plan
          </Label>
          <Input type="select" id="select-plan" name="select-plan">
            <option value="basic">Basic</option>
            <option value="enterprise">Enterprise</option>
            <option value="company">Company</option>
            <option value="team">Team</option>
          </Input>
        </div> */}
        <Button type="submit" className="me-1" color="primary">
          ایجاد کاربر
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          بازگشت
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
