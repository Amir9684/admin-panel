// ** React Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "jalali-moment";

// ** Third Party Components
import { toast } from "react-hot-toast";

// ** Custom Components
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";
import ImageUpload from "../../ui-elements/import";

import TabPillsContainer from "../add/steps-with-validation/tabs/TabPillsContainer";
import DateRangePicker from "../add/steps-with-validation/DateRangePicker";

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
  FormFeedback,
} from "reactstrap";
import { useDispatch } from "react-redux";

import { Loading } from "../../ui-elements/loading";
import { apiCall } from "../../../services/interceptor/api-call";
import { getPersianNumbers } from "../../../utility/get-persian-numbers";

import { activeCourse, deActiveCourse } from "../../../redux/courses";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان را وارد کنید")
    .max(30, `"عنوان دوره حداکثر ${getPersianNumbers(30)} کلمه باشد"`),

  capacity: z.coerce
    .number("ظرفیت را وارد کنید")
    .int("ظرفیت باید مثبت باشد")
    .refine(
      (data) => Number(data) > 20 && Number(data) < 100,
      `ظرفیت باید بیشتر از ${getPersianNumbers(20)} باشد`
    ),
  cost: z.coerce
    .number({
      required_error: "قیمت را وارد کنید",
    })
    .int("قیمت باید مثبت باشد")
    .refine(
      (data) => Number(data) > 500000,
      `قیمت باید بیشتر از ${getPersianNumbers(500000)} باشد`
    ),
  sessionNumber: z
    .string()
    .min(1, "تعداد جلسات را وارد کنید")
    .refine(
      (data) => Number(data) > 3,
      `تعداد جلسات باید بیشتر از ${getPersianNumbers(3)} باشد`
    ),
});

const CourseEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ** States
  const [data, setData] = useState(null),
    [course, setCourse] = useState(null),
    [title, setTitle] = useState(""),
    [tabs, setTabs] = useState(null),
    [cost, setCost] = useState(0),
    [sessionNumber, setSessionNumber] = useState(5),
    [imgFile, setImgFile] = useState(""),
    [dateRange, setDateRange] = useState(null),
    [validDate, setValidDate] = useState(true),
    [avatar, setAvatar] = useState(null),
    [typeId, setTypeId] = useState(0),
    [termId, setTermId] = useState(0),
    [classId, setClassId] = useState(0),
    [courseLvlId, setCourseLvlId] = useState(0),
    [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: data?.title,
      capacity: course?.capacity,
      sessionNumber,
      cost: data?.cost,
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const getInfos = async () => {
        await apiCall(`/Course/${id}`).then(async (res) => {
          await apiCall("/Home/GetCourseDetails", {
            params: { CourseId: id },
          }).then((response) => setCourse(response));
          setData(res);
          setTitle(res.title);
          setTabs(JSON.parse(res.describe));
          setImgFile(res.imageAddress);
          setCost(res.cost);
          const sNumbers = JSON.parse(res.describe).reduce((acc, current) => {
            return (acc += current.videos.length);
          }, 0);
          setSessionNumber(sNumbers);
          let from = moment(res.startTime)
            .locale("fa")
            .format("YYYY-MM-DD")
            .split("-");
          let to = moment(res.endTime)
            .locale("fa")
            .format("YYYY-MM-DD")
            .split("-");
          from = {
            year: Number(from[0]),
            month: Number(from[1]),
            day: Number(from[2]),
          };
          to = {
            year: Number(to[0]),
            month: Number(to[1]),
            day: Number(to[2]),
          };
          setDateRange({ startDate: from, endDate: to });
          await apiCall("/Home/GetTeachers").then((teachers) => {
            const teacher = teachers.filter(
              (teacher) => teacher.teacherId === res.teacherId
            );

            setAvatar(teacher[0].pictureAddress);
          });
          await apiCall("/Course/GetCreate").then((response) => {
            const currentType = response.courseTypeDtos.find(
              (type) => type.typeName === res.courseTypeName
            );
            const currentCourseLvl = response.courseLevelDtos.find(
              (lvl) => lvl.levelName === res.courseLevelName
            );
            const currentClassRoom = response.classRoomDtos.find(
              (cr) => cr.classRoomName === res.courseClassRoomName
            );
            setTypeId(currentType?.id);
            setCourseLvlId(currentCourseLvl?.id);
            setClassId(currentClassRoom?.id);
            setTermId(response.termDtos?.[0].id);
          });
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
    try {
      if (imgFile !== data.imageAddress) {
        toaster = toast.loading("در حال آپلود عکس");
        const formData = new FormData();
        formData.append("CourseId", id);
        formData.append("Image", imgFile);
        await apiCall
          .post("/Course/SetNewImageForCourse", formData)
          .then(async (respond) => {
            if (respond.success)
              await apiCall(`/Course/${id}`).then((res) => {
                if (res.success) setImgFile(data.imageAddress);
                toast.remove(toaster);
              });
            else toast.remove(toaster);
          });
      }
      const obj = {
        Id: id,
        Title: values.title,
        Describe: JSON.stringify(tabs),
        MiniDescribe: course.miniDescribe,
        Capacity: values.capacity,
        CourseTypeId: typeId,
        SessionNumber: values.sessionNumber,
        CurrentCoursePaymentNumber: cost,
        TremId: termId,
        ClassId: classId,
        CourseLvlId: courseLvlId,
        TeacherId: data.teacherId,
        Cost: values.cost,
        UniqeUrlString: `localhost:5173/${Math.ceil(Math.random() * 10000)}`,
        StartTime: moment
          .from(
            `${dateRange.startDate.year}-${dateRange.startDate.month}-${dateRange.startDate.day}`,
            "fa",
            "YYYY-MM-DD"
          )
          .format("YYYY-MM-DDTHH:mm:ssZ"),
        EndTime: moment
          .from(
            `${dateRange.endDate.year}-${dateRange.endDate.month}-${dateRange.endDate.day}`,
            "fa",
            "YYYY-MM-DD"
          )
          .format("YYYY-MM-DDTHH:mm:ssZ"),
        GoogleTitle: course.googleTitle,
        GoogleDescribe: course.googleSchema,
        CoursePrerequisiteId: "6c0a12ea-6a73-ee11-b6c7-ca6d3e095898",
        ShortLink: `www.${values.title}.com`,
        Image: imgFile,
        ImageAddress: imgFile,
        TumbImageAddress: imgFile,
      };
      toaster = toast.loading("درحال بروزرسانی");
      const formData = new FormData();
      for (const item in obj) formData.append(item, obj[item]);
      await apiCall.put("/Course", formData).then((res) => {
        toast.remove(toaster);
        if (res.success) toast.success("بلاگ بروزرسانی شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
      toast.remove(toaster);
    }
  };

  const handleActiveness = async () => {
    try {
      setIsLoading(true);
      if (data.isActive) {
        dispatch(deActiveCourse(data));
        navigate("/course-management");
      } else {
        dispatch(activeCourse(data));
        navigate("/course-management");
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
      {data && course ? (
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
                    <h6 className="mb-25">{`مدرس: ${data?.teacherName}`}</h6>
                    <CardText>
                      {`${getPersianNumbers(insertDate?.[2], true)} ${
                        months[insertDate?.[1] - 1]
                      } ${getPersianNumbers(insertDate?.[0], true)}`}
                    </CardText>
                  </div>
                </div>
                <Form
                  className="mt-2 d-flex d-flex-row"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Row>
                    {/* <Col
                        lg="3"
                        md="6"
                        className="mb-2 align-self-center"
                      ></Col> */}
                    <Col
                      lg="6"
                      md="10"
                      className="mb-2 d-flex flex-row justify-content-center align-items-start gap-3 border"
                      style={{ paddingTop: "25px" }}
                    >
                      <Col className="d-flex flex-column justify-center align-items-start gap-2">
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
                            control={control}
                            render={({ field }) => (
                              <Input
                                autoFocus
                                type="text"
                                placeholder="عنوان..."
                                invalid={errors.title && true}
                                {...field}
                              />
                            )}
                          />
                        </Col>
                        <Col sm="12">
                          <Label
                            className="form-label"
                            for="capacity"
                            style={{ fontSize: "17px" }}
                          >
                            ظرفیت
                          </Label>
                          <Controller
                            id="capacity"
                            name="capacity"
                            control={control}
                            defaultValue={course?.capacity}
                            render={({ field }) => (
                              <Input
                                type="number"
                                invalid={errors.capacity && true}
                                {...field}
                              />
                            )}
                          />
                          {errors.capacity && (
                            <FormFeedback>
                              {errors.capacity.message}
                            </FormFeedback>
                          )}
                        </Col>
                        <Col sm="12">
                          <Label
                            className="form-label"
                            for="startDate"
                            style={{ fontSize: "17px" }}
                          >
                            تاریخ شروع و پایان
                          </Label>
                          <DateRangePicker
                            setValidDate={setValidDate}
                            setDateRange={setDateRange}
                          />
                          <p
                            style={{ textAlign: "center", marginTop: "10px" }}
                          >{`${getPersianNumbers(
                            Number(dateRange.startDate?.year),
                            true
                          )}/${getPersianNumbers(
                            Number(dateRange.startDate?.month),
                            true
                          )}/${getPersianNumbers(
                            Number(dateRange.startDate?.day),
                            true
                          )} - ${getPersianNumbers(
                            Number(dateRange.endDate?.year),
                            true
                          )}/${getPersianNumbers(
                            Number(dateRange.endDate?.month),
                            true
                          )}/${getPersianNumbers(
                            Number(dateRange.endDate?.day),
                            true
                          )}`}</p>
                        </Col>
                      </Col>
                      <Col className="d-flex flex-column justify-center align-items-start gap-2">
                        <Col sm="12">
                          <Label
                            className="form-label"
                            for="cost"
                            style={{ fontSize: "17px" }}
                          >
                            قیمت
                          </Label>
                          <Controller
                            id="cost"
                            name="cost"
                            control={control}
                            defaultValue={course?.cost}
                            render={({ field }) => (
                              <Input
                                type="number"
                                invalid={errors.cost && true}
                                {...field}
                              />
                            )}
                          />
                          {errors.cost && (
                            <FormFeedback>{errors.cost.message}</FormFeedback>
                          )}
                        </Col>
                        <Col sm="12">
                          <Label
                            className="form-label"
                            for="sessionNumber"
                            style={{ fontSize: "17px" }}
                          >
                            تعداد جلسات
                          </Label>
                          <Controller
                            id="sessionNumber"
                            name="sessionNumber"
                            control={control}
                            defaultValue={sessionNumber}
                            render={({ field }) => (
                              <Input
                                invalid={errors.sessionNumber && true}
                                {...field}
                              />
                            )}
                          />
                          {errors.sessionNumber && (
                            <FormFeedback>
                              {errors.sessionNumber.message}
                            </FormFeedback>
                          )}
                        </Col>
                      </Col>
                    </Col>
                    <Col className="mb-2 " md="6" sm="12">
                      <ImageUpload imgFile={imgFile} setImgFile={setImgFile} />
                    </Col>

                    <Col sm="12" className="mb-2">
                      <TabPillsContainer tabs={tabs} setTabs={setTabs} />
                    </Col>

                    <Col className="mt-50 d-flex justify-content-between">
                      <Button
                        disabled={isSubmitting}
                        color={data.isActive ? "danger" : "success"}
                        className="me-1"
                        style={{ fontSize: "17px" }}
                        type="button"
                        onClick={handleActiveness}
                      >
                        {data.isActive ? "غیرفعال" : "فعال"}
                      </Button>
                      <Button
                        disabled={isSubmitting || !validDate}
                        color="primary"
                        className="me-1"
                        style={{ fontSize: "17px" }}
                      >
                        ویرایش
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

export default CourseEdit;
