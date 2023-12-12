// ** React Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { activeNews, deActiveNews } from "../../../redux/news";
// ** Third Party Components
import classnames from "classnames";
import { Edit, Eye, EyeOff, Trash } from "react-feather";
import { Card, CardBody, CardFooter, CardText, Button } from "reactstrap";
import defaultImage from "/samuel-girven-t7U6dyvd76Y-unsplash.jpg";

export const ProductCard = ({ item, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleActiveness = async (news) => {
    try {
      setIsLoading(true);
      if (!news.isActive) await dispatch(activeNews(news));
      else await dispatch(deActiveNews(news));
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };
  return (
    <Card
      className="ecommerce-card"
      style={
        isLoading
          ? { opacity: "0.4", marginTop: "50px" }
          : { marginTop: "50px" }
      }
    >
      <div className="item-img text-center mx-auto">
        <Link to={`/news/${item.id}`}>
          <img
            className="img-fluid card-img-top"
            style={{ width: "100vh", height: "400px", objectFit: "cover" }}
            src={item.currentImageAddressTumb || defaultImage}
            alt={item.currentImageAddressTumb || defaultImage}
          />
        </Link>
      </div>
      <CardBody>
        <h6 className="item-name" style={{ fontSize: "20px" }}>
          <Link className="text-body" to={`/news/${item.id}`}>
            {item.title}
          </Link>
        </h6>
        <CardText
          className="item-description"
          style={{ fontSize: "17px", textAlign: "justify" }}
        >
          {item.miniDescribe}
        </CardText>
      </CardBody>
      <CardFooter
        className="item-options text-center d-flex justify-content-center align-items-center"
        style={{ width: "100%", padding: "0" }}
      >
        {item.isActive && (
          <Link
            to={`/news/${item.id}`}
            style={{ width: "100%", borderRadius: "0" }}
          >
            <Button
              className="btn-wishlist"
              color="light"
              style={{ width: "100%", color: "#858585", borderRadius: "0" }}
            >
              <Edit
                className={classnames("me-50", {
                  "text-danger": item.isInWishlist,
                })}
                size={14}
              />
              <span>ویرایش</span>
            </Button>
          </Link>
        )}
        <Button
          className="btn-wishlist"
          color={item.isActive ? "danger" : "success"}
          style={{
            width: "100%",
            borderRadius: "0",
          }}
          onClick={() => handleActiveness(item)}
          disabled={isLoading}
        >
          {item.isActive ? (
            <EyeOff
              className={classnames("me-50", {
                "text-danger": item.isInWishlist,
              })}
              size={14}
            />
          ) : (
            <Eye
              className={classnames("me-50", {
                "text-danger": item.isInWishlist,
              })}
              size={14}
            />
          )}

          <span>{item.isActive ? "غیرفعال" : "فعال"}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
