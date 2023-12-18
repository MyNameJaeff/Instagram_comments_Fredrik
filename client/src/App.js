import React from "react";
import Posts from "./modules/Posts";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/login")
      .then((res) => res.json())
      .then((data) => setData(data.usr));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {!data
            ? "Loading..."
            : data.username +
              " " +
              data.email +
              " " +
              data.profilePicture +
              localStorage.setItem("user", JSON.stringify(data)) +
              console.log(JSON.stringify(localStorage.getItem("user")))}
        </p>
      </header>
      <div className="cardHolder" style={{ width: "95%;", display: "flex" }}>
        <Posts />
      </div>
    </div>
  );
}

export default App;
