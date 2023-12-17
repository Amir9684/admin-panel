// ** React Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// ** Third Party Components
import { toast } from "react-hot-toast";
// ** Custom Components
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";
import ImageUpload from "../../ui-elements/import";

// ** Utils

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

import { useDispatch } from "react-redux";

import { apiCall } from "../../../services/interceptor/api-call";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";
import { activeNews, deActiveNews } from "../../../redux/news";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import { Loading } from "../../ui-elements/loading";

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
    .min(70, `توضیحات باید بیشتر از ${getPersianNumbers(70)} باشد`),
});

const BlogEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ** States
  const [data, setData] = useState(null),
    [title, setTitle] = useState(""),
    [miniDescribe, setMiniDescribe] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [describe, setDescribe] = useState(""),
    [keyword, setKeyword] = useState(""),
    [imgFile, setImgFile] = useState(""),
    [categories, setCategories] = useState([]),
    [avatar, setAvatar] = useState(null);

  const form = useForm({
    defaultValues: {
      title: data?.title,
      category: data?.newsCatregoryId,
      miniDescribe: data?.miniDescribe,
      keyword: data?.keyword,
      describe: data?.describe,
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const getInfos = async () => {
        await apiCall(`/News/${id}`).then((res) => {
          setData(res.detailsNewsDto);
          setTitle(res.detailsNewsDto.title);
          setMiniDescribe(res.detailsNewsDto.miniDescribe);
          setDescribe(res.detailsNewsDto.describe);
          setImgFile(
            res.detailsNewsDto.currentImageAddress ||
              res.detailsNewsDto.currentImageAddressTumb
          );
          setKeyword(res.detailsNewsDto.keyword);

          apiCall("/Home/GetTeachers").then((teachers) => {
            const teacher = teachers.filter(
              (teacher) =>
                teacher.fullName === res.detailsNewsDto.addUserFullName
            );

            setAvatar(teacher[0].pictureAddress);
          });
        });
        await apiCall("/News/GetListNewsCategory").then((res) => {
          const newArray = [];
          res.map((item) =>
            newArray.push({
              value: item.id,
              label: item.categoryName,
            })
          );
          setCategories(newArray);
        });
      };
      getInfos().then(() => setIsLoading(false));
    }
  }, []);

  const insertDate = new Date(data?.insertDate)
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

  const onSubmit = async (values) => {
    let toaster;
    let picture = null;
    try {
      if (imgFile !== data.currentImageAddress) {
        toaster = toast.loading("در حال آپلود عکس");

        const formData = new FormData();
        formData.append("NewsId", id);
        formData.append("Files", imgFile);
        formData.append("rootPath", "");
        await apiCall
          .post("/News/CreateNewsFile", formData)
          .then(async (res) => {
            if (res.success)
              await apiCall(`/News/${id}`).then((respond) => {
                picture =
                  respond.detailsNewsDto.currentImageAddress ||
                  respond.detailsNewsDto.currentImageAddressTumb;
                toast.remove(toaster);
              });
            else toast.remove(toaster);
          });
      }

      const obj = {
        Id: id,
        SlideNumber: 1,
        CurrentImageAddress: picture,
        CurrentImageAddressTumb: picture,
        Image: picture,
        Active: data.active,
        Title: values.title,
        GoogleTitle: (values.title + values.title).slice(0, 45),
        GoogleDescribe: values.describe.slice(0, 80),
        MiniDescribe: values.miniDescribe,
        Describe: values.describe,
        Keyword: values.keyword,
        IsSlider: data.isSlider,
        NewsCatregoryId: values.category,
      };
      console.log(obj);
      toaster = toast.loading("درحال بروزرسانی");
      const formData = new FormData();
      for (const item in obj) formData.append(item, obj[item]);
      await apiCall.put("/News/UpdateNews", formData).then((res) => {
        toast.remove(toaster);
        if (res.success) toast.success("بلاگ بروزرسانی شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    }
  };

  const handleActiveness = async () => {
    try {
      setIsLoading(true);
      if (data.active) {
        dispatch(deActiveNews(data));
        navigate("/news");
      } else {
        dispatch(activeNews(data));
        navigate("/news");
      }
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title="ویرایش بلاگ"
        data={[{ title: "بلاگ" }, { title: "ویرایش" }]}
      />
      {data !== null ? (
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div>
                    <Avatar
                      className="me-75"
                      img={avatar}
                      imgWidth="38"
                      imgHeight="38"
                    />
                  </div>
                  <div>
                    <h6 className="mb-25">{data?.addUserFullName}</h6>
                    <CardText>
                      {`${getPersianNumbers(insertDate?.[2], true)} ${
                        months[insertDate?.[1] - 1]
                      } ${getPersianNumbers(insertDate?.[0], true)}`}
                    </CardText>
                  </div>
                </div>
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
                            defaultValue={title}
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
                            <FormFeedback>
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
                            defaultValue={String(data?.newsCatregoryId)}
                            render={({ field }) => (
                              <Input
                                autoFocus
                                type="select"
                                invalid={form.formState.errors.category && true}
                                {...field}
                              >
                                <option value={data.newsCatregoryId}>
                                  {data.newsCatregoryName}
                                </option>
                                {categories
                                  .filter(
                                    (category) =>
                                      category.value !== data.newsCatregoryId
                                  )
                                  .map((category) => (
                                    <option value={category.value}>
                                      {category.label}
                                    </option>
                                  ))}
                              </Input>
                            )}
                          />
                          {form.formState.errors.category && (
                            <FormFeedback>
                              {form.formState.errors.category.message}
                            </FormFeedback>
                          )}
                        </Col>
                      </Col>
                      <Col className="mb-2" md="6" sm="12">
                        <ImageUpload
                          imgFile={imgFile}
                          setImgFile={setImgFile}
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
                          defaultValue={miniDescribe}
                          control={form.control}
                          render={({ field }) => (
                            <Input
                              autoFocus
                              type="text"
                              placeholder="توضیح مختصر...."
                              invalid={
                                form.formState.errors.miniDescribe && true
                              }
                              {...field}
                            />
                          )}
                        />
                        {form.formState.errors.miniDescribe && (
                          <FormFeedback>
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
                          defaultValue={keyword}
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
                          <FormFeedback>
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
                          defaultValue={describe}
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
                          <FormFeedback>
                            {form.formState.errors.describe.message}
                          </FormFeedback>
                        )}
                      </Col>

                      <Col className="mt-50 d-flex justify-content-between">
                        <Button
                          disabled={isSubmitting}
                          color={data.active ? "danger" : "success"}
                          className="me-1"
                          style={{ fontSize: "17px" }}
                          type="button"
                          onClick={handleActiveness}
                        >
                          {data.active ? "غیرفعال" : "فعال"}
                        </Button>
                        <Button
                          disabled={isSubmitting || !isValid}
                          color="primary"
                          className="me-1"
                          style={{ fontSize: "17px" }}
                        >
                          ویرایش
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </FormProvider>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default BlogEdit;
