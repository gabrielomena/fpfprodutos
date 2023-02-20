import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./App.scss"
import "./assets/styles/Index.scss"
import {LoadingContextProvider} from "./context/LoadingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <LoadingContextProvider>
        <App />
    </LoadingContextProvider>
)
