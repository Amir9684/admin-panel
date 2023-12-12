// ** Third Party Components
import classnames from "classnames";
import { Menu, Grid, List } from "react-feather";

import { Link } from "react-router-dom";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

const ProductsHeader = (props) => {
  // ** Props
  const { dispatch, getProducts, store } = props;
  // ** Sorting obj
  const sortToggleText = {
    "InsertDate-DESC": "جدیدترین",
    "InsertDate-ASC": "قدیمی‌ترین",
    InsertDate: "تاریخ انتشار",
  };

  const sortCol = store.params?.SortType
    ? `${store.params.SortingCol}-${store.params.SortType}`
    : store.params?.SortingCol;

  return (
    <div className="ecommerce-header">
      <Row>
        <Col sm="12">
          <div className="ecommerce-header-items">
            <div className="result-toggler">
              <span className="search-results">
                {store.totalCount} تنیجه یافت شد
              </span>
            </div>
            <div className="view-options d-flex justify-content-between">
              <UncontrolledButtonDropdown className="dropdown-sort">
                <DropdownToggle
                  className="text-capitalize me-1"
                  color="primary"
                  outline
                  caret
                >
                  {sortToggleText[sortCol]}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...store.params,
                          SortingCol: "InsertDate",
                          SortType: null,
                        })
                      )
                    }
                  >
                    تاریخ انتشار
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...store.params,
                          SortingCol: "InsertDate",
                          SortType: "ASC",
                        })
                      )
                    }
                  >
                    قدیمی‌ترین
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...store.params,
                          SortingCol: "InsertDate",
                          SortType: "DESC",
                        })
                      )
                    }
                  >
                    جدیدترین
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <Link to={`/news/add`}>
                <Button color="primary">افزودن بلاگ</Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;
