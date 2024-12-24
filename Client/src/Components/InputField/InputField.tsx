import React from "react";
import { Field, ErrorMessage } from "formik";
import "./InputField.css";
import { InputFieldProps } from "../../Types/InputFieldProps";

const InputField: React.FC<InputFieldProps> = ({name, type = "text", placeholder,}) => (
  <div className={`form-container-${name}`}>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="form-field"
    />
    <ErrorMessage component="span" name={name} className="form-error" />
  </div>
);

export default InputField;
