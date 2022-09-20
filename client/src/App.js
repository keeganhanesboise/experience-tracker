import "./App.css";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [experienceData, setExperienceData] = useState();

  /**
   * Create new experience from form
   * @param {array} e - form data
   */
  function handleCreateExperience(e) {
    e.preventDefault();

    const form = e.target;

    const options = {
      method: "post",
      url: "http://localhost:5000/createExperience",
      data: {
        title: form[0].value,
        location: form[1].value,
        description: form[2].value,
        userId: user.id,
      },
      headers: {
        "Content-type": "application/json",
      },
    };

    axios(options)
      .then((res) => {
        if (res.data.message) {
          fetchExperience();
        }
      })
      .catch((err) => console.log(err));
  }

  /**
   * Create and set experience JSX elements
   * @param {array} data - users experiences
   */
  function handleExperienceData(data) {
    let expereinceArray = [];
    data.forEach((experience) => {
      expereinceArray.push(
        <div key={experience._id}>
          <h3>{experience.title}</h3>
          <h3>{experience.location}</h3>
          <h3>{experience.description}</h3>
        </div>
      );
    });
    setExperienceData(expereinceArray);
  }

  /**
   * Fetch logged in user
   */
  function fetchUser() {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      const options = {
        method: "get",
        url: "http://localhost:5000/getUserInfo",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };

      axios(options)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }

  /**
   * Fetch experiences for logged in user
   */
  async function fetchExperience() {
    if (user) {
      const options = {
        method: "get",
        url: `http://localhost:5000/fetchExperience/${user.id}`,
        headers: {
          "Content-type": "application/json",
        },
      };

      axios(options)
        .then((res) => {
          if (!res.data.message) {
            handleExperienceData(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchExperience();
  }, [user]);

  return (
    <div className="App">
      <Navbar />
      {localStorage.getItem("token") ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <form onSubmit={(e) => handleCreateExperience(e)}>
                <div className="mb-3">
                  <label htmlFor="experienceTitle" className="form-label">
                    Title
                  </label>
                  <input
                    required
                    className="form-control"
                    id="experienceTitle"
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="experienceLocation" className="form-label">
                    Location
                  </label>
                  <input
                    className="form-control"
                    id="experienceLocation"
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="experienceDescription" className="form-label">
                    Description
                  </label>
                  <input
                    className="form-control"
                    id="experienceDescription"
                  ></input>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Create Experience"
                />
              </form>
            </div>
            <div className="col-8">{experienceData}</div>
          </div>
        </div>
      ) : (
        <div>
          Log in/Sign up to log and keep track of your favorite experiences
        </div>
      )}
    </div>
  );
}

export default App;
