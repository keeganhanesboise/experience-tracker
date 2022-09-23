import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import ExperienceForm from "./components/experienceForm";
import ExperienceDisplay from "./components/experienceDisplay";
import CollectionForm from "./components/collectionForm";
import ImageModal from "./components/imageModal";
import LoginPrompt from "./components/loginPrompt";
import Experience from "./components/experience";
import Collection from "./components/collection";

function App() {
  const [collectionData, setCollectionData] = useState();
  const [experienceData, setExperienceData] = useState();
  const [collectionElements, setCollectionElements] = useState();
  const [collectionSelect, setCollectionSelect] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [displayName, setDisplayName] = useState();
  const [user, setUser] = useState();

  /**
   * 
   * @returns JSON web token status
   */
  function checkToken() {
    return (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    );
  }

  /**
   * Helper method for setting collection and experience data
   */
  function updateData() {
    getCollectionsAndExperiences()
      .then(([collections, experiences]) => {
        if (collections && experiences) {
          if (!collections.message) {
            setCollectionData(collections);
          } else {
            setCollectionData();
            setCollectionElements();
            setCollectionSelect();
          }
          if (!experiences.message) {
            setExperienceData(experiences);
          } else {
            setExperienceData();
            setCollectionElements();
          }
        }
      });
  }

  /**
   * Set modal title and image
   * @param {object} experience 
   */
  function setImageModal(experience) {
    setDisplayName(experience.title);
    setDisplayImage(`https://storage.googleapis.com/experience-images/${experience.image}`);
  }

  /**
   * Delete experience
   * @param {number} id - unqiue experience identifier
   */
  function removeExperience(id) {
    const options = {
      method: "get",
      url: `/deleteExperience/${id}`,
      headers: {
        "Content-type": "application/json",
      },
    };

    axios(options)
      .then((res) => updateData(res))
      .catch((err) => console.log(err));
  }

  /**
   * Create new experience from form
   * @param {array} e - form data
   */
  function handleCreateExperience(e) {
    e.preventDefault();
    const form = e.target;

    // eslint-disable-next-line
    const fileName = form[4].value.replace(/^.*[\\\/]/, "");

    const options = {
      method: "post",
      url: `/createExperience`,
      data: {
        title: form[0].value,
        date: form[1].value,
        location: form[2].value,
        description: form[3].value,
        image: fileName,
        collectionId: form[5].value,
        userId: user.id,
      },
      headers: {
        "Content-type": "application/json",
      },
    };

    axios(options)
      .then((res) => updateData(res))
      .catch((err) => console.log(err));

    e.target.reset();
    e.target[0].focus();
  }

  /**
   * Delete collection
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
      url: `/deleteCollection/${collection._id}`,
      headers: {
        "Content-type": "application/json",
      },
    };

    axios(options)
      .then((res) => updateData(res))
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
      url: "/createCollection",
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
      .then((res) => updateData(res))
      .catch((err) => console.log(err));

    e.target.reset();
  }

  /**
   * Converts experience objects to JSX elements
   * @param {array} data - users experiences
   */
  function handleExperienceData(data) {
    let expereinceArray = [];
    let rowCounter = 1;
    data.forEach((experience) => {
      let date;
      if (experience.date) {
        let index = experience.date.indexOf("T");
        date = experience.date.slice(0, index);
      }
      expereinceArray.push(
        <Experience 
          key={experience._id}
          experience={experience} 
          rowCounter={rowCounter} 
          date={date} 
          setImageModal={setImageModal} 
          removeExperience={removeExperience}
        />
      );
      rowCounter++;
    });
    return expereinceArray;
  }

  /**
   * Fetch experience(s) for current user
   */
  function fetchExperience() {
    if (user) {
      const options = {
        method: "get",
        url: `/fetchExperience/${user.id}`,
        headers: {
          "Content-type": "application/json",
        },
      };

      return axios(options)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));
    }
  }

  /**
   * Fetch collection(s) for current user
   */
  async function fetchAllCollections() {
    if (user) {
      const options = {
        method: "get",
        url: `/fetchAllCollections/${user.id}`,
        headers: {
          "Content-type": "application/json",
        },
      };

      return axios(options)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));
    }
  }

  function getCollectionsAndExperiences() {
    return Promise.all([fetchAllCollections(), fetchExperience()]);
  }

  useEffect(() => {
    if (
      checkToken()
    ) {
      const options = {
        method: "get",
        url: "/getUserInfo",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      };

      axios(options)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [user]);

  /**
   * Add experience(s) to their corresponding collection
   */
  useEffect(() => {
    if (experienceData) {
      if (!experienceData.message) {
        let tempCollectionData = collectionData;
        experienceData.forEach((experience) => {
          const collection = tempCollectionData.find(
            (element) => element._id === experience.collectionId
          );
          collection.experiences.push(experience);
        });
        setCollectionData(tempCollectionData);
      }
    }
  }, [experienceData, collectionData]);
  
  /**
   * Converts collection objects to JSX elements
   * @param {array} data - users collections
   */
  useEffect(() => {
    if (collectionData) {
      if (!collectionData.message) {
        let collectionArray = [];
        let collectionSelectArray = [];
        collectionData.forEach((collection) => {
          collectionSelectArray.push(
            <option key={collection._id} value={collection._id}>
              {collection.title}
            </option>
          );
          let experiences;
          if (collection.experiences.length > 0) {
            experiences = handleExperienceData(collection.experiences);
          }
          collectionArray.push(
            <Collection 
              key={collection._id}
              collection={collection} 
              experiences={experiences} 
              removeCollection={removeCollection}
            />
          );
        });
        setCollectionElements(collectionArray);
        setCollectionSelect(collectionSelectArray);
      }
    }
  }, [collectionData]);

  return (
    <div className="App">
      <Navbar />
      {checkToken() ? (
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <ExperienceForm collectionSelect={collectionSelect} handleCreateExperience={handleCreateExperience} />
            </div>
            <div className="col-9">
              <div className="container">
                <CollectionForm handleCreateCollection={handleCreateCollection} />
                <ExperienceDisplay collections={collectionElements} />
              </div>
            </div>
          </div>
          <ImageModal displayImage={displayImage} displayName={displayName} />
        </div>
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
}

export default App;