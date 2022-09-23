function Experience(props) {
    return (
        <tr>
            <th scope="row">{props.rowCounter}</th>
            <td>{props.experience.title}</td>
            <td>{props.date}</td>
            <td>{props.experience.location}</td>
            <td>{props.experience.description}</td>
            {props.experience.image ? 
            <td
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => props.setImageModal(props.experience)}
            >
                <img
                style={{ width: "30px", height: "30px" }}
                alt="experience"
                src={`https://storage.googleapis.com/experience-images/${props.experience.image}`}
                ></img>
            </td>
            :
            null
            }
            <td
                type="button"
                onClick={() => props.removeExperience(props.experience._id)}
                className="btn btn-sm"
            >
                x
            </td>
        </tr>
    )
}

export default Experience;