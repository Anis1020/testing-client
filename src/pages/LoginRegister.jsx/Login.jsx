import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
            {...register("email")}
          />
          {errors.firstName?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        <div className="form-control">
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>

        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Login" />
        </div>
      </form>
      <div>
        <Link to={"/register"}>
          <button className="btn btn-link">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
