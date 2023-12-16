import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form, Label, Input, Button, FormFeedback } from "reactstrap";
import { apiCall } from "../../../../services/interceptor/api-call";

const defaultValues = {
  title: "",
  describe: "",
};

const formSchema = z.object({
  title: z.string().min(1, "عنوان پیام را بنویسید"),
  describe: z.string().min(1, "متن پیام را بنویسید"),
});

export const AddComment = () => {
  const { courseId } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      const body = {
        CourseId: courseId,
        Title: values.title,
        Describe: values.describe,
      };
      for (const key in body) formData.append(key, body[key]);
      await apiCall.post("/Course/AddCommentCourse", formData).then((res) => {
        if (res.success) {
          toast.success("کامنت ثبت شد");
        } else toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    }
  };

  return (
    <Form
      className="d-flex d-flex-row expandable-content border"
      style={{ padding: "5px 10px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Col
        className="mb-2"
        style={{
          paddingTop: "25px",
          width: "100%",
        }}
      >
        <Row className="d-flex flex-column justify-content-center align-items-start gap-2">
          <Col sm="4">
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
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="عنوان..."
                  invalid={errors.title && true}
                  style={{ fontSize: "16px" }}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback>{errors.title.message}</FormFeedback>
            )}
          </Col>
          <Col sm="12">
            <Col sm="12">
              <Label
                className="form-label"
                for="describe"
                style={{ fontSize: "17px" }}
              >
                متن پیام
              </Label>
              <Controller
                id="describe"
                name="describe"
                control={control}
                render={({ field }) => (
                  <Input
                    type="textarea"
                    invalid={errors.describe && true}
                    style={{ fontSize: "16px", height: "200px" }}
                    {...field}
                  />
                )}
              />
              {errors.describe && (
                <FormFeedback>{errors.describe.message}</FormFeedback>
              )}
            </Col>

            <Col sm="2" className="mt-2">
              <Button
                disabled={isSubmitting}
                color="primary"
                className="me-1"
                style={{ fontSize: "17px" }}
              >
                ثبت
              </Button>
            </Col>
          </Col>
        </Row>
      </Col>
    </Form>
  );
};
