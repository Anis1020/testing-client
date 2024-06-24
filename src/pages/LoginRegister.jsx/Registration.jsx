import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const userInfo = {
      name: data.name,
      email: data.email,
    };
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate("/");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        <div className="form-control">
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        <div className="form-control">
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Register" />
        </div>
      </form>
      <div>
        <Link to={"/login"}>
          <button className="btn btn-link">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
