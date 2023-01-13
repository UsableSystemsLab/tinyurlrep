import React from "react";

function Card() {
  const [shortenLink, setShortenLink] = React.useState("");
  const [value, setValue] = React.useState("");
  // test
  const fetchURL = async () => {
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
      .then((result) => setShortenLink(result.code))
      .catch((error) => setShortenLink(`Error: ${error}`));
    // try {
    //   const res = await fetch("http://localhost:5000/save", {
    //     method: "POST",
    //     mode: "cors",
    //     body: JSON.stringify(value),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   });
    //   const data = await res.json();
    //   setShortenLink(data.result.full_short_link);
    // } catch (err) {}
  };

  function handleClick() {
    setValue("");
    if (value) fetchURL();
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
        URL :{" "}
        <a href={shortenLink} target="_blank" rel="noreferrer">
          {shortenLink}
        </a>
      </p>
    </div>
  );
}

export default Card;
