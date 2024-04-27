import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { BiLoaderCircle } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";
import "./Uploader.css";

const Uploader = ({ setImage, image, onData}) => {
  const EnviarFotoComponentePai = (file) => {
    onData(file);
  };

  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback((acceptedFiles) => {
    console.log("teste");
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="uploader-container">
      <div className="uploader">
        <Dropzone onDrop={(acceptedFiles) => EnviarFotoComponentePai(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                className="container-text-dentro-uploader"
                {...getRootProps()}
              >
                <span className="uploader-span">
                  <FiUploadCloud
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontSize: "3rem",
                      color: "rgb(102 181 163)",
                    }}
                  />
                </span>
                <p className="text-dentro-uploader">Drop sua Imagem aqui</p>
                <em
                  style={{
                    fontSize: "1.5rem",
                    lineHeight: "1rem",
                    color: " #9CA3AF",
                  }}
                >
                  (Apenas *.jpeg e *.png extensões de imagem sao permitidas)
                </em>
              </div>
            </section>
          )}
        </Dropzone>
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
