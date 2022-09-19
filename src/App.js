import { useState } from "react";
import "./App.css";
import { signInWithGoogle, signInWithGithub, UserLogOut } from "./Firebase";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import sample from "../src/sample.mp4";
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignInChanges = (val) => {
    setLoggedIn(true);
    setName(val.user.displayName);
    setEmail(val.user.email);
    setImage(val.user.photoURL);
  };

  const handleSignOutChanges = () => {
    UserLogOut();
    setLoggedIn(false);
    setName("");
    setEmail("");
    setImage("");
  };

  const handleOnGoogle = () => {
    signInWithGoogle()
      .then((result) => handleSignInChanges(result))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnGithub = () => {
    signInWithGithub()
      .then((result) => handleSignInChanges(result))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <video className="videoTag" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>

      <header className="navbar">
        <a href="https://www.thesparksfoundationsingapore.org/" target="blank"><h1>The Sparks Foundation</h1></a>
        <h5> ...inspiring, innovating, integrating</h5>
      </header>
      {!loggedIn && (
          <div className="container tilt-inner">
            <div className="App-header">
              <div className="header">
                <h3>Sign in with ...</h3>
              </div>
              <div className="content">
                <button onClick={handleOnGoogle}>
                  <FcGoogle size={20} />
                </button>
                <button onClick={handleOnGithub}>
                  <ImGithub size={20} />
                </button>
              </div>
            </div>
          </div>
      )}
      {loggedIn && (
        <div className="container">
          <div className="profile">
            <h4>Welcome back!</h4><h2>{name}</h2>
            <h5>{email}</h5>
            <img src={image} alt="usrImage" />
          </div>
          <div className="logout">
            <button onClick={handleSignOutChanges}>
              <h3>Log Out</h3>
            </button>
          </div>
        </div>
      )}
      <footer className="footer">
        <div>
          <a
            href="https://www.linkedin.com/in/mohammad-mudassir-b788a41ab/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/nolan/32/linkedin.png"
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://github.com/mdmudassir0143"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/nolan/32/github.png"
              alt="Github"
            />
          </a>
          <p>Created by Mohammad Mudassir</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
