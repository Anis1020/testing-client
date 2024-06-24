import { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiosPublic.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, [axiosPublic]);

  const handleCheckout = async (product) => {
    const buyProduct = await axiosSecure.get(`/product/${product._id}`);
    console.log(buyProduct.data);
    if (buyProduct.data) {
      const cart = await axiosSecure.post("/carts", buyProduct.data);
      console.log(cart.data);
    }
    navigate("/checkout");
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {products.map((product) => (
        <div key={product._id} className="card  bg-base-100 shadow-xl">
          <figure>
            <img src={product.image} className="h-52 w-80" alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handleCheckout(product)}
                className="btn btn-primary"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
