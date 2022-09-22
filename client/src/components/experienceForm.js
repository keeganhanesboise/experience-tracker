import axios from "axios";
import { useState } from "react";

function ExperienceForm(props) {
  const [uploading, setUploading] = useState(false);
  
  function handleUploadFile(e) {
    setUploading(true);
    const file = e.target.files[0];
    if (file.size > 2000000) {
      console.log("File must be smaller than 2MB");
    } else {
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("file", file);
  
      axios.post("http://localhost:5000/image/upload", formData)
        .then((res) => {
          console.log(res.data);
          setUploading(false);
        })
        .catch((err) => console.log(err));
    }
  }
  

  return (
      <form onSubmit={(e) => props.handleCreateExperience(e)}>
        <div className="mb-3">
          <label htmlFor="experienceTitle" className="form-label">
            Experience Name
          </label>
          <input
            required
            className="form-control"
            id="experienceTitle"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="experienceDate" className="form-label">
            Date
          </label>
          <input type="date" className="form-control" id="experienceLocation"></input>
        </div>
        <div className="mb-3">
          <label htmlFor="experienceLocation" className="form-label">
            Location
          </label>
          <input className="form-control" id="experienceLocation"></input>
        </div>
        <div className="mb-3">
          <label htmlFor="experienceDescription" className="form-label">
            Description
          </label>
          <input className="form-control" id="experienceDescription"></input>
        </div>
        <div className="custom-file">
          <input onChange={(e) => handleUploadFile(e)} type="file" className="custom-file-input" id="inputGroupFile01" />
        </div>
        <br></br>
        {props.collectionSelect ?
        <div className="mb-3">
          <select required className="custom-select">
            {props.collectionSelect}
          </select>
        </div>
        :
        <p className="text-danger">Add a collection to create experiences</p>  
        }
        {uploading || !props.collectionSelect ?
        <input
          type="submit"
          className="btn btn-primary"
          value="Create Experience"
          disabled
        /> 
        :           
        <input
          type="submit"
          className="btn btn-primary"
          value="Create Experience"
        />}
      </form>
  );
}

export default ExperienceForm;
