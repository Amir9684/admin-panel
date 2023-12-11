// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
import Sidebar from "./Sidebar";
import Products from "./Products";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { getAllNews, useNews } from "../../../redux/news";

// ** Styles
import "@styles/react/apps/app-ecommerce.scss";

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ** Vars
  const dispatch = useDispatch();
  const store = useNews();

  // ** Get products
  useEffect(() => {
    dispatch(
      getAllNews({
        Query: "",
        SortingCol: "InsertDate",
        RowsOfPage: 9,
        PageNumber: 1,
      })
    );
  }, [dispatch]);

  return (
    <Fragment>
      <Breadcrumbs title="بلاگ‌ها" data={[{ title: "بلاگ‌ها" }]} />
      <Products
        store={store}
        dispatch={dispatch}
        activeView={activeView}
        getProducts={getAllNews}
        sidebarOpen={sidebarOpen}
        setActiveView={setActiveView}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar sidebarOpen={sidebarOpen} />
    </Fragment>
  );
};
export default Shop;
