import React from "react";

function Card() {
  const [shortenLink, setShortenLink] = React.useState("");
  const [value, setValue] = React.useState("");
  const [url, setUrl] = React.useState("");
  var temp = null;
  // test
  const fetchCode = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("url", value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5000/add", requestOptions)
      .then((response) => response.json())
      .then((result) => (temp = result.code))
      .then(() => {
        setShortenLink(temp);
        console.log(temp);
        fetchUrl(temp);
      })
      .catch((error) => setShortenLink(`Error: ${error}`));
  };

  const fetchUrl = async (code) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:5000/get?code=${code}`, requestOptions)
      .then((response) => response.text())
      .then((result) => setUrl(result))
      .catch((error) => console.log("error", error));
  };

  function handleClick() {
    setValue("");
    if (value) {
      fetchCode();
    }
  }

  return (
    <div className="card">
      <h1>
        My <span className="url-span"> URL </span> Shortner
      </h1>
      <div className="container">
        <input
          className="text-field"
          type="text"
          placeholder="Enter URL to shorten"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleClick} type="submit">
          Shorten
        </button>
      </div>
      <p>
        <span>URL: </span>
        <a href={url} target="_blank" rel="noreferrer">
          {shortenLink}
        </a>
      </p>
    </div>
  );
}

export default Card;
