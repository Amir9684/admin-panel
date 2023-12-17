// ** React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as z from "zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** Third Party Components
import ImageUpload from "../../ui-elements/import";
import { toast } from "react-hot-toast";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormFeedback,
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
    .string({
      required_error: "یک عنوان را بنویسید",
    })
    .min(20, `عنوان باید بیشتر از ${getPersianNumbers(20)} باشد`)
    .max(120, `عنوان باید کمتر از ${getPersianNumbers(120)} باشد`),
  category: z
    .string({
      required_error: "یک دسته بندی را انتخاب کتید",
    })
    .min(1, "یک دسته بندی را انتخاب کتید"),
  miniDescribe: z
    .string({
      required_error: "یک خلاصه را بنویسید",
    })
    .min(10, `توضیح مختصر باید بیشتر از ${getPersianNumbers(10)} باشد`)
    .max(300, `توضیح مختصر باید کمتر از ${getPersianNumbers(20)} باشد`),
  keyword: z
    .string({
      required_error: "کلمه کلیدی را بنویسید",
    })
    .min(10, `کلمات کلیدی باید بیشتر از ${getPersianNumbers(10)} باشد`)
    .max(300, `کلمات کلیدی باید کمتر از ${getPersianNumbers(300)} باشد`),
  describe: z
    .string({
      required_error: "توضیحی  بنویسید",
    })
    .min(70, `توضیحات باید بیشتر از ${getPersianNumbers(70)} باشد`)
    .max(170, `توضیحات باید کمتر از ${getPersianNumbers(170)} باشد`),
});

const BlogEdit = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = form.formState;
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
        title="ویرایش بلاگ"
        data={[{ title: "بلاگ" }, { title: "ویرایش" }]}
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <FormProvider {...form}>
                <Form
                  className="mt-2 d-flex d-flex-row"
                  style={{ width: "100%" }}
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <Row style={{ width: "100%" }}>
                    <Col
                      md="6"
                      className="border mb-2 d-flex flex-column justify-content-center align-items-center gap-2"
                    >
                      <Col sm="12">
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
                        {form.formState.errors.title && (
                          <FormFeedback style={{ fontSize: "16px" }}>
                            {form.formState.errors.title.message}
                          </FormFeedback>
                        )}
                      </Col>
                      <Col sm="12" className="mb-2">
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
                              invalid={form.formState.errors.category && true}
                              {...field}
                            >
                              <option value="">انتخاب...</option>
                              {categories.map((category) => (
                                <option value={category.value}>
                                  {category.label}
                                </option>
                              ))}
                            </Input>
                          )}
                        />
                        {form.formState.errors.category && (
                          <FormFeedback style={{ fontSize: "16px" }}>
                            {form.formState.errors.category.message}
                          </FormFeedback>
                        )}
                      </Col>
                    </Col>
                    <Col className="mb-2" md="6" sm="12">
                      <ImageUpload
                        imgFile={featuredImg}
                        setImgFile={setFeaturedImg}
                      />
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
                      {form.formState.errors.miniDescribe && (
                        <FormFeedback style={{ fontSize: "16px" }}>
                          {form.formState.errors.miniDescribe.message}
                        </FormFeedback>
                      )}
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
                      {form.formState.errors.keyword && (
                        <FormFeedback style={{ fontSize: "16px" }}>
                          {form.formState.errors.keyword.message}
                        </FormFeedback>
                      )}
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
                      {form.formState.errors.describe && (
                        <FormFeedback style={{ fontSize: "16px" }}>
                          {form.formState.errors.describe.message}
                        </FormFeedback>
                      )}
                    </Col>

                    <Col className="mt-50 d-flex justify-content-end">
                      <Button
                        disabled={isSubmitting}
                        color="success"
                        className="me-1"
                        style={{ fontSize: "17px" }}
                      >
                        ایجاد بلاگ
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
