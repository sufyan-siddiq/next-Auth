import React, { useEffect } from "react";
const Error = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <>
      <h2>Something Went Wrong!</h2>
      <button>sa
      </button>
    </>
  );
};
export default Error;
