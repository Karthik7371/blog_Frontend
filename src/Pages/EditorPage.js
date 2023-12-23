import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

const EditorPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch("https://blog-syj3.onrender.com/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setFiles(postInfo.file);
      });
    });
  }, [id]);

  async function editPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("summary", summary);
    data.set("id", id);

    if (files?.[0]) {
      data.set("files", files?.[0]);
    }

    e.preventDefault();

    const response = await fetch("https://blog-syj3.onrender.com/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      enqueueSnackbar("Edited Successfully...",{variant:'success'},{ autoHideDuration: 2000 })

      setRedirect(true);
    }else{
      enqueueSnackbar("Edited Failed...",{variant:'error'},{ autoHideDuration: 2000 })
    }
  }
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className="w-full ">
      <form onSubmit={editPost}>
        <input
          type="text"
          placeholder="Title"
          className=" md:my-4 w-full md:p-3 border-b-2 p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type={"text"}
          placeholder="Summary"
          className="my-4 w-full md:p-3 border-b-2 p-2"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        
        <input
          type={"file"}
          className="block  my-6 w-full md:px-4 md:py-2 px-2 py-1"
          onChange={(e) => setFiles(e.target.files)}
        />
        <Editor value={content} onChange={setContent} />

        <button
          className="bg-slate-600 px-4 py-2 my-5 rounded text-white w-full ease-in duration-300"
          type="submit"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};
export default EditorPage;
