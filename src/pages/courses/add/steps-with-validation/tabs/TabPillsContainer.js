import { Row, Col, Button } from "reactstrap";

import PillsVertical from "../PillsVertical";
import { CourseTab } from "./course-tab";

// CourseTabContainer component
const CourseTabContainer = ({ tabs, setTabs }) => {
  const handleTabTitleChange = (tab, name) => {
    const updatedTabs = tabs.map((t) => (t === tab ? { ...tab, name } : t));
    setTabs(updatedTabs);
  };

  const handleDeleteTab = (tab) => {
    let updatedTabs = tabs.filter((t) => t !== tab);
    updatedTabs = updatedTabs.map((tab, index) =>
      index === updatedTabs.length - 1 ? { ...tab, isActive: true } : { ...tab }
    );
    setTabs(updatedTabs);
  };

  const handleAddTab = () => {
    const newTab = {
      name: "",
      videos: [{ title: "", videoLink: "" }],
      isActive: tabs.length === 0,
    };
    setTabs([...tabs, newTab]);
  };

  const handleAddPair = (tab) => {
    const updatedvideos = [...tab.videos, { title: "", videoLink: "" }];
    const updatedTabs = tabs.map((t) =>
      t === tab ? { ...tab, videos: updatedvideos } : t
    );
    setTabs(updatedTabs);
  };

  const handleDeletePair = (tab, index) => {
    if (tab.videos.length === 1) handleDeleteTab(tab);
    else {
      const updatedvideos = tab.videos.filter((_, i) => i !== index);
      const updatedTabs = tabs.map((t) =>
        t === tab ? { ...tab, videos: updatedvideos } : t
      );
      setTabs(updatedTabs);
    }
  };

  const handleChangePairTitle = (tab, index, title) => {
    const updatedvideos = tab.videos.map((pair, i) =>
      i === index ? { ...pair, title } : pair
    );
    const updatedTabs = tabs.map((t) =>
      t === tab ? { ...tab, videos: updatedvideos } : t
    );
    setTabs(updatedTabs);
  };

  const handleChangePairVideoLink = (tab, index, videoLink) => {
    const updatedvideos = tab.videos.map((pair, i) =>
      i === index ? { ...pair, videoLink } : pair
    );
    const updatedTabs = tabs.map((t) =>
      t === tab ? { ...tab, videos: updatedvideos } : t
    );
    setTabs(updatedTabs);
  };

  const handleTabClick = (tab) => {
    const updatedTabs = tabs.map((t) => ({ ...t, isActive: t === tab }));
    setTabs(updatedTabs);
  };
  const isDark = document
    .querySelectorAll("body")[0]
    .classList.contains("dark-layout");
  return (
    <Row className="border" style={{ padding: "10px 5px" }}>
      <Col
        md="2"
        sm="12"
        style={{
          borderLeft: isDark ? "1px solid #404656" : "1px solid #d8d6de",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {tabs.map((tab, index) => (
          <PillsVertical
            tab={tab}
            index={index}
            handleClick={() => handleTabClick(tab)}
            onChangeTitle={handleTabTitleChange}
          />
        ))}
        <Button
          color="primary"
          outline
          type="button"
          style={{ fontSize: "17px" }}
          onClick={handleAddTab}
        >
          سرفصل جدید
        </Button>
      </Col>
      <Col md="10" sm="12">
        {tabs.find((tab) => tab.isActive) && (
          <CourseTab
            tab={tabs.find((tab) => tab.isActive)}
            handleAddTab={handleAddTab}
            onDeleteTab={handleDeleteTab}
            onAddPair={handleAddPair}
            onDeletePair={handleDeletePair}
            onChangePairTitle={handleChangePairTitle}
            onChangePairVideoLink={handleChangePairVideoLink}
          />
        )}
      </Col>
    </Row>
  );
};

export default CourseTabContainer;
