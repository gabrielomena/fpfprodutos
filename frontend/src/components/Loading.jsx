import {Spinner} from "react-bootstrap";
import {useContext} from "react";
import {LoadingContext} from "../context/LoadingContext.jsx";

const Loading = () => {
    const {loading} = useContext(LoadingContext)
    return (
        <div className="load">
            <Spinner animation="border" role="status"/>
        </div>
    )
}
export default Loading