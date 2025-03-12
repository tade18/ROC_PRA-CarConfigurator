import { Link } from "react-router-dom"

export default function ModelLink(props) {
   
    return (
        <>
            <Link to={`/configurator/${props._id}`}>
                <p>{props.name}</p>
            </Link>
        </>
    )
}