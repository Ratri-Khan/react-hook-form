import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { AuthContext } from "../../providers/AuthProviders";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const imageApi = import.meta.env.VITE_IMGKEY;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const formData = new FormData();
    const photo = data.image[0];
    formData.append("image", photo);

    fetch(`https://api.imgbb.com/1/upload?key=${imageApi}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        createUser(data.email, data.password).then((result) => {
          const loggedUser = result.user;
          reset();
          console.log(loggedUser);
          updateUserProfile(data.name, res.data.url).then(() => {
            reset();
            navigate(from, { replace: true })
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
            setError("An error occurred while updating the user profile.");
          });
        })
        .catch((error) => {
            console.error("Error creating user:", error);
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
              setError(
                "This email already has an account, please sign up with a unique email."
              );
            }
          });
      })
  };

  return (
    <div className="hero min-h-screen backgroundImg">
      <div className="hero-content">
        <div className="wrapper">
          <h1>SIGN UP</h1>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <input
                type="text"
                placeholder="Name"
                className="inputBox"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-yellow-500">This field is required</span>
              )}
            </div>
            <div className="form-control" style={{ flexDirection: "column" }}>
              <input
                type="email"
                placeholder="email"
                className="inputBox"
                {...register("email", { required: true })}
                required
              />
              {errors.email && (
                <span className="text-yellow-500">This field is required</span>
              )}
            </div>
            <div className="form-control" style={{ flexDirection: "column" }}>
              <input
                type="password"
                placeholder="password"
                className="inputBox"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-yellow-500">This field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-yellow-500">
                  {" "}
                  password must be 6 character
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-yellow-500">
                  {" "}
                  cannot use a password longer than 20 characters.
                </span>
              )}
            </div>
            <div className="form-control" style={{ flexDirection: "column" }}>
              <input
                type="file"
                {...register("image", { required: true })}
                className="inputBox"
              />
              {errors.image?.type === "required" && (
                <span className="text-yellow-500">This field is required</span>
              )}
            </div>
            <div>
              <p className="font-bold text-xs text-yellow-500">{error}</p>
            </div>
            <div className="form-control mt-6">
              <button className="inputBox">Sign Up</button>
            </div>
            <p>
              Already Have An Account?{" "}
              <span className="font-bold ">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
