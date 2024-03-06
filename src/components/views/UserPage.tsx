import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import { api, handleError } from "../../helpers/api";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/UserPage.scss";

const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
        console.log(user);
        localStorage.setItem("token", user.token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
      } catch (error) {
        console.error(`Error fetching user: ${handleError(error)}`);
      } finally {
        setLoading(false); // Set loading state to false after fetching data (whether success or error)
      }
    }

    fetchData();
  }, []);

  if (!user) {
    return <Spinner />;
  }

  return (
    <BaseContainer>
      <div className="register container">
        <div className="profile form">
          <h2>Profile</h2>
          <div>
            <div>Username: {user.username}</div>
            <div>Status: {user.status}</div>
            <div>Creation date: {user.creation_date.split("T")[0]}</div>
            <div>
              Birthday:{" "}
              {user.birthdate
                ? (() => {
                  const dateParts = user.birthdate.split("T")[0].split("-");
                  const originalDate = new Date(
                    dateParts[0],
                    dateParts[1] - 1,
                    dateParts[2]
                  );
                  const nextDay = new Date(originalDate);
                  nextDay.setDate(originalDate.getDate() + 1);
                  return nextDay.toLocaleDateString("en-GB");
                })()
                : "YYYY-MM-DD"}
            </div>
          </div>
          <div className="register button-container">
            <Button
              disabled={localStorage.getItem("userId") !== userId}
              width="100%"
              onClick={() => navigate(`/game/userpage/${userId}/edit`)}
            >
              Edit
            </Button>
            <Button width="100%" onClick={() => navigate("/game")}>
              Return to Dashboard!
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};
export default UserPage;
