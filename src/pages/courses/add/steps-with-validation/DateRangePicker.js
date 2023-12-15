import { DatePicker } from "zaman";
import moment from "jalali-moment";

const DateRangePicker = ({ setValidDate = true, setDateRange }) => {
  const onChange = (e) => {
    let from = moment(e.from).locale("fa").format("YYYY-MM-DD").split("-");
    let to = moment(e.to).locale("fa").format("YYYY-MM-DD").split("-");
    from = {
      year: Number(from[0]),
      month: Number(from[1]),
      day: Number(from[2]),
    };
    to = { year: Number(to[0]), month: Number(to[1]), day: Number(to[2]) };
    setDateRange({ startDate: from, endDate: to });
    setValidDate(true);
  };
  const isDark = document
    .querySelectorAll("body")[0]
    .classList.contains("dark-layout");

  return (
    <DatePicker
      onChange={onChange}
      round="x2"
      accentColor="#6374ae"
      inputAttributes={{
        placeholder: "شروع -- پایان",
        style: {
          width: "100%",
          borderRadius: "5px",
          border: isDark ? "1px solid #404656" : "1px solid #d8d6de",

          textAlign: "center",
          color: "#6e6b7b",
          padding: "0.571rem 1rem",
          fontSize: "15px",
          backgroundColor: "transparent",
        },
      }}
      position="center"
      range
    />
  );
};

export default DateRangePicker;
