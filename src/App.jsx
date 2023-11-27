import { useForm, Controller } from "react-hook-form";
import { FaUsers } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function App() {
  const { handleSubmit, control, register, setValue, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      });
  };

  return (
    <>
      <div>
        <Link to="/allUsers">
          <div className="flex items-center shadow-xl p-4 w-fit ml-12 hover:bg-green-300">
            <MdKeyboardDoubleArrowLeft />
            <span className="mx-1">All Users</span> <FaUsers />
          </div>
        </Link>
        <div className="mt-8">
          <p className="text-center text-lg font-bold">New User</p>
          <p className="text-center text-md mb-6">
            Use the below form to create a new account
          </p>

          <div className="bg-gray-300 max-w-md mx-auto rounded p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  className="w-full border p-2 rounded"
                  {...register("name")}
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  className="w-full border p-2 rounded"
                  {...register("email")}
                />
              </div>

              <div className="">
                {/* Radio Button  1*/}
                <div className="mb-4 mr-12">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gender:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="options"
                      value="male"
                      className="mr-2"
                      {...register("radioOption1")}
                    />
                    <label htmlFor="option1" className="text-sm">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id="female"
                      name="options"
                      value="female"
                      className="mr-2"
                      {...register("radioOption1")}
                    />
                    <label htmlFor="option2" className="text-sm">
                      Female
                    </label>
                  </div>
                </div>

                {/* Radio Button  2*/}
                <div className="mb-4 ">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Status:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="active"
                      name="options"
                      value="active"
                      className="mr-2"
                      {...register("radioOption2")}
                    />
                    <label htmlFor="option1" className="text-sm">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id="inactive"
                      name="options"
                      value="inactive"
                      className="mr-2"
                      {...register("radioOption2")}
                    />
                    <label htmlFor="option2" className="text-sm">
                      Inactive
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
