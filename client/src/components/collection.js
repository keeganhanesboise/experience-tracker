function Collection(props) {
    return (
        <div key={props.collection._id}>
            <div
            className="row justify-content-between"
            style={{ width: "100%" }}
            >
            <div className="col">
                <h3>{props.collection.title}</h3>
            </div>
            <div className="col-1">
                <button
                type="button"
                onClick={() => props.removeCollection(props.collection)}
                className="btn btn-outline-danger btn-sm"
                >
                Remove
                </button>
            </div>
            </div>
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
            <tbody>{props.experiences}</tbody>
            </table>
        </div>
    )
}

export default Collection;