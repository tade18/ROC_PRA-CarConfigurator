import { Link } from "react-router-dom"

export default function ConfiguratorLink(props) {
   
    return (
        <>
            <Link to={`/configurator/${props._id}`}>
                <p>{props.name}</p>
            </Link>
        </>
    )
}