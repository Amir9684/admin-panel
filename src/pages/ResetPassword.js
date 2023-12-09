// ** React Imports
import { Link, useNavigate, useParams } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Button } from "reactstrap";

import InputPasswordToggle from "@components/input-password-toggle";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  resetConfirmValue,
  resetPasswordAPI,
} from "../services/api/auth";

import style from "../style/auth.module.css";

const formSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
      .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
    confirmPassword: z
      .string()
      .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
      .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "باید با رمز عبور یکسان باشد",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  // ** Hooks
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { ref: passwordRef, ...registerPassword } = register("password");
  const { ref: confirmPasswordRef , ...registerConfirmPassword } = register("confirmPassword");

  const { id } = useParams();

  const [apiData, setApiData] = useState({});

  const confirmValue = async () => {
    await resetConfirmValue(id).then((res) => {
      setApiData({
        userId: res.id,
        resetValue: res.message,
      });
      console.log(res);
    });
  };
  useEffect(() => {
    confirmValue();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const obj = {
      userId: apiData.userId,
      newPassword: values.password,
      resetValue: apiData.resetValue,
    };

    const resetPassApi = await  resetPasswordAPI(obj);
    console.log(resetPassApi , values);

    if (resetPassApi.success === true) {
      toast.success(resetPassApi.message);
      setTimeout(() => {
        navigate("/login")
      } , 700)
    } else {
        toast.error("مشکلی پیش آمده، دوباره امتحان کنید")
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
              بازنشانی رمز عبور🔒
            </CardTitle>
            <CardText className="mb-2" style={{ direction: "rtl" }}>
              رمز عبور جدید خود را وارد کنید، رمز عبور باید شامل حروف بزرگ و
              کوچیک و اعداد باشد
            </CardText>

            <Form
              className="auth-forgot-password-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="password">
                  رمز عبور
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="password"
                  innerRef={passwordRef}
                  {...registerPassword}
                  style={
                    errors.password && { border: "1px solid rgb(255, 50, 50)" }
                  }
                />
                <div className={style.error}> {errors.password?.message} </div>
              </div>

              <div className="mb-1">
                <Label className="form-label" for="confirmPassword">
                  رمز عبور
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="confirmPassword"
                  innerRef={confirmPasswordRef}
                  {...registerConfirmPassword}
                  style={
                    errors.confirmPassword && { border: "1px solid rgb(255, 50, 50)" }
                  }
                />
                <div className={style.error}> {errors.confirmPassword?.message} </div>
              </div>

              <Button color="primary" block type="submit">
                ثبت اطلاعات
              </Button>
            </Form>

            <p className="text-center mt-2">
              <Link to="/login">
                <ChevronLeft className="rotate-rtl me-25" size={14} />
                <span className="align-middle">بازگشت به صفحه ورود</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
