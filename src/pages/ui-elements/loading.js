import { Spinner } from "reactstrap";
export const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        right: "100px",
        gap: "10px",
      }}
    >
      <Spinner size="sm" />
      <span className="ms-50">لطفاٌ صبر کنید</span>
    </div>
  );
};
