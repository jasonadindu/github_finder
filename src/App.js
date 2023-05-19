import { useState } from "react";
import IconSearch from "./icons/iconsearch";
import IconMoon from "./icons/iconmoon";
import IconLocation from "./icons/iconlocation";
import IconWebsite from "./icons/iconwebsite";
import IconTwitter from "./icons/icontwitter";
import IconSun from "./icons/iconsun";
import IconCompany from "./icons/iconcompany";
import Notfound from "./assets/not found.png";

import { githubApiUrl } from "./components/Search";
import { githubApiRepoUrl } from "./components/Repo";


function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const {
    avatar_url,
    bio,
    blog,
    public_repos,
    followers,
    following,
    twitter_username,
    location,
    login,
    name,
    company,
  } = user ?? {};

  const searchUser = async () => {
    if (username.trim() === "") return;
    try {
      const response = await fetch(githubApiUrl(username));
      const githubUser = await response.json();
      const login = githubUser?.login;
      console.log(login);
      if (login) {
        // then we do have a user
        setUser(githubUser);
        setError(null);
        return;
      }
      // we do not have a user
      setError("No result.");
      setUser(null);
    } catch (err) {
      setError("No result.");
      setUser(null);
    }
  };
  return (
    <div className={`github-app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <nav className="nav">
          <h2>Github Finder</h2>

          <button
            className="toggle-theme"
            onClick={() => setDarkMode(!darkMode)}
          >
            <span>{darkMode ? "Light" : "Dark"}</span>
            {darkMode ? <IconSun /> : <IconMoon />}
          </button>
        </nav>
        <main className="main-container">
          <div className="search-container">
            <IconSearch />
            <input
              type="text"
              placeholder="search github username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            {error && (
              <b
                style={{
                  color: "tomato",
                  marginRight: "6px",
                  fontSize: ".7em",
                }}
              >
                {error}
              </b>
            )}
            <button className="btn" onClick={searchUser}>
              Search
            </button>
          </div>
          {!user ? (
            <div
              className="not-found"
              style={{ padding: "4em 0", textAlign: "center" }}
            >
              <img src={Notfound} alt="No where to be seen" />
              <h1>Not found or No Search yet.</h1>
              <h3> Try searchin..</h3>
            </div>
          ) : (
            <section className="search-content">
              {/* <aside className="user-container"></aside> */}
              <div className="img-head-container">
                <div className="img-container">
                  <img src={avatar_url} alt="Github user profile" />
                </div>
                <header className="head">
                  <div className="head-left">
                    <h3>{name}</h3>
                    <p className="btn">@{login}</p>
                  </div>

                  <p>Joined at Mar 14</p>
                </header>
              </div>
              <section className="user-details">
                <p className="bio">{bio}</p>
                <div className="repo-details">
                  <div className="r-details">
                    <p>Repos</p>
                    <b>{public_repos}</b>
                  </div>
                  <div className="r-details">
                    <p>Followers</p>
                    <b>{followers}</b>
                  </div>
                  <div className="r-details">
                    <p>Following</p>
                    <b>{following}</b>
                  </div>
                </div>
                <div className="socials">
                  <span className="social">
                    <IconLocation />
                    {location ? location : "Not available"}
                  </span>
                  <span className="social">
                    <IconWebsite />
                    {blog ? <a href={blog}>{blog}</a> : "Not available"}
                  </span>
                  <span className="social">
                    <IconTwitter />
                    {twitter_username ? "Twitter" : "Not available"}
                  </span>
                  <span className="social">
                    <IconCompany />
                    {company ? company : "Not available"}
                  </span>
                </div>
              </section>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
<githubApiRepoUrl/>

export default App;