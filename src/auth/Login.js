import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../slice/userApi";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
      <h2 className="title">Sign in</h2>

      {/* Username Field */}
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          {...register("email", {
            required: "Username is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Username must be a valid email id",
            },
          })}
        />
      </div>
      {errors.email && (
        <span className="error w-full max-w-[380px] ml-5 text-red-500 font-normal">
          {errors.email.message}
        </span>
      )}

      {/* Password Field */}
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
      </div>
      {errors.password && (
        <span className="error w-full max-w-[380px] ml-5 text-red-500 font-normal">
          {errors.password.message}
        </span>
      )}

      {/* {user.loginError && (
        <span className="error w-full max-w-[380px] ml-5 text-red-500 font-normal">
          {user.loginError}
        </span>
      )} */}

      <input type="submit" value="Login" className="btn solid" />
    </form>
  );
}

export default Login;
