// ** Reactstrap Imports
import { Nav, NavItem, Row, Col, Button, Input } from "reactstrap";

import { getPersianNumbers } from "../../../../utility/get-persian-numbers";

const PillsVertical = ({ tab, index, handleClick, onChangeTitle }) => {
  const handleTitleChange = (e) => {
    onChangeTitle(tab, e.target.value);
  };

  return (
    <Nav pills vertical>
      <NavItem
        className="d-flex flex-row justify-content-center gap-2"
        style={{ width: "100%" }}
      >
        <Button
          color={tab.isActive ? "primary" : "dark"}
          onClick={handleClick}
          style={{ padding: "8px 10px", margin: 0, fontSize: "20px" }}
        >
          {getPersianNumbers(index + 1)}
        </Button>
        <Input
          style={{ fontSize: "17px" }}
          value={tab.name}
          onChange={handleTitleChange}
        />
      </NavItem>
    </Nav>
  );
};
export default PillsVertical;
