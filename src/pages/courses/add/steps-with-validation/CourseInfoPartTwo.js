// ** React Imports
import { Fragment, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

// ** Third Party Components
import { ArrowLeft, Slack } from "react-feather";
// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

import {
  getItem,
  removeItem,
} from "../../../../services/common/storage.services";
import { apiCall } from "../../../../services/interceptor/api-call";
import TabPillsContainer from "./tabs/TabPillsContainer";

const defaultValues = {
  CourseLvlId: "",
  CourseTypeId: "",
  // CourseStatus: "",
  ClassId: "",
  TremId: "",
};

const formSchema = z.object({
  CourseLvlId: z
    .string({
      required_error: "یک سطح را انتخاب کتید",
    })
    .min(1, "یک سطح را انتخاب کتید"),
  CourseTypeId: z
    .string({
      required_error: "نوع دوره را انتخاب کتید",
    })
    .min(1, "نوع دوره را انتخاب کتید"),
  // CourseStatus: z
  //   .string({
  //     required_error: "وضعیت دوره را مشخص کتید",
  //   })
  //   .min(1, "وضعیت دوره را مشخص کتید"),
  ClassId: z
    .string({
      required_error: "یک کلاس برای دوره انتخاب کتید",
    })
    .min(1, "یک کلاس برای دوره انتخاب کتید"),
  TremId: z
    .string({
      required_error: "ترم برگذاری دوره را انتخاب کتید",
    })
    .min(1, "ترم برگذاری دوره را انتخاب کتید"),
});

const CourseInfoPartTwo = ({ stepper, options }) => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([
    {
      name: "",
      videos: [{ title: "", videoLink: "" }],
      isActive: true,
    },
    // Add more outer tabs as needed
  ]);

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: zodResolver(formSchema) });

  const onSubmit = async (values) => {
    let toaster 
    const createCourseDatas = getItem("create_course");
    const formData = new FormData();
    for (const item in createCourseDatas.courseDatas)
      formData.append(item, createCourseDatas.courseDatas[item]);
    for (const item in values) formData.append(item, values[item]);
    formData.append("CurrentCoursePaymentNumber", 0);
    formData.append("TeacherId", createCourseDatas.teacherId);
    formData.append(
      "UniqeUrlString",
      `localhost:5173/${Math.ceil(Math.random() * 1000)}`
    );
    formData.append("Image", "");
    formData.append("GoogleSchema", createCourseDatas.fullName);
    formData.append("GoogleTitle", createCourseDatas.courseDatas.Title);
    formData.append(
      "CoursePrerequisiteId",
      "6c0a12ea-6a73-ee11-b6c7-ca6d3e095898"
    );
    formData.append(
      "ShortLink",
      `www.${createCourseDatas.courseDatas.Title}.com`
    );
    formData.append("TumbImageAddress", "");
    formData.append("ImageAddress", "");
    formData.append("Describe", JSON.stringify(tabs));
    toaster = toast.loading("در حال ایجاد دوره")
    await apiCall.post("/Course", formData).then(async (res) => {
      if (res.success) {
        const body = [{ techId: createCourseDatas.id }];
        await apiCall
          .post(`/Course/AddCourseTechnology?courseId=${res.id}`, body)
          .then((response) => {
            if (response.success) {
              toast.remove(toaster)
              toast.success("دوره با موفقیت ایجاد شد");
              navigate("/course-management");
              removeItem("create_course");
            } else toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
          });
      } else toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    });
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-1" style={{ fontSize: "19px" }}>
          ادامه اطلاعات دوره
        </h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label
              className="form-label"
              htmlFor="CourseLvlId"
              style={{ fontSize: "17px" }}
            >
              سطح
            </Label>
            <Controller
              id="CourseLvlId"
              name="CourseLvlId"
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "16px" }}
                  autoFocus
                  type="select"
                  invalid={errors.CourseLvlId && true}
                  {...field}
                >
                  <option value="">انتخاب...</option>
                  {options.courseLevel?.map((level) => (
                    <option
                      key={level.id}
                      value={level.id}
                      style={{ fontSize: "17px" }}
                    >
                      {level.levelName}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors.CourseLvlId && (
              <FormFeedback style={{ fontSize: "15px" }}>
                {errors.CourseLvlId.message}
              </FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label
              className="form-label"
              htmlFor="CourseTypeId"
              style={{ fontSize: "17px" }}
            >
              نوع برگذاری
            </Label>
            <Controller
              id="CourseTypeId"
              name="CourseTypeId"
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "16px" }}
                  autoFocus
                  type="select"
                  invalid={errors.CourseTypeId && true}
                  {...field}
                >
                  <option value="">انتخاب...</option>
                  {options.courseType?.map((type) => (
                    <option
                      key={type.id}
                      value={type.id}
                      style={{ fontSize: "17px" }}
                    >
                      {type.typeName}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors.CourseTypeId && (
              <FormFeedback style={{ fontSize: "15px" }}>
                {errors.CourseTypeId.message}
              </FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          {/* <Col md="6" className="mb-1">
            <Label
              className="form-label"
              htmlFor="CourseStatus"
              style={{ fontSize: "17px" }}
            >
              وضعیت
            </Label>
            <Controller
              id="CourseStatus"
              name="CourseStatus"
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  type="select"
                  invalid={errors.CourseStatus && true}
                  {...field}
                >
                  <option value="">انتخاب...</option>
                  {options.courseStatus?.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.statusName}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors.CourseStatus && (
              <FormFeedback style={{ fontSize: "15px" }}>
                {errors.CourseStatus.message}
              </FormFeedback>
            )}
          </Col> */}
          <Col md="6" className="mb-1">
            <Label
              className="form-label"
              htmlFor="TremId"
              style={{ fontSize: "17px" }}
            >
              ترم
            </Label>
            <Controller
              id="TremId"
              name="TremId"
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "16px" }}
                  autoFocus
                  type="select"
                  invalid={errors.TremId && true}
                  {...field}
                >
                  <option value="">انتخاب...</option>
                  {options.courseTerm?.map((term) => (
                    <option
                      key={term.id}
                      style={{ fontSize: "17px" }}
                      value={term.id}
                    >
                      {term.termName}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors.TremId && (
              <FormFeedback style={{ fontSize: "15px" }}>
                {errors.TremId.message}
              </FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label
              className="form-label"
              htmlFor="ClassId"
              style={{ fontSize: "17px" }}
            >
              کلاس
            </Label>
            <Controller
              id="ClassId"
              name="ClassId"
              control={control}
              render={({ field }) => (
                <Input
                  style={{ fontSize: "16px" }}
                  autoFocus
                  type="select"
                  invalid={errors.ClassId && true}
                  {...field}
                >
                  <option value="">انتخاب...</option>
                  {options.classRoom?.map((classRoom) => (
                    <option
                      key={classRoom.id}
                      value={classRoom.id}
                      style={{ fontSize: "17px" }}
                    >
                      {classRoom.classRoomName}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors.ClassId && (
              <FormFeedback style={{ fontSize: "15px" }}>
                {errors.ClassId.message}
              </FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mb-2">
            {/* <Label
              className="form-label"
              htmlFor="Describe"
              style={{ fontSize: "17px" }}
            >
              توضیحات
            </Label> */}
            {/* <Controller
              id="Describe"
              name="Describe"
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  type="textarea"
                  style={{ height: "250px" }}
                  placeholder="توضیحات...."
                  invalid={errors.Describe && true}
                  {...field}
                />
              )}
            />
            {errors.Describe && (
              <FormFeedback style={{ fontSize: "15px" }}>
                {errors.Describe.message}
              </FormFeedback>
            )} */}
            <TabPillsContainer tabs={tabs} setTabs={setTabs} />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
            <span
              className="align-middle d-sm-inline-block d-none"
              style={{ margin: "0 10px" }}
            >
              قبلی
            </span>
          </Button>
          <Button
            type="submit"
            color="success"
            className="btn-next"
            disabled={isSubmitting || tabs.length === 1}
          >
            <span
              className="align-middle d-sm-inline-block d-none"
              style={{ margin: "0 10px" }}
            >
              ایجاد دوره
            </span>
            <Slack size={14} className="align-middle me-sm-25 me-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default CourseInfoPartTwo;
