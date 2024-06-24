import { useForm } from "react-hook-form";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
// const img_bb_key = import.meta.env.IMAGE_API_KEY;
const img_bb_api = `https://api.imgbb.com/1/upload?key=de493b5e50a5e8e960c213364bcdc9e7`;
const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    //image upload and get url
    const imageFile = { image: data.image[0] };
    const res = await axiosSecure.post(img_bb_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const productInfo = {
        name: data.name,
        description: data.description,
        price: data.price,
        image: res.data.data.display_url,
      };
      const productRes = await axiosSecure.post("/product", productInfo);
      if (productRes.data.insertedId) {
        // show a success toast
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <input
            type="name"
            placeholder="name"
            className="input input-bordered"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="description"
            className="input input-bordered"
            {...register("description", { required: true })}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="price"
            className="input input-bordered"
            {...register("price", { required: true })}
          />
        </div>
        <div className="form-control">
          <input
            type="file"
            placeholder="Upload Image "
            className="input input-bordered"
            {...register("image", { required: true })}
          />
        </div>
        <div className="form-control mt-6">
          <input
            className="btn btn-primary"
            type="submit"
            value="Add Product"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
