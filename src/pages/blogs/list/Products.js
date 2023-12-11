// ** React Imports
import { Fragment } from "react";

// ** Product components
import ProductCards from "./ProductCards";
import ProductsHeader from "./ProductsHeader";
import ProductsSearchbar from "./ProductsSearchbar";

// ** Third Party Components
import classnames from "classnames";

// ** Reactstrap Imports
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";


const ProductsPage = (props) => {
  // ** Props
  const {
    store,
    dispatch,
    activeView,
    sidebarOpen,
    getProducts,
    setActiveView,
    setSidebarOpen,
  } = props;

  // ** Handles pagination
  const handlePageChange = (val) => {
    if (val === "next") {
      dispatch(
        getProducts({
          ...store.params,
          PageNumber: store.params?.PageNumber + 1,
        })
      );
    } else if (val === "prev") {
      dispatch(
        getProducts({
          ...store.params,
          PageNumber: store.params?.PageNumber - 1,
        })
      );
    } else {
      dispatch(getProducts({ ...store.params, PageNumber: val }));
    }
  };

  // ** Render pages
  const renderPageItems = () => {
    const arrLength =
      store.totalCount !== 0 && store.news?.length !== 0
        ? Number(store.totalCount) / store.news?.length
        : 3;

    return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
      return (
        <PaginationItem
          key={index}
          active={store.params?.PageNumber === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          <PaginationLink href="/" onClick={(e) => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  // ** handle next page click
  const handleNext = () => {
    if (
      store.params.PageNumber !==
      Number(store.totalCount) / store.news?.length
    ) {
      handlePageChange("next");
    }
  };

  return (
    <div className="content-detached content-right">
      <div className="content-body">
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames("body-content-overlay", {
            show: sidebarOpen,
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar
          dispatch={dispatch}
          getProducts={getProducts}
          store={store}
        />
        {store.news?.length ? (
          <Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              activeView={activeView}
              products={store.news}
              getProducts={getProducts}
            />
            <Pagination className="d-flex justify-content-center ecommerce-shop-pagination mt-2">
              <PaginationItem
                disabled={store.params?.PageNumber === 1}
                className="prev-item"
                onClick={() =>
                  store.params?.PageNumber !== 1
                    ? handlePageChange("prev")
                    : null
                }
              >
                <PaginationLink
                  href="/"
                  onClick={(e) => e.preventDefault()}
                ></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className="next-item"
                onClick={() => handleNext()}
                disabled={
                  store.params?.PageNumber ===
                  Number(store.totalCount) / store.news?.length
                }
              >
                <PaginationLink
                  href="/"
                  onClick={(e) => e.preventDefault()}
                ></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <p style={{ fontSize: "17px" }}>رکوردی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
