import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import ExperienceForm from "./components/experienceForm";
import ExperienceDisplay from "./components/experienceDisplay";
import CollectionForm from "./components/collectionForm";
import "./App.css";

function App() {
  const [collectionData, setCollectionData] = useState();
  const [experienceData, setExperienceData] = useState();
  const [collectionElements, setCollectionElements] = useState();
  const [collectionSelect, setCollectionSelect] = useState();
  const [user, setUser] = useState();

  function checkToken() {
    return (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    );
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
        getCollectionsAndExperiences()
          .then(([collections, experiences]) => {
            if (collections && experiences) {
              setCollectionData(collections);
              setExperienceData(experiences);
            }        
          })
      })
      .catch((err) => console.log(err));
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
      url: `http://localhost:5000/createExperience`,
      data: {
        title: form[0].value,
        date: form[1].value,
        location: form[2].value,
        description: form[3].value,
        collectionId: form[4].value,
        userId: user.id,
      },
      headers: {
        "Content-type": "application/json",
      },
    };

    axios(options)
      .then((res) => {
        getCollectionsAndExperiences()
          .then(([collections, experiences]) => {
            if (collections && experiences) {
              setCollectionData(collections);
              setExperienceData(experiences);
            }        
          })
      })
      .catch((err) => console.log(err));

    e.target.reset();
    e.target[0].focus();
  }

    /**
   * Delete a collection
   * @param {object} collection - entire collection object 
   */
    function removeCollection(collection) {
      let experiences = collection.experiences;
      if (experiences.length > 0) {
        experiences.forEach((experience) => {
          removeExperience(experience._id);
        });
      }

      const options = {
        method: "get",
        url: `http://localhost:5000/deleteCollection/${collection._id}`,
        headers: {
          "Content-type": "application/json",
        },
      };
  
      axios(options)
        .then((res) => {
          getCollectionsAndExperiences()
            .then(([collections, experiences]) => {
              if (collections && experiences) {
                setCollectionData(collections);
                setExperienceData(experiences);
              }        
            })
        })
        .catch((err) => console.log(err));
    }

  /**
   * Create new collection
   * @param {array} e 
   */
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
      .then((res) => {
        getCollectionsAndExperiences()
          .then(([collections, experiences]) => {
            if (collections && experiences) {
              setCollectionData(collections);
              setExperienceData(experiences);
            }        
          })
      })
      .catch((err) => console.log(err));

      e.target.reset();
  }

  /**
   * Create and set experience JSX elements
   * @param {array} data - users experiences
   */
  function handleExperienceData(data) {
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
    return expereinceArray;
  }

/**
 * Create and set collection JSX elements
 * @param {array} data - users collections
 */
    function handleCollectionData() {
      if (!collectionData.message) {
        let collectionArray = [];
        let collectionSelectArray = [];
        collectionData.forEach((collection) => {
          collectionSelectArray.push(
            <option key={collection._id} value={collection._id}>{collection.title}</option>
          );
          let experiences;
          if (collection.experiences.length > 0) {
            experiences = handleExperienceData(collection.experiences);
          }
          collectionArray.push(
            <div key={collection._id}>
              <h3>{collection.title}</h3>
              <button type="button" onClick={() => removeCollection(collection)} className="btn btn-outline-danger btn-sm">Remove</button>
              <table className="table">
                  <thead>
                      <tr>
                          <th scope="col"></th>
                          <th scope="col">Name</th>
                          <th scope="col">Date</th>
                          <th scope="col">Location</th>
                          <th scope="col">Description</th>
                          <th scope="col"></th>
                      </tr>
                  </thead>
                  <tbody>
                      {experiences}
                  </tbody>
              </table>
            </div>
          );
        });
        setCollectionElements(collectionArray);
        setCollectionSelect(collectionSelectArray);
      }
  }

  /**
   * Add experience to their corresponding collection
   */
  function combine() {
    if (!experienceData.message) {
      let tempCollectionData = collectionData;
      experienceData.forEach((experience) => {
        const collection = tempCollectionData.find(element => element._id === experience.collectionId);
        collection.experiences.push(experience);
      })
      setCollectionData(tempCollectionData);
    }
  }

  /**
  * Fetch experiences for logged in user
  */
  function fetchExperience() {
    if (user) {
      const options = {
        method: "get",
        url: `http://localhost:5000/fetchExperience/${user.id}`,
        headers: {
          "Content-type": "application/json",
        },
      };
  
      return axios(options)
        .then((res) => {return res.data})
        .catch((err) => console.log(err));
    }
  }

  /**
  * Fetch collections for logged in user
  */
    async function fetchAllCollections() {
    if (user) {
      const options = {
        method: "get",
        url: `http://localhost:5000/fetchAllCollections/${user.id}`,
        headers: {
          "Content-type": "application/json",
        },
      };

      return axios(options)
        .then((res) => {return res.data})
        .catch((err) => console.log(err));
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

  function getCollectionsAndExperiences() {
    return Promise.all([fetchAllCollections(), fetchExperience()]);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    getCollectionsAndExperiences()
      .then(([collections, experiences]) => {
        if (collections && experiences) {
          setCollectionData(collections);
          setExperienceData(experiences);
        }        
      })
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (experienceData) {
      combine();
    }
    // eslint-disable-next-line
  }, [experienceData, collectionData]);

  useEffect(() => {
    if (collectionData) {
      handleCollectionData();
    }
    // eslint-disable-next-line
  }, [collectionData]);

  return (
    <div className="App">
      <Navbar />
      {checkToken() ? (
        <div className="container-fluid" style={{ maxWidth: '1500px' }}>
          <CollectionForm handleCreateCollection={handleCreateCollection}/>
          <div className="row">
            <ExperienceForm collectionSelect={collectionSelect} handleCreateExperience={handleCreateExperience}/>
            <ExperienceDisplay collections={collectionElements}/>
          </div>
        </div>
      ) : (
        <div className='container-fluid' style={{ maxWidth: '500px' }}>
          <p>
            Log in/Sign up to keep track of your favorite life experiences
          </p>
        </div>
      )}
    </div>
  );
}

export default App;