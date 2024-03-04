
import { Spinner } from 'components/ui/Spinner';
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "../../helpers/api";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "components/ui/Button";
import "styles/views/EditPage.scss";
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormField = props => {
  return (
    <div className="editPage field">
      <label className="editPage label">
        {props.label}
      </label>
      <input
        className="editPage input"
        placeholder="enter here.."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};
FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const DateField = props => {
  return (
    <div className="editPage field">
      <label className="editPage label">
        {props.label}
      </label>
      <DatePicker
        className="editPage input"
        selected={props.value} // Use 'value' instead of 'selected'
        onChange={(date) => props.onChange(date)} // Assuming 'onChange' is a function that handles date change
        //type={"date"}/>
      />
    </div>
  );
};

DateField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
};

const EditPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [birthdate, setBirthdate] = useState(null);

  useEffect(() => {

    /*const save = async () => {
      try {
        const requestBody = JSON.stringify({ username, birthdate });
        await api.put(`/users/${userId}`, requestBody);
        navigate(`/game/userpage/${userId}`);
      } catch (error) {
        console.error(`Error updating user: ${handleError(error)}`);
      }
    };*/
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

  function save() {
    try {
      const requestBody = JSON.stringify({ username, birthdate });
      api.put(`/users/${userId}`, requestBody);
      navigate(`/game/userpage/${userId}`);
    } catch (error) {
      console.error(`Error updating user: ${handleError(error)}`);
    }
  }

  return (
    <BaseContainer className="game container">
      <h1>Profile Page</h1>

      {<div className="user-profile">
        <h2>Edit Profile</h2>
        <FormField
          label="Username"
          value={localStorage.getItem("username")}
          onChange={un => setUsername(un)}
        />
        <DateField
          label="Birthday"
          value={localStorage.getItem("birthdate") ? new Date(localStorage.getItem("birthdate")) : null}
          onChange={un => setBirthdate(un)}
        />
      </div>}

      <div className='button-container'>

        <Button
          width="100%"
          onClick={() => save()}
          disabled={!username}
        >
          Save
        </Button>

        <Button

          width="100%"

          onClick={() => navigate("/game")}

        >

          Back to Overview

        </Button>

      </div>


    </BaseContainer>
  );
};
export default EditPage;