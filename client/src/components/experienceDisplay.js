function ExperienceDisplay(props) {
    return (
        <div style={{ minHeight: "100%", backgroundColor: "#F5F5F5", padding: "20px"}} className="rounded">
            {props.collections ? props.collections :
            <div style={{ color: "gray"}} >
                <h3>Countries (example)</h3>
                <table className="table" style={{ color: "gray"}} >
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