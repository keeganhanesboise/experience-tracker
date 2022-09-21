function CollectionForm(props) {
    return (
        <form onSubmit={e => props.handleCreateCollection(e)}>
            <div className="row">
                <label htmlFor='collectionName' className='form-label'>Collection Name</label>
                <div className="col">
                    <input required type="text" className='form-control' id='collectionName'></input>
                </div>
                <div className="col-2">
                    <input type="submit" className="btn btn-primary" value="New Collection"></input>
                </div>
            </div>
        </form>
    )
}

export default CollectionForm;