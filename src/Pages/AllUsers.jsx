import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaPencil } from "react-icons/fa6";

import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateUser from "./UpdateUser";

const AllUsers = () => {
  const loadedUser = useLoaderData();
  const [users, setUsers] = useState(loadedUser);
  const [singleUser, setSingleUser] = useState();
  const [loading, setLoading] = useState(false);

  const handleUpdate = (id) => {
    setLoading(true);
    const url = `http://localhost:5000/users/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSingleUser(data);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          });
      }
    });
  };
  return (
    <div>
      <Link to="/">
        <div className="flex items-center shadow-xl p-4 w-fit ml-12 hover:bg-green-300">
          <span className="mx-1">New User</span> <FaUser />
        </div>
      </Link>
      <div className="bg-gray-200 max-w-2xl mx-auto rounded p-6 mt-12">
        <p className="font-bold uppercase text-center mb-8">
          Total Number of User: {users.length}
        </p>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {users.map((user, index) => (
              <tbody key={user._id}>
                {/* row 1 */}
                <tr>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.radioOption1}</td>
                  <td>{user.radioOption2}</td>
                  <td className="flex">
                    <span
                      onClick={() => handleUpdate(user._id)}
                      className="bg-white w-fit p-1 shadow-xl text-purple-600 font-bold hover:bg-purple-600 hover:text-white cursor-pointer"
                    >
                      <label htmlFor="my_modal_6">
                        <FaPencil />
                      </label>
                    </span>
                    <span
                      onClick={() => handleDelete(user._id)}
                      className="bg-white w-fit p-1 shadow-xl mx-2 text-purple-600 font-bold hover:bg-purple-600 hover:text-white cursor-pointer"
                    >
                      <RxCross2 />
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <UpdateUser
              singleUser={singleUser}
              setSingleUser={setSingleUser}
              loading={loading}
            ></UpdateUser>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
