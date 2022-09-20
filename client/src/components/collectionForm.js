function CollectionForm(props) {
    return (
        <form onSubmit={e => props.handleCreateCollection(e)}>
            <label htmlFor='collectionName' className='form-label'>Collection Name</label>
            <input required type="text" className='form-control' id='collectionName'></input>
            <input type="submit" className="btn btn-primary" value="New Collection"></input>
        </form>
    )
}

export default CollectionForm;