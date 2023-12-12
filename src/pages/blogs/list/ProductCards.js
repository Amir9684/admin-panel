import { ProductCard } from "./product-card";

const ProductCards = (props) => {
  // ** Props
  const { store, products, dispatch, getProducts } = props;

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map((item) => (
        <ProductCard key={item.id} item={item} dispatch={dispatch} />
      ));
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "2rem",
      }}
    >
      {renderProducts()}
    </div>
  );
};

export default ProductCards;
