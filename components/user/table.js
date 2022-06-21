import React from "react";
import { deleteUser } from "../../helpers/api-utils";
import Toast from "../UI/toast";

function UserTable(props) {
  const { admins } = props;

  function deleteHandler(user) {
    Toast({
      icon: "info",
      title: "Delete Admin?",
      content: "The user will be deleted permanently",
      showConfirmButton: "Yes, Delete",
      confirmHandler: async () => {
        try {
          const result = await deleteUser(user._id);
          if (result) {
            Toast({
              icon: "success",
              title: "Deleted!",
              content: "Selected User was deleted",
              timer: 5000,
            });
            props.setAction(props.action + 1);
          }
        } catch (error) {
          Toast({
            icon: "error",
            title: "Error",
            content: "Something went wrong while deleting.",
            timer: 5000,
          });
        }
      },
    });
  }

  function updateHandler(user) {
    props.setUser(user);
  }

  return (
    <div className="card p-5">
      <table className="table table-stripe">
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button
                  onClick={deleteHandler.bind(this, item)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="fa fa-trash"></i>
                </button>{" "}
                <button
                  onClick={updateHandler.bind(this, item)}
                  className="btn btn-warning btn-sm"
                >
                  <i className="fa fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
