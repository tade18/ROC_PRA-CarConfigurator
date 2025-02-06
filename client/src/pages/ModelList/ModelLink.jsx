import { Link } from "react-router-dom"

export default function ModelLink(props) {
   
    return (
        <>
            <Link to={`/model/${props._id}`}>
                <p>{props.name}</p>
            </Link>
        </>
    )
}