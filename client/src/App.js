import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import ExperienceForm from "./components/experienceForm";
import ExperienceDisplay from "./components/experienceDisplay";
import CollectionForm from "./components/collectionForm";
import "./App.css";

function App() {
  const [experienceData, setExperienceData] = useState();
  const [user, setUser] = useState();

  function checkToken() {
    return (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    );
  }

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
        date: form[1].value,
        location: form[2].value,
        description: form[3].value,
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

      e.target.reset();
      e.target[0].focus();
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
          handleExperienceData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  /**
   * Delete an experience
   * @param {number} id - unqiue experience identifier 
   */
  function removeExperience(id) {
    const options = {
      method: "get",
      url: `http://localhost:5000/deleteExperience/${id}`,
      headers: {
        "Content-type": "application/json",
      },
    };

    axios(options)
      .then((res) => {
        if (!res.data.error) {
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
    if (!data.message) {
      let expereinceArray = [];
      let rowCounter = 1;
      data.forEach((experience) => {
        expereinceArray.push(
          <tr key={experience._id}>
            <th scope="row">{rowCounter}</th>
            <td>{experience.title}</td>
            <td>{experience.date}</td>
            <td>{experience.location}</td>
            <td>{experience.description}</td>
            <td type="button" onClick={() => removeExperience(experience._id)} className="btn btn-sm">x</td>
          </tr>
        );
        rowCounter++;
      });
      setExperienceData(expereinceArray);
    } else {
      setExperienceData();
    }
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

  function handleCreateCollection(e) {
    e.preventDefault();
    const form = e.target;

    const options = {
      method: "post",
      url: "http://localhost:5000/createCollection",
      data: {
        title: form[0].value,
        experiences: [],
        userId: user.id,
      },
      headers: {
        "Content-type": "application/json",
      },
    };

    axios(options)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));

      e.target.reset();
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchExperience();
    // eslint-disable-next-line
  }, [user]);



  return (
    <div className="App">
      <Navbar />
      {checkToken() ? (
        <div className="container-fluid" style={{ maxWidth: '1500px' }}>
          <CollectionForm handleCreateCollection={handleCreateCollection}/>
          <div className="row">
            <ExperienceForm handleCreateExperience={handleCreateExperience}/>
            <ExperienceDisplay experiences={experienceData}/>
          </div>
        </div>
      ) : (
        <div className='container-fluid' style={{ maxWidth: '500px' }}>
          <p>
            Log in/Sign up to log and keep track of your favorite life experiences
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
