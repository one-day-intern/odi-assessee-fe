import React, { useState } from "react";

const useLoginHandler = () => {

  const [data, setData] = useState<LoginDetails>({
    email: "",
    password: "",
    remember: false
  });
  

  const [errors, setErrors] = useState<LoginTextFields>({
    email: "",
    password: "",
  });

  const setDataValue = (dataField: string, value: string | boolean) => {
    setData(prev => ({
      ...prev,
      [dataField]: value
    }))
  }

  const setErrorValue = (errorField: string, value: string) => {
    setErrors(prev => ({
      ...prev,
      [errorField]: value
    }))
  }

  return { data, errors, setDataValue, setErrorValue };
};

export { useLoginHandler };
