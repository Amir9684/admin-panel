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
    sidebarOpen,
    getProducts,
    setSidebarOpen,
    isLoading,
    setIsLoading,
  } = props;

  // ** Handles pagination
  const handlePageChange = async (val) => {
    setIsLoading(true);
    if (val === "next") {
      await dispatch(
        getProducts({
          ...store.params,
          PageNumber: store.params?.PageNumber + 1,
        })
      );
      setIsLoading(false);
    } else if (val === "prev") {
      await dispatch(
        getProducts({
          ...store.params,
          PageNumber: store.params?.PageNumber - 1,
        })
      );
      setIsLoading(false);
    } else {
      await dispatch(getProducts({ ...store.params, PageNumber: val }));
      setIsLoading(false);
    }
  };

  // ** Render pages
  const renderPageItems = () => {
    const arrLength =
      Number(store.totalCount) !== 0 && store.news?.length !== 0
        ? Math.ceil(Number(store.totalCount) / 6)
        : 2;
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
      <div className="content-body" style={{ margin: 0 }}>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          getProducts={getProducts}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames("body-content-overlay", {
            show: sidebarOpen,
          })}
          style={{ width: "100%" }}
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
