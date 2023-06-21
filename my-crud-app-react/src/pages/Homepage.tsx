import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "./Auth/LocalStorage";

type Category = {
  id: string;
  name: string;
  is_active: boolean;
};

function Homepage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadHomepage, setLoadHomepage] = useState<boolean>(true);
  const navigate = useNavigate();
  const [token] = useLocalStorage("token");

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        "https://mock-api.arikmpt.com/api/category",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories(data.data);
      setLoadHomepage(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = (id: string) => async () => {
    try {
      await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    navigate("/add");
  };

  const handleEdit = (id: string) => () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
    }
  }, [token]);

  return (
    <section>
      <div>
        <h2>List of Category</h2>
        <div>
          <button onClick={handleAdd}>Add New Category</button>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {loadHomepage}
              {categories.map((category) => (
                <thead>
                  <tr>
                    <th>{category.id}</th>
                    <th>{category.name}</th>
                    <th>{category.is_active ? "Active" : "Inactive"}</th>
                    <th>
                      <button onClick={handleEdit(category.id)}>Edit</button>
                      <button onClick={handleDelete(category.id)}>
                        Delete
                      </button>
                    </th>
                  </tr>
                </thead>
              ))}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Homepage;
