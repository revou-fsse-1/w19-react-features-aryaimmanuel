import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useLocalStorage } from "./Auth/LocalStorage";

interface FormAdd {
  name: string;
  status: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

function AddCategory() {
  const navigate = useNavigate();
  const [token] = useLocalStorage("token");
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormAdd) {
    setLoadingSubmit(true);

    try {
      await axios.post(
        "https://mock-api.arikmpt.com/api/category/create",
        {
          name: data.name,
          is_active: data.status === "Active" ? true : false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
            <div>
              <h1>Add New Category</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} action="#">
              <div>
                <label>Name:</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="name"
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
                <label>Status:</label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue="Active"
                  render={({ field }) => (
                    <>
                      <select
                        id="status"
                        onChange={field.onChange}
                        value={field.value}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      {errors?.status && <p>{errors.status.message}</p>}
                    </>
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={loadingSubmit}
                onSubmit={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCategory;
