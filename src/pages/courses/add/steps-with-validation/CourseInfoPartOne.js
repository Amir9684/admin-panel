// ** React Imports
import { Fragment, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "jalali-moment";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";
import DateRangePicker from "./DateRangePicker";

import { getPersianNumbers } from "../../../../utility/get-persian-numbers";
import { getItem, setItem } from "../../../../services/common/storage.services";

const defaultValues = {
  title: "",
  miniDescribe: "",
  capacity: "",
  cost: "",
  sessionNumber: "",
};

const formSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان را وارد کنید")
    .max(30, `"عنوان دوره حداکثر ${getPersianNumbers(30)} کلمه باشد"`),
  miniDescribe: z
    .string()
    .min(1, "توضحات دوره را وارد کنید")
    .max(30, `توضیحات باید حداکثر ${getPersianNumbers(50)}`),
  capacity: z
    .string()
    .min("1", "ظرفیت را وارد کنید")
    .refine(
      (data) => Number(data) > 20 && Number(data) < 100,
      `ظرفیت باید بیشتر از ${getPersianNumbers(20)} باشد`
    ),
  cost: z
    .string()
    .min(1, "قیمت را وارد کنید")
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

const CourseInfoPartOne = ({ stepper }) => {
  const [dateRange, setDateRange] = useState(null);
  const [validDate, setValidDate] = useState(false);
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: zodResolver(formSchema) });

  const onSubmit = (values) => {
    let createCourseDatas = getItem("create_course");
    createCourseDatas = {
      ...createCourseDatas,
      courseDatas: {
        Title: values.title,
        SessionNumber: Number(values.sessionNumber),
        MiniDescribe: values.miniDescribe,
        Cost: Number(values.cost),
        Capacity: Number(values.capacity),
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
      },
    };
    setItem("create_course", createCourseDatas);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-1" style={{ fontSize: "19px" }}>
          اطلاعات دوره
        </h5>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label
              className="form-label"
              for="title"
              style={{ fontSize: "17px" }}
            >
              عنوان
            </Label>
            <Controller
              id="title"
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="عنوان دوره..."
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback>{errors.title.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label
              className="form-label"
              for="miniDescribe"
              style={{ fontSize: "17px" }}
            >
              توضیح مختصر
            </Label>
            <Controller
              id="miniDescribe"
              name="miniDescribe"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="توضیح مختصر..."
                  invalid={errors.miniDescribe && true}
                  {...field}
                />
              )}
            />
            {errors.miniDescribe && (
              <FormFeedback>{errors.miniDescribe.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
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
              render={({ field }) => (
                <Input invalid={errors.capacity && true} {...field} />
              )}
            />
            {errors.capacity && (
              <FormFeedback>{errors.capacity.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
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
              render={({ field }) => (
                <Input invalid={errors.cost && true} {...field} />
              )}
            />
            {errors.cost && <FormFeedback>{errors.cost.message}</FormFeedback>}
          </Col>
          <Col md="6" className="mb-1">
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
              render={({ field }) => (
                <Input invalid={errors.sessionNumber && true} {...field} />
              )}
            />
            {errors.sessionNumber && (
              <FormFeedback>{errors.sessionNumber.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" sm="12" className="mb-1">
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
            color="primary"
            className="btn-prev"
            disabled={isSubmitting  || !validDate}
          >
            <span
              className="align-middle d-sm-inline-block d-none"
              style={{ margin: "0 10px" }}
            >
              بعدی
            </span>
            <ArrowRight size={14} className="align-middle me-sm-25 me-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default CourseInfoPartOne;
