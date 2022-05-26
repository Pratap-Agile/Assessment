import React from "react";
import { useParams } from "react-router";

const Edit_location = () => {
  const { id } = useParams();
  return (
    <div>
      Edit_location
      <form>
        <label htmlFor="firstname">firstname:- </label>
        <input type="text" id="firstname" />
        <br />
        <br />
        <label htmlFor="lastname">lastname:- </label>
        <input type="text" id="lastname" />
        <br />
        <br />
        <label htmlFor="email">email:- </label>
        <input type="email" id="email" />
        <br />
      </form>
    </div>
  );
};

export default Edit_location;
