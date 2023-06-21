import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();

function Register() {
  const [submitRegister, setSubmitRegister] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(userData: RegisterProps) {
    setSubmitRegister(true);
    try {
      await axios.post("https://mock-api.arikmpt.com/api/user/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <div>
        <div>
          <div>
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit(onSubmit)} action="#">
              <div>
                <label>Name:</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder=""
                      />
                      {errors?.name && <p>{errors.name.message}</p>}
                    </>
                  )}
                />
              </div>
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
                disabled={submitRegister}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
              <p>
                Already have an account ?<Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
