import React, { Fragment, useState } from "react";
import "./fileUpload.css";
import Axios from "axios";
import Model1 from "./Model1";
import Modal2 from "./modal";
import Modal from "./Modal";
import NewModal from "./NewModal";
const FileUpload = () => {
  const [file, setFile] = useState({});
  const [uploadedFile, setUploadedFile] = useState({});

  const onClickHnadler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("File", file);
    try {
      const res = await Axios.post("http://localhost:5000/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //here we take back file data from response
      const { filename, path } = res.data;
      setUploadedFile({ filename, path });
      console.log("Uploaded File: ====> ", uploadedFile);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Fragment>
      <form>
        <div className="container">
          <h1 className="part">Upload Your File 🔼</h1>
          <input
            type="file"
            id="customeFile"
            className="part"
            onChange={(event) => setFile(event.target.files[0])}
          />
          <input
            type="submit"
            value="Upload"
            className="part uploadButton"
            onClick={onClickHnadler}
          />
        </div>
      </form>
      <Model1 />
      <Modal2 />
      <Modal />
      <NewModal />
    </Fragment>
  );
};

export default FileUpload;
