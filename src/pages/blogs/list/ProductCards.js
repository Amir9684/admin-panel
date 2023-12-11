// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { Edit } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from "reactstrap";

import defaultImage from "../../../../public/samuel-girven-t7U6dyvd76Y-unsplash.jpg";

const ProductCards = (props) => {
  // ** Props
  const { store, products, dispatch, activeView, getProducts } = props;

  // ** Handle Move/Add to cart
  // const handleCartBtn = (id, val) => {
  //   if (val === false) {
  //     dispatch(addToCart(id))
  //   }
  //   dispatch(getCartItems())
  //   dispatch(getProducts(store.params))
  // }

  // ** Handle Wishlist item toggle
  // const handleWishlistClick = (id, val) => {
  //   if (val) {
  //     dispatch(deleteWishlistItem(id))
  //   } else {
  //     dispatch(addToWishlist(id))
  //   }
  //   dispatch(getProducts(store.params))
  // }

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map((item) => (
        <Card
          className="ecommerce-card"
          key={item.id}
          style={{ marginTop: "50px" }}
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
            {/* <div className="item-wrapper">
              <div className="item-rating">
                <ul className="unstyled-list list-inline">
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className="ratings-list-item me-25">
                        <Star
                          className={classnames({
                            "filled-star": index + 1 <= item.rating,
                            "unfilled-star": index + 1 > item.rating,
                          })}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div> */}
            <h6 className="item-name" style={{ fontSize: "20px" }}>
              <Link className="text-body" to={`/news/${item.id}`}>
                {item.title}
              </Link>
              {/* <CardText tag="span" className="item-company">
                توسط
                <a
                  className="company-name"
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  {item.addUserFullName}
                </a>
                نوشته شده است
              </CardText> */}
            </h6>
            <CardText
              className="item-description"
              style={{ fontSize: "17px", textAlign: "justify" }}
            >
              {item.miniDescribe}
            </CardText>
          </CardBody>
          <div className="item-options text-center">
            {/* <div className="item-wrapper">
              <div className="item-cost">
                <h4 className="item-price">${item.keyword}</h4>
                {item.hasFreeShipping ? (
                  <CardText className="shipping">
                    <Badge color="light-success">Free Shipping</Badge>
                  </CardText>
                ) : null}
              </div>
            </div> */}
            <Link to={`/news/${item.id}`}>
              <Button
                className="btn-wishlist"
                style={{ width: "100%" }}
                color="light"
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
          </div>
        </Card>
      ));
    }
  };

  return (
    <div
      className={classnames({
        "grid-view": activeView === "grid",
        "list-view": activeView === "list",
      })}
    >
      {renderProducts()}
    </div>
  );
};

export default ProductCards;
