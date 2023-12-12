// ** React Imports
import { Fragment, useState, useEffect, useMemo } from "react";
import { Spinner } from "reactstrap";

// ** Shop Components
import Sidebar from "./Sidebar";
import Products from "./Products";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getAllNews, selectAllNews, useNews } from "../../../redux/news";

// ** Styles
import "@styles/react/apps/app-ecommerce.scss";
import { Loading } from "../../ui-elements/loading";

const Shop = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false),
    [isLoading, setIsLoading] = useState(false);

  // ** Vars
  const dispatch = useDispatch();
  const news = useNews();
  const newsList = useSelector(selectAllNews);
  const store = useMemo(() => ({ ...news, news: newsList }), [newsList]);

  // ** Get products
  useEffect(() => {
    if (!isLoading) {
      const getInfos = async () => {
        setIsLoading(true);
        await dispatch(
          getAllNews({
            Query: "",
            SortingCol: "InsertDate",
            RowsOfPage: 6,
            PageNumber: 1,
          })
        );
      };

      getInfos().then(() => setIsLoading(false));
    }
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <Breadcrumbs title="بلاگ‌ها" data={[{ title: "بلاگ‌ها" }]} />
      <Products
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        store={store}
        dispatch={dispatch}
        getProducts={getAllNews}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* <Sidebar sidebarOpen={sidebarOpen} /> */}
    </Fragment>
  );
};
export default Shop;
