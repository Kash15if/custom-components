import productCardStyles from "./ProductCard.module.css"

const imagesDir = require.context("../../../storage/images/", true);

const Product = () => {
  return <div className={productCardStyles.productCard}>
    <img src={imagesDir(`./imageA.jpg`)} alt="Avatar" />
    <h2 className={productCardStyles.productName}>Product Name</h2>
    <p className={productCardStyles.productPrice}>$19.99</p>
    <button className={productCardStyles.addToCart}>Add to Cart</button>
  </div>
    ;
};

export default Product;
