function CollectionForm(props) {
    return (
        <form className="row mb-4 pt-4 sticky-top bg-white" onSubmit={e => props.handleCreateCollection(e)}>
                <label htmlFor='collectionName' className='form-label'>Collection Name</label>
            <div className="col col-xxl-10">
                <input required type="text" className='form-control' id='collectionName'></input>
            </div>
            <div className="col col-xxl-2">
                <input type="submit" className="btn btn-primary" value="New Collection"></input>
            </div>
        </form>
    )
}

export default CollectionForm;