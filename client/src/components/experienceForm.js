function ExperienceForm(props) {
  return (
    <div className="col-4">
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
          {props.collectionSelect ?
          <div>
            <div className="mb-3">
              <select required className="custom-select">
                {props.collectionSelect}
              </select>
            </div>
            <input
              type="submit"
              className="btn btn-primary"
              value="Create Experience"
            />
          </div>
          :
          <div>
            <p className="text-danger">Add a collection to create experiences</p>  
            <input
              type="submit"
              className="btn btn-primary"
              value="Create Experience"
              disabled
            />
          </div>
          }
        </form>
    </div>
  );
}

export default ExperienceForm;
