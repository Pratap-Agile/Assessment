import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Card, Select, Alert, Spin } from "antd";
import classes from "./EditLocation.module.css";
import { useParams } from "react-router";
import { API } from "../../API/API";
import { useHistory } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const EditLocation = () => {
  const history = useHistory();
  const { id } = useParams();
  const [placeImage, setPlaceImage] = useState({});
  const [placeName, setPlaceName] = useState({});
  const [placeAddress, setPlaceAddress] = useState({});
  const [placePhoneNumber, setPlacePhoneNumber] = useState();
  const [placeWebsite, setPlaceWebsite] = useState();
  const [placeVerify, setPlaceVerify] = useState({});
  const [placePremium, setPlacePremium] = useState({});

  const [sport, setSport] = useState({});
  const [allSport, setAllSport] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const token = localStorage.getItem("access_token");
  //getplace details api header
  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("placeId", id);
  //getplace details end

  //Sport data start
  const myHeadersSport = new Headers();
  myHeadersSport.append("Content-Type", "application/json");
  myHeadersSport.append("Authorization", token);

  const rawSport = JSON.stringify({
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
  });

  //sport data end

  // //EDit update Start
  // const myHeadersEdit = new Headers();
  // myHeadersEdit.append("Authorization", token);
  // myHeadersEdit.append("Content-Type", "application/json");

  // const requestOptionsEdit = {
  //   headers: myHeadersEdit,
  //   body: rawEdit,
  // };
  //Edit End

  useEffect(() => {
    // edit get data on input
    setIsLoading(true);
    fetch(`${API}/admin/api/getPlaceDetails`, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    })
      .then((response) => response.json())
      .then((result) => {
        setPlaceImage(result.data?.images[0].url);
        setPlaceName(result.data.name);
        setPlaceAddress(result.data.address);
        setPlacePhoneNumber(result.data.placeContact);
        setPlaceWebsite(result.data.placeWebsite);
        setPlaceVerify(result.data.isVerified);
        setPlacePremium(result.data.isPremium);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error);
      });

    fetch(`${API}/admin/api/getSportsList`, {
      method: "POST",
      headers: myHeadersSport,
      body: rawSport,
    })
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error);
      });

    // All get sport api fetch
    fetch(`${API}/admin/api/getAllSports`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((result) => {
        setAllSport(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error);
      });
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    const rawEdit = JSON.stringify({
      // placeId: id,
      // sportIds: sport,
      // isVerified: placeVerify,
      // isPremium: placePremium,

      placeId: "6113b967be89c551f492c415",
      sportIds: ["605c68795b3a1e3260cf2a23", "60e3ddff02e66a45d5e87e64"],
      isVerified: true,
      isPremium: false,
    });

    axios({
      method: "post",
      url: `${API}/admin/api/editPlace`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded"
      },
      data: rawEdit,
    })
      .then(function (response) {
        setIsLoading(false);
        alert("place updated succesfully!");
        history.push("/location");
      })
      .catch(function (error) {
        setHasError(true);
      });
    setIsLoading(false);
  };

  const backHandler = () => {
    history.push("/location");
  };
  const imageHandleChange = (e) => {
    setPlaceImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeSelect = (value, e) => {
    setSport(`selected ${value}`);
  };

  const verifyCheck = () => {
    var checkBox = document.getElementById("myCheckVerify");
    if (checkBox.checked == true) {
      setPlaceVerify(true);
    } else {
      setPlaceVerify(false);
    }
  };

  const premiumCheck = () => {
    var checkBox = document.getElementById("myCheckPremium");
    if (checkBox.checked == true) {
      setPlacePremium(true);
    } else {
      setPlacePremium(false);
    }
  };

  if (!token) {
    history.push("/login");
  }

  return (
    <div>
      <Card className={classes.main_div}>
        <h1 className={classes.label}>Edit Location's Available Sports</h1>
        {hasError && <Alert message="something went wrong" type="error" />}
        {isLoading && (
          <Spin tip="Loading...">
            <Alert
              message="Loading data.."
              description="Please wait for minute or refresh the page."
              type="Server Issue"
            />
          </Spin>
        )}
        {!isLoading && (
          <form>
            <div className={classes.view_text}>
              <label>Select Place Image</label>
              <div>
                <img
                  src={placeImage}
                  height="100px"
                  width="100px"
                  style={{
                    borderRadius: "5px",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                />
                <br />
                <input
                  type="file"
                  onChange={imageHandleChange}
                  style={{ paddingLeft: "60px" }}
                />
              </div>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Place Name </label>
              <input
                style={{ background: "#E4E7EA" }}
                type="text"
                name="name"
                placeholder="Place Name"
                disabled
                onChange={(e) => setPlaceName(e.target.value)}
                value={placeName}
              />
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Place Address </label>
              <input
                style={{ background: "#E4E7EA" }}
                type="text"
                placeholder="Place Address"
                onChange={(e) => setPlaceAddress(e.target.value)}
                disabled
                value={placeAddress}
              />
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>
                Place Phone Number{" "}
              </label>
              <input
                type="number"
                placeholder="Place Phone Number"
                onChange={(e) => setPlacePhoneNumber(e.target.value)}
                value={placePhoneNumber}
              />
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Place Website </label>
              <input
                type="text"
                placeholder="Place Website"
                value={placeWebsite}
                onChange={(e) => setPlaceWebsite(e.target.value)}
              />
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>
                Select Available Sports
              </label>
              <Select
                mode="multiple"
                placeholder="Select Sport Name"
                allowClear
                style={{
                  width: "30%",
                }}
                defaultValue={sport?.data?.data[0]?.name}
                onChange={handleChangeSelect}
              >
                {allSport?.map((text) => (
                  <Option key={text?._id} value={text?._id}>
                    {text.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>Verify Location</label>
              <input
                type="checkbox"
                checked={placeVerify}
                id="myCheckVerify"
                onChange={verifyCheck}
              />
            </div>

            <div className={classes.view_text}>
              <label className={classes.view_text_title}>
                Premium Location
              </label>
              <input
                type="checkbox"
                checked={placePremium}
                id="myCheckPremium"
                onChange={premiumCheck}
              />
            </div>
            <div className={classes.view_text}>
              <button
                className={classes.update_button}
                type="submit"
                onClick={updateHandler}
              >
                Update
              </button>
              <input
                className={classes.update_button}
                type="button"
                value="Back"
                onClick={backHandler}
              />
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default EditLocation;
