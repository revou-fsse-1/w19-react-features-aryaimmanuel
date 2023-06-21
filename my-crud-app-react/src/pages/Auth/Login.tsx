import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";

interface LoginProps {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();

function Login() {
  const [submitLogin, setSubmitLogin] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(formData: LoginProps) {
    setSubmitLogin(true);
    try {
      const response = await axios.post(
        "https://mock-api.arikmpt.com/api/user/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("token", response.data.data.token);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section>
      <div>
        <div>
          <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} action="#">
              <div>
                <label>Email:</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder=""
                      />
                      {errors?.email && <p>{errors.email.message}</p>}
                    </>
                  )}
                />
              </div>
              <div>
                <label>Password:</label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder=""
                      />
                      {errors?.password && <p>{errors.password.message}</p>}
                    </>
                  )}
                />
              </div>
              <button
                type="submit"
                disabled={submitLogin}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
              <p>
                Doesn't have an account?
                <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
