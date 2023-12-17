import { Plus, Trash } from "react-feather";
import { CoursePair } from "./course-pair";

import { Col, Button } from "reactstrap";

export const CourseTab = ({
  tab,
  onDeletePair,
  onChangePairTitle,
  onChangePairVideoLink,
  onDeleteTab,
  onAddPair,
}) => {
  const handleDeleteTab = () => {
    onDeleteTab(tab);
  };

  const handleAddPair = () => {
    onAddPair(tab);
  };
  return (
    <Col sm="12" className="d-flex flex-column gap-2">
      <Col sm="12">
        {tab.isActive &&
          tab.videos.map((pair, index) => (
            <CoursePair
              key={pair.title}
              pair={pair}
              onDeletePair={() => onDeletePair(tab, index)}
              onChangePairTitle={(e) =>
                onChangePairTitle(tab, index, e.target.value)
              }
              onChangePairVideoLink={(e) =>
                onChangePairVideoLink(tab, index, e.target.value)
              }
            />
          ))}
      </Col>
      <Col className="d-flex justify-content-between" sm="12">
        {tab.isActive && (
          <Button
            style={{ padding: "10px 15px", fontSize: "17px" }}
            color="primary"
            outline
            onClick={handleAddPair}
          >
            <Plus size={19} style={{ margin: "0 4px" }} />
            اضافه کردن ویدیو درسی جدید
          </Button>
        )}
        <Button
          color="danger"
          style={{ padding: "10px 15px", fontSize: "17px" }}
          onClick={handleDeleteTab}
        >
          <Trash size={19} style={{ margin: "0 4px" }} />
          حذف فصل
        </Button>
      </Col>
    </Col>
  );
};
