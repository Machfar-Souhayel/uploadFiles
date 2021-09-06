import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";

const FileUpload = () => {
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChangeHandler = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      console.log({ file, fileName });
    } else {
      setFile({});
      setFileName("Choose File");
      setUploadedFile({});
      console.log({ file, fileName });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const fromData = new FormData();
    fromData.append("file", file);
    try {
      const res = await axios.post("/upload", fromData, {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          setTimeout(() => setUploadPercentage(0), 1000);
        },

        // Clear percentage
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage("File uploaded");
    } catch (error) {
      if (error.response.status === 500)
        setMessage("There was a problem with the server");
      else {
        setMessage(error.response.data.msg);
      }
    }
  };

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4">
          <label htmlFor="formFile" className="form-label">
            {fileName}
          </label>
          <input
            className="form-control"
            type="file"
            name="file"
            id="formFile"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={onChangeHandler}
          />
        </div>
        <Progress percentage={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          disabled={fileName === "Choose File"}
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div>
          file name {uploadedFile.fileName} <br />
          File name {uploadedFile.filePath}
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;
