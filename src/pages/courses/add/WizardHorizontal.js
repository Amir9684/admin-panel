// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import SelectTeacher from "./steps-with-validation/select-teacher";
import SelectCategory from "./steps-with-validation/select-cateogry";
import { Loading } from "../../ui-elements/loading";
import { getData } from "./column";
import CourseInfoPartOne from "./steps-with-validation/CourseInfoPartOne";
import CourseInfoPartTwo from "./steps-with-validation/CourseInfoPartTwo";

const WizardHorizontal = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      getData().then((res) => {
        setCategories(res.technologyDtos);
        setTeachers(res.teachers);
        setIsLoading(false);
        const newObj = {
          courseType: res.courseTypeDtos,
          courseLevel: res.courseLevelDtos,
          courseStatus: res.statusDtos,
          classRoom: res.classRoomDtos,
          courseTerm: res.termDtos,
        };
        setOptions(newObj);
      });
    }
  }, []);

  if (isLoading) return <Loading />;

  const steps = [
    {
      id: "tech-selection",
      title: "انتخاب درس",
      subtitle: "روی درس موردنظر کلیک کنید",
      content: <SelectCategory categories={categories} stepper={stepper} />,
    },
    {
      id: "teacher-selection",
      title: "انتخاب استاد",
      subtitle: "استاد مورد نظر را انتخاب کنید",
      content: <SelectTeacher teachers={teachers} stepper={stepper} />,
    },
    {
      id: "create-course-part1",
      title: "ایجاد دوره",
      subtitle: "برای ثبت دوره جدید فیلد‌ها را تکمیل کنید",
      content: <CourseInfoPartOne stepper={stepper} />,
    },
    {
      id: "create-course-part2",
      title: "ادامه ایجاد دوره",
      subtitle: "برای ثبت دوره جدید فیلد‌ها را تکمیل کنید",
      content: <CourseInfoPartTwo options={options} stepper={stepper} />,
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default WizardHorizontal;
