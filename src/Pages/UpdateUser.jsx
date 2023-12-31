import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateUser = ({ singleUser }) => {
  const [updatedUser, setUpdatedUser] = useState();
  console.log(singleUser);

  const { handleSubmit, control, register, setValue, reset } = useForm();

  const onSubmit = (data) => {
    fetch(`http://localhost:5000/users/${singleUser?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          reset();
        }
      });
  };

  return (
    <div>
      <div className="modal-box w-[800px]">
        <h3 className="font-bold text-lg">{singleUser?.name}</h3>
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
                defaultValue={singleUser?.name}
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
                defaultValue={singleUser?.email}
                {...register("email")}
              />
            </div>

            {/* image Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Photo Url:
              </label>
              <input
                className="w-full border p-2 rounded"
                defaultValue={singleUser?.url}
                {...register("url")}
              />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Update{" "}
              </button>
            </div>
          </form>
        </div>

        <div className="modal-action">
          <label htmlFor="my_modal_6" className="btn btn-secondary">
            Close!
          </label>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
