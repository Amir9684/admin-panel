// ** React Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

const BlogEdit = () => {
  const { id } = useParams();
  // ** States
  // { value: "خبر ‌های اقتصادی", label: "خبر ‌های اقتصادی" },
  const [data, setData] = useState(null),
    [title, setTitle] = useState(""),
    // [slideNumber, setSlideNumber] = useState(0),
    [miniDescribe, setMiniDescribe] = useState(""),
    [status, setStatus] = useState(""),
    [describe, setDescribe] = useState(""),
    [blogCategories, setBlogCategories] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState("banner.jpg"),
    [categories, setCategories] = useState([]),
    [avatar, setAvatar] = useState(null);

  useEffect(() => {
    apiCall(`/News/${id}`).then((res) => {
      setData(res.detailsNewsDto);
      setTitle(res.detailsNewsDto.title);
      setMiniDescribe(res.detailsNewsDto.miniDescribe);
      setDescribe(res.detailsNewsDto.describe);
      setBlogCategories({
        value: res.detailsNewsDto.newsCatregoryName,
        label: res.detailsNewsDto.newsCatregoryName,
      });
      setFeaturedImg(
        res.detailsNewsDto.currentImageAddress ||
          res.detailsNewsDto.currentImageAddressTumb
      );
      setStatus(res.detailsNewsDto.active);

      apiCall("/Home/GetTeachers").then((teachers) => {
        const teacher = teachers.filter(
          (teacher) => teacher.fullName === res.detailsNewsDto.addUserFullName
        );

        setAvatar(teacher[0].pictureAddress);
      });
    });
    apiCall("/News/GetListNewsCategory").then((res) => {
      const newArray = [];
      res.map((item) =>
        newArray.push({ value: item.categoryName, label: item.categoryName })
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
  console.log(blogCategories);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const obj = {
        title,
        miniDescribe,
        isActive: status === "true" || status === true,
        describe,
        blogCategories,
        imgPath,
      };
      console.log(obj);
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
                <Form className="mt-2" onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-title">
                        عنوان
                      </Label>
                      <Input
                        id="blog-edit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-category">
                        موضوع
                      </Label>
                      <Select
                        id="blog-edit-category"
                        isClearable={false}
                        theme={selectThemeColors}
                        value={blogCategories}
                        placeholder="انتخاب ..."
                        isMulti
                        name="colors"
                        options={categories}
                        className="react-select"
                        classNamePrefix="select"
                        onChange={(data) => setBlogCategories(data)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-slug">
                        توضیح مختصر
                      </Label>
                      <Input
                        id="blog-edit-slug"
                        value={miniDescribe}
                        onChange={(e) => setMiniDescribe(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-status">
                        وضعیت
                      </Label>
                      <Input
                        type="select"
                        id="blog-edit-status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="true">فعال</option>
                        <option value="false">غیرفعال</option>
                      </Input>
                    </Col>
                    <Col sm="12" className="mb-2">
                      <Label className="form-label">توضیحات</Label>
                      <Input
                        type="textarea"
                        id="blog-edit-cotent"
                        value={describe}
                        onChange={(e) => setDescribe(e.target.value)}
                        style={{ height: "400px" }}
                      />
                    </Col>
                    <Col className="mb-2" sm="12">
                      <div className="border rounded p-2">
                        <h4 className="mb-1">تضویر بلاگ</h4>
                        <div className="d-flex flex-column flex-md-row">
                          <img
                            className="rounded me-2 mb-1 mb-md-0"
                            src={featuredImg}
                            alt="featured img"
                            width="170"
                            height="110"
                          />
                          <div>
                            <small className="text-muted">
                              وضوح تصویر باید 800x400 و حجم آن کمتر از 10
                              مگابایت باشد.
                            </small>

                            {/* <p className="my-50">
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                {`C:/fakepath/${imgPath}`}
                              </a>
                            </p> */}
                            <div className="d-inline-block">
                              <div className="mb-0">
                                <Input
                                  type="file"
                                  id="exampleCustomFileBrowser"
                                  name="customFile"
                                  onChange={onChange}
                                  accept=".jpg, .png, .gif"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className="mt-50">
                      <Button color="primary" className="me-1">
                        ذخیره
                      </Button>
                      <Button color="secondary" outline>
                        لغو
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default BlogEdit;
