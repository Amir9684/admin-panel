// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/verify-email-illustration.svg";
import illustrationsDark from "@src/assets/images/pages/verify-email-illustration-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAPI } from "../services/api/auth";
import { useState } from "react";
import toast from "react-hot-toast";

import style from "../style/auth.module.css";
import { setItem } from "../services/common/storage.services";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "ایمیل نامعتبر" })
    .min(1, { message: "ایمیل خود را وارد کنید" }),
  password: z
    .string()
    .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
    .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
});

const Login = () => {
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { ref: emailRef, ...registerEmail } = register("email");
  const { ref: passwordRef, ...registerPassword } = register("password");

  const [isCheck, setIsCheck] = useState(false);
  const handleCheckBox = () => {
    setIsCheck(!isCheck);
  };

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const obj = {
      phoneOrGmail: values.email,
      password: values.password,
      rememberMe: isCheck,
    };
    const loginApi = await loginAPI(obj);

    if (loginApi.roles.includes("Administrator") === true) {
      toast.success("با موفقیت وارد شدید");
      setItem("user", obj);
      setItem("token", loginApi.token);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else if (loginApi.roles.includes("Teacher") === true) {
      toast.success("با موفقیت وارد شدید");
      setTimeout(() => {
        navigate("/");
      }, 700);
    } else {
      toast.error("مجوز ورود ندارید");
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">PendingCoding</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle
              tag="h2"
              className="fw-bold mb-1"
              style={{ direction: "rtl" }}
            >
              به پندینگ کدینگ خوش آمدید 👋
            </CardTitle>
            <CardText className="mb-2" style={{ direction: "rtl" }}>
              لطفا وارد حساب کاربری خود شوید
            </CardText>

            <Form
              // style={{border: "1px solid red"}}
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  پست الکترونیکی
                </Label>
                <Input
                  name="email"
                  type="email"
                  id="login-email"
                  placeholder="PendingCoding@gmail.com"
                  autoFocus
                  innerRef={emailRef}
                  {...registerEmail}
                  style={
                    errors.email && { border: "1px solid rgb(255, 50, 50)" }
                  }
                />
                <div className={style.error}> {errors.email?.message} </div>
              </div>

              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    رمز عبور
                  </Label>
                  <Link to="/forgot-password">
                    <small>رمز عبور خود را فراموش کردید ؟</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  innerRef={passwordRef}
                  {...registerPassword}
                  style={
                    errors.email && { border: "1px solid rgb(255, 50, 50)" }
                  }
                />
                <div className={style.error}> {errors.password?.message} </div>
              </div>
              <div className="form-check mb-1">
                <Input
                  type="checkbox"
                  id="remember-me"
                  checked={isCheck}
                  onChange={handleCheckBox}
                />
                <Label className="form-check-label" for="remember-me">
                  مرا به خاطر بسپار
                </Label>
              </div>
              <Button color="primary" block type="submit">
                ورود
              </Button>
            </Form>

            {/* <p className="text-center mt-2">
              <span className="me-25">حساب کاربری ندارید ؟ </span>
              <Link to="/register">
                <span>یک حساب ایجاد کنید </span>
              </Link>
            </p> */}

            <div className="divider my-2">
              <div className="divider-text" style={{ marginTop: "3px" }}>
                PendingCoding
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
