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
import LogoRotate from "../assets/images/PC-logo/logo";

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
      toast.success("با موفقیت وارد شدید", { position: "top-center" });
      setItem("user", obj);
      setItem("token", loginApi.token);
      setItem("id" ,loginApi.id  )
      setTimeout(() => {
        navigate("/");
      }, 700);
    } else if (loginApi.roles.includes("Teacher") === true) {
      toast.success("با موفقیت وارد شدید" , { position: "top-center" });
      setTimeout(() => {
        navigate("/");
      }, 700);
    } else {
      toast.error("مجوز ورود ندارید" , { position: "top-center" });
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <LogoRotate />
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
