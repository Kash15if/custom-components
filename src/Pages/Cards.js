import Profile from "../CustomComponents/Cards/Profile/Profile";
import Product from "../CustomComponents/Cards/ecommerce/Ecom-Product";

const Cards = () => {
    return (
        <div class="card">

            {/* Profile Card */}
            <Profile />

            {/* Product Card */}
            <Product />

        </div>
    )
}

export default Cards;