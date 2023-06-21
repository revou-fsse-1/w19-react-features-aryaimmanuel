import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./Auth/LocalStorage";

interface FormEdit {
  name: string;
  status: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

function EditCategory() {
  const [loadingEdit, setLoadingEdit] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [token] = useLocalStorage("token");
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function fetchCategory() {
    try {
      const { data } = await axios.get(
        `https://mock-api.arikmpt.com/api/category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLoadingEdit(false);

      reset({
        name: data.data.name,
        status: data.data.is_active ? "Active" : "Inactive",
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmit(userData: FormEdit) {
    setLoadingSubmit(true);

    try {
      await axios.put(
        "https://mock-api.arikmpt.com/api/category/update",
        {
          id: id,
          name: userData.name,
          is_active: userData.status === "Active" ? true : false,
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

  useEffect(() => {
    if (token) {
      fetchCategory();
    }
  }, [token]);

  return (
    <section>
      <div>
        <div>
          <div>
            <div>
              <h1>Edit Category</h1>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} action="#">
              {loadingEdit} :
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
                      />
                      {errors?.name && <p>{errors.name.message}</p>}
                    </>
                  )}
                />
              </div>
              ;
              <div>
                <label htmlFor="status">Status:</label>
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

export default EditCategory;
