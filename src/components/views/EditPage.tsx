import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "../../helpers/api";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Register.scss";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormField = (props) => {
  return (
    <div className="register field">
      <label className="register label">{props.label}</label>
      <input
        className="register input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const DateField = (props) => {
  return (
    <div className="register field">
      <label className="register label">{props.label}</label>
      <DatePicker
        className="register input"
        selected={props.value} // Use 'value' instead of 'selected'
        onChange={(date) => props.onChange(date)} // Assuming 'onChange' is a function that handles date change
      />
    </div>
  );
};

DateField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

const EditPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(`Error fetching user: ${handleError(error)}`);
      }
    }

    fetchData();
  }, [userId]);

  if (!user) {
    return <Spinner />;
  }

  async function save() {
    try {
      const token = localStorage.getItem("token");
      const requestBody = JSON.stringify({ username, birthdate, token });
      await api.put(`/users/${userId}`, requestBody);
      navigate(`/game/userpage/${userId}`);
    } catch (error) {
      console.error(`Error updating user: ${handleError(error)}`);
    }
  }

  return (
    <>
      {userId === localStorage.getItem("userId") ? (
        <BaseContainer className="game container">
          <h1>Profile Page</h1>

          {
            <div className="user-profile">
              <h2>Edit Profile</h2>
              <FormField
                label="Username"
                value={username}
                onChange={(un) => setUsername(un)}
              />
              <DateField
                label="Birthdate"
                value={birthdate}
                onChange={(un) => setBirthdate(un)}
              />
            </div>
          }

          <div className="button-container">
            <Button
              width="100%"
              onClick={() => save()}
              disabled={!username && !birthdate}
            >
              Save
            </Button>

            <Button width="100%" onClick={() => navigate("/game")}>
              Back to Overview
            </Button>
          </div>
        </BaseContainer>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default EditPage;
