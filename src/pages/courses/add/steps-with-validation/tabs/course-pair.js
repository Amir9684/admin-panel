import { X } from "react-feather";
// ** React Imports

// ** Reactstrap Imports
import { Row, Col, Button, Input, Label } from "reactstrap";

export const CoursePair = ({
  pair,
  onDeletePair,
  onChangePairTitle,
  onChangePairVideoLink,
}) => {
  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end",
        width: "100%",
      }}
    >
      <Col md="3" sm="12">
        <Label for="videoTitle" style={{ fontSize: "17px" }}>
          عنوان
        </Label>
        <Input
          placeholder="عنوان..."
          value={pair.title}
          onChange={onChangePairTitle}
        />
      </Col>
      <Col md="5" sm="12">
        <Label for="videoLink" style={{ fontSize: "17px" }}>
          لینک ویدیو
        </Label>
        <Input
          placeholder="لینک..."
          value={pair.videoLink}
          onChange={onChangePairVideoLink}
        />
      </Col>
      <Col md="2" sm="5">
        <Button
          color="danger"
          outline
          style={{ padding: "5px 7px" }}
          onClick={onDeletePair}
        >
          <X />
          حذف
        </Button>
      </Col>
    </Row>
  );
};
