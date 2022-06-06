import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { signOut } from "next-auth/client";
import Input from "../UI/input";
import Confirm from "../UI/confirm";
import { deleteArticle, publishArticle } from "../../helpers/api-utils";
import Toast from "../UI/toast";

function ProfileComp(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { title, content, _id } = props.article;

  const [textValue, setTextValue] = useState(content ? content : "");
  const [titleValue, setTitleValue] = useState(title ? title : "");

  function logoutHandler() {
    signOut();
  }

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  async function saveHandler() {
    setIsLoading(true);
    const htmlValueFromQuill =
      document.getElementsByClassName("ql-editor")[0].innerHTML;
    try {
      const result = await publishArticle(titleValue, htmlValueFromQuill);
      if (result) {
        setIsLoading(false);
        Toast({
          icon: "success",
          title: "Article Published!",
          content: "You can view other contents on Articles Page",
          timer: 2000,
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast({
        icon: "error",
        title: "Something went wrong!",
        content: error.message,
      });
    }
  }

  async function deleteHandler() {
    Confirm({
      title: "Are you sure you want to delete Article?",
      text: "Your Article will be permanently deleted.",
      icon: "warning",
      functionToYes: async () => {
        try {
          setIsLoading(true);
          const result = await deleteArticle(_id);
          if (result) {
            setIsLoading(false);
            Toast({
              icon: "success",
              title: "Article Published!",
              content: "You can view other contents on Articles Page",
              timer: 2000,
            });
          }
        } catch (error) {
          setIsLoading(false);
          Toast({
            icon: "error",
            title: "Something went wrong!",
            content: error.message,
          });
        }
      },
    });
  }

  return (
    <div>
      {isLoading && (
        <div className="row justify-content-center">
          <div className="spinner-border text-primary me-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading ...
        </div>
      )}
      <div className="container mt-5">
        <div className="card px-5 py-2">
          <div className="container">
            <Input
              label={"Title"}
              labelId={"title"}
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="container mt-2">
        <div className="card">
          <ReactQuill
            style={{ height: "50vh" }}
            value={textValue}
            onKeyPress={(e) => setTextValue(e.target)}
            modules={modules}
            formats={formats}
          />
        </div>
        <button
          className="btn btn-primary float-end mt-4 px-5 ms-2"
          id="custom-primary"
          onClick={saveHandler}
        >
          PUBLISH
        </button>

        <button
          className="btn btn-danger float-end mt-4 px-5"
          onClick={deleteHandler}
        >
          DELETE
        </button>
      </div>
      <div className="clearfix"></div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-1">
          <div className="row justify-content-center mt-3">
            <div className="col">
              <button
                onClick={logoutHandler}
                className="btn btn-primary"
                id="custom-primary"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
