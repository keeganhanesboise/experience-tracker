function ExperienceDisplay(props) {
    return (
        <div className="rounded bg-light p-3">
            {props.collections ? props.collections :
            <div className="text-secondary" >
                <h3>Countries (example)</h3>
                <table className="table text-secondary">
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
                        <tr>
                            <th scope="row">1</th>
                            <td>Europe</td>
                            <td>06/10/2022</td>
                            <td>Barcelona</td>
                            <td>Amazing trip to Barcelona with close friends</td>
                        </tr>                    
                    </tbody>
                </table> 
            </div>
            }
        </div>
    )
}

export default ExperienceDisplay;