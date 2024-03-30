import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { BiLoaderCircle } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";
import "./Uploader.css";

const Uploader = ({ setImage, image }) => {
  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback(async (acceptedFiles) => {
    toast.error("This feature is not available yet");
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  return (
    <div className="uploader-container">
      <div className="uploader" {...getRootProps()}>
        <input {...getInputProps()} />
        <span className="uploader-span">
          <FiUploadCloud className="text-3xl text-subMain" />
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em
          style={{ fontSize: "0.75rem", lineHeight: "1rem", color: " #9CA3AF" }}
        >
          (Only *.jpeg and *.png images will be accepted)
        </em>
      </div>
      {/* image preview */}
      <div className="image-preview-container">
        {loading ? (
          <div className="image-preview">
            <BiLoaderCircle className="loader-icon" />
            <span
              style={{
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
              }}
            >
              Uploading...
            </span>
          </div>
        ) : (
          <img
            src={image ? image : "http://placehold.it/300x300"}
            alt="preview"
            className="image-preview-perfil"
          />
        )}
      </div>
    </div>
  );
};

export default Uploader;
