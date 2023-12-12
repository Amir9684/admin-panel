// ** React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as z from "zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** Third Party Components
import Select from "react-select";
import { toast } from "react-hot-toast";
// ** Custom Components
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import { apiCall } from "../../../services/interceptor/api-call";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

const formSchema = z.object({
  title: z
    .string()
    .min(20, `عنوان باید بیشتر از ${getPersianNumbers(20)} باشد`)
    .max(120, `عنوان باید کمتر از ${getPersianNumbers(120)} باشد`),
  category: z.string().min(1, "یک دسته بندی را انتخاب کتید"),
  miniDescribe: z
    .string()
    .min(10, `توضیح مختصر باید بیشتر از ${getPersianNumbers(10)} باشد`)
    .max(300, `توضیح مختصر باید کمتر از ${getPersianNumbers(20)} باشد`),
  keyword: z
    .string()
    .min(10, `کلمات کلیدی باید بیشتر از ${getPersianNumbers(10)} باشد`)
    .max(300, `کلمات کلیدی باید کمتر از ${getPersianNumbers(300)} باشد`),
  describe: z
    .string()
    .min(70, `توضیحات باید بیشتر از ${getPersianNumbers(70)} باشد`)
    .max(170, `توضیحات باید کمتر از ${getPersianNumbers(170)} باشد`),
  image: z.string().min(1, "image is required"),
});

const BlogEdit = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  // ** States
  // { value: "خبر ‌های اقتصادی", label: "خبر ‌های اقتصادی" },
  const [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState(""),
    [categories, setCategories] = useState([]);

  useEffect(() => {
    apiCall("/News/GetListNewsCategory").then((res) => {
      const newArray = [];
      res.map((item) =>
        newArray.push({ value: item.id, label: item.categoryName })
      );
      setCategories(newArray);
    });
  }, []);
  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    setImgPath(files[0].name);
    reader.onload = function () {
      setFeaturedImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  console.log(featuredImg);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      if (featuredImg) {
        const formData = new FormData();
        formData.append("NewsId", id);
        formData.append("Files", `${imgPath},${imgPath}`);
        formData.append("rootPath", imgPath);
        await apiCall.post("/News/CreateNewsFile", formData);
      }
      const obj = {
        Title: values.title,
        GoogleTitle: (values.title + values.title).slice(0, 45),
        GoogleDescribe: values.describe.slice(0, 80),
        MiniDescribe: values.miniDescribe,
        Describe: values.describe,
        Keyword: values.keyword,
        IsSlider: false,
        NewsCatregoryId: Number(values.category),
        Image: imgPath,
      };
      const formData = new FormData();
      for (const item in obj) formData.append(item, obj[item]);
      await apiCall.post("/News/CreateNews", formData).then((res) => {
        if (res.success) {
          toast.success("بلاگ ایجاد شد");
          navigate("/news");
        } else toast.error(res.message);
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    }
  };

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title="افزودن بلاگ"
        data={[{ title: "بلاگ" }, { title: "افزودن" }]}
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <FormProvider {...form}>
                <Form
                  className="mt-2 d-flex d-flex-row"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <Row>
                    <Col lg="3" md="5" className="mb-2 align-self-end">
                      <Label
                        className="form-label"
                        htmlFor="title"
                        style={{ fontSize: "17px" }}
                      >
                        عنوان
                      </Label>
                      <Controller
                        id="title"
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            autoFocus
                            type="text"
                            placeholder="عنوان..."
                            invalid={form.formState.errors.title && true}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col lg="2" md="5" className="mb-2 align-self-end">
                      <Label
                        className="form-label"
                        htmlFor="category"
                        style={{ fontSize: "17px" }}
                      >
                        دسته بندی
                      </Label>
                      <Controller
                        id="category"
                        name="category"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            autoFocus
                            type="select"
                            placeholder="john@example.com"
                            invalid={form.formState.errors.category && true}
                            {...field}
                          >
                            <option value="">انتخاب</option>
                            {categories.map((category) => (
                              <option value={category.value}>
                                {category.label}
                              </option>
                            ))}
                          </Input>
                        )}
                      />
                    </Col>
                    <Col className="mb-2" md="7" sm="12">
                      <div className="rounded d-flex flex-column">
                        <div
                          className="d-flex flex-column align-items-center justify-content-center gap-2"
                          style={{ position: "relative" }}
                        >
                          <img
                            className="rounded"
                            src={featuredImg}
                            style={{
                              width: "300px",
                              height: "220px",
                              objectFit: "cover",
                            }}
                            alt="featured img"
                          />
                          {/* <p className="my-50">
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                {`C:/fakepath/${imgPath}`}
                              </a>
                            </p> */}
                          <div
                            className="justify-content-center"
                            style={{ position: "absolute", bottom: "0" }}
                          >
                            <div className="mb-0">
                              <Controller
                                id="image"
                                name="image"
                                control={form.control}
                                render={({ field }) => (
                                  <Input
                                    type="file"
                                    onChange={onChange}
                                    accept=".jpg, .png, .gif"
                                    placeholder="انتخاب تصویر"
                                    {...field}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label
                        className="form-label"
                        htmlFor="miniDescribe"
                        style={{ fontSize: "17px" }}
                      >
                        توضیح مختصر
                      </Label>
                      <Controller
                        id="miniDescribe"
                        name="miniDescribe"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            autoFocus
                            type="text"
                            placeholder="توضیح مختصر...."
                            invalid={form.formState.errors.miniDescribe && true}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label
                        className="form-label"
                        htmlFor="keyword"
                        style={{ fontSize: "17px" }}
                      >
                        کلمات کلیدی
                      </Label>
                      <Controller
                        id="keyword"
                        name="keyword"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            autoFocus
                            type="text"
                            placeholder="کلمات کلیدی...."
                            invalid={form.formState.errors.keyword && true}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col sm="12" className="mb-2">
                      <Label
                        className="form-label"
                        htmlFor="describe"
                        style={{ fontSize: "17px" }}
                      >
                        توضیحات
                      </Label>
                      <Controller
                        id="describe"
                        name="describe"
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            autoFocus
                            type="textarea"
                            style={{ height: "400px" }}
                            placeholder="توضیحات...."
                            invalid={form.formState.errors.describe && true}
                            {...field}
                          />
                        )}
                      />
                    </Col>

                    <Col className="mt-50 d-flex justify-content-end">
                      <Button
                        color="primary"
                        className="me-1"
                        style={{ fontSize: "17px" }}
                      >
                        ایجاد
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </FormProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogEdit;
