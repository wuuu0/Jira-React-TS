// import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "screens/unauthenticated-app";
import { useAuth } from "context/auth-context";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
