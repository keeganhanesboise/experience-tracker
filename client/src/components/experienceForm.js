function ExperienceForm(props) {
  return (
    <div className="col-4">
        <form onSubmit={(e) => props.handleCreateExperience(e)}>
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
            <input className="form-control" id="experienceLocation"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="experienceDescription" className="form-label">
              Description
            </label>
            <input className="form-control" id="experienceDescription"></input>
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Create Experience"
          />
        </form>
    </div>
  );
}

export default ExperienceForm;
