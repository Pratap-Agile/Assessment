import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const Edit_location = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [sport, setsport] = useState({});
  console.log("sport", sport);
  console.log("User", user);

  var myHeaders = new Headers();
  const token = localStorage.getItem("access_token");

  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    // sport api code
    draw: 1,
    columns: [
      {
        data: "image",
        name: "",
        searchable: false,
        orderable: false,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "name",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "c",
          regex: false,
        },
      },
    ],
    order: [
      {
        column: 1,
        dir: "desc",
      },
    ],
    start: 0,
    length: 15,
    search: {
      value: "",
      regex: false,
    },

    // edit api code
    placeId: id,
    sportIds: ["605c68795b3a1e3260cf2a23", "60e3ddff02e66a45d5e87e64"],
    isVerified: true,
    isPremium: false,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  useEffect(() => {
    fetch("http://202.131.117.92:7100/admin/api/editPlace", requestOptions)
      .then((response) => response.text())
      .then((result) => setUser(JSON.parse(result)))
      .catch((error) => console.log("error", error));

    fetch("http://202.131.117.92:7100/admin/api/getSportsList", requestOptions)
      .then((response) => response.text())
      .then((result) => setsport(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      Edit_location
      <form>
        {/* <br />
        <label htmlFor="firstname">Place Image :- </label>
        <img src={sport?.data?.data[0]?.image} /> */}

        <br />
        <label htmlFor="firstname">Place Name :- </label>
        <input type="text" id="firstname" value={user?.data?.name} />
        <br />
        <br />
        <label htmlFor="lastname">Place Address:- </label>
        <input type="text" id="lastname" value={user?.data?.address} />
        <br />
        <br />
        <label htmlFor="email">Place Phone Number:- </label>
        <input type="email" id="email" value={user?.data?.placeContact} />
        <br />
        <br />
        <label htmlFor="email">Place Website:- </label>
        <input type="email" id="email" value={user?.data?.placeWebsite} />
        <br />
        <br />
        <label htmlFor="email">Select Available Sports:- </label>
        <select value={sport?.data?.data?.name}>
          {/* {sport.map((x) => ( */}
          <option>{sport?.data?.data[0]?.name}</option>
          {/* ))} */}
          {/* option ma map funtion use karvanu and select value display karvani */}
          {/* <option value=""></option> */}
        </select>

        <br />
        <label htmlFor="email">Checkbox varify:- </label>
        <input type="checkbox" checked={user?.data?.isVerified} />
        <br />

        <br />
        <label htmlFor="email">Checkbox Premium:- </label>
        <input type="checkbox" checked={user?.data?.isPremium} />
        <br />
      </form>
    </div>
  );
};

export default Edit_location;
