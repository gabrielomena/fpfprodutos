import { Container } from "react-bootstrap"
import {useContext} from "react";
import {LoadingContext} from "../context/LoadingContext.jsx";
import Loading from "./Loading.jsx";

export function Layout({ children }) {
    const {loading} = useContext(LoadingContext)
  return (
    <>
        {loading ? (
            <Loading/>
        ) : (
            <Container className="mt-4">{children}</Container>
        )}

    </>
  )
}
