// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { useState } from "react";
import { Trash, EyeOff, Eye } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  Badge,
} from "reactstrap";

import {
  acceptComment,
  rejectComment,
  deleteComment,
} from "../../../../redux/commnets";
import { apiCall } from "../../../../services/interceptor/api-call";

const MySwal = withReactContent(Swal);

const status = {
  true: "light-success",
  false: "light-danger",
};

const defaultValues = {
  title: "",
  describe: "",
};

const formSchema = z.object({
  title: z.string().min(5, "عنوان پیام را بنویسید"),
  describe: z.string().min(5, "متن پیام را بنویسید"),
});

// ** Expandable table component
const ExpandableTable = ({ data }) => {
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
        CommentId: data.commentId,
        CourseId: data.courseId,
        Title: values.title,
        Describe: values.describe,
      };
      for (const key in body) formData.append(key, body[key]);
      await apiCall
        .post("/Course/AddReplyCourseComment", formData)
        .then((res) => {
          if (res.success) toast.success("پاسخ ثبت شد");
          else toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
        });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    }
  };

  return (
    <Form
      className="d-flex d-flex-row expandable-content border"
      style={{ padding: "5px 10px", overflow: "hidden" }}
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

// ** Table Common Column
export const columns = [
  {
    name: "کاربر",
    minWidth: "250px",
    sortable: (row) => row.author,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.pictureAddress !== "" && <Avatar img={row.pictureAddress} />}
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">{row.author}</span>
        </div>
      </div>
    ),
  },
  {
    name: "عنوان",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.title,
  },
  {
    name: "پیام",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.describe,
  },
  {
    name: "وضعیت",
    minWidth: "150px",
    sortable: (row) => row.accept,
    cell: (row) => {
      return (
        <Badge color={status[`${row.accept}`]} pill>
          {row.accept ? "تائید شده" : "تائید نشده"}
        </Badge>
      );
    },
  },
  {
    name: "عملیات",
    allowOverflow: true,
    cell: (row) => {
      const [isLoading, setIsLoading] = useState(false);
      const dispatch = useDispatch();

      const handleDelete = async () => {
        try {
          setIsLoading(true);
          return MySwal.fire({
            title: "آیا از حذف مطمئنید؟",
            text: "این عملیات قابل بازگشت نیست",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله، کامنت حذف شود",
            cancelButtonText: "لغو",
            customClass: {
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-outline-danger ms-1",
            },
            buttonsStyling: false,
          }).then(async (result) => {
            if (result.value) {
              await dispatch(deleteComment(row));
            } else if (result.dismiss === MySwal.DismissReason.cancel) {
              MySwal.fire({
                title: "درخواست لغو شد",
                text: "حذف کامنت لغو شد",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
            }
          });
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      const handleActiveness = async () => {
        try {
          setIsLoading(true);
          if (row.accept) await dispatch(rejectComment(row));
          else await dispatch(acceptComment(row));
        } catch (error) {
          console.log(error);
          toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
        } finally {
          setIsLoading(false);
        }
      };
      return (
        <div className="d-flex">
          {row.accept ? (
            <button
              disabled={isLoading}
              onClick={handleActiveness}
              style={{
                cursor: isLoading && "not-allowed",
                opacity: isLoading && "0.7",
                backgroundColor: "transparent",
                border: "transparent",
              }}
            >
              <EyeOff
                size={18}
                className="me-50"
                style={{
                  stroke: "#ea5455",
                  cursor: "pointer",
                }}
              />
            </button>
          ) : (
            <button
              disabled={isLoading}
              onClick={handleActiveness}
              style={{
                cursor: isLoading && "not-allowed",
                opacity: isLoading && "0.7",
                backgroundColor: "transparent",
                border: "transparent",
              }}
            >
              <Eye
                size={18}
                className="me-50"
                style={{
                  stroke: "#28c76f",
                  cursor: "pointer",
                }}
              />
            </button>
          )}
          <button
            disabled={isLoading}
            onClick={handleDelete}
            style={{
              cursor: isLoading && "not-allowed",
              opacity: isLoading && "0.7",
              backgroundColor: "transparent",
              border: "transparent",
            }}
          >
            <Trash
              size={18}
              className="me-50"
              style={{
                stroke: "#ea5455",
                cursor: "pointer",
              }}
            />
          </button>
        </div>
      );
    },
  },
];

export default ExpandableTable;
