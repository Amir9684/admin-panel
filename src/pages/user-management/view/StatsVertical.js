// ** Third Party Components
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Card, CardBody } from "reactstrap";

const StatsVertical = ({ icon, color, stats, statTitle, className , link }) => {
  return (
    <Link to={link} target="blank">
      {" "}
      <Card className="text-center">
        <CardBody className={className}>
          <div
            style={{ padding: "14px" }}
            className={`avatar m-0 mb-1 ${
              color ? `bg-light-${color}` : "bg-light-primary"
            }`}
          >
            <div className="avatar-content">{icon}</div>
          </div>
          <h3 className="fw-bolder" style={{whiteSpace:"nowrap"}}>{stats}</h3>
          <p className="card-text line-ellipsis">{statTitle}</p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default StatsVertical;

// ** PropTypes
StatsVertical.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
};
