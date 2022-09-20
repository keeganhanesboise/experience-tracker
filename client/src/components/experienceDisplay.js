function ExperienceDisplay(props) {
    return (
        <div className="col-8">
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
                    {props.experiences}
                </tbody>
            </table>
        </div>
    )
}

export default ExperienceDisplay;