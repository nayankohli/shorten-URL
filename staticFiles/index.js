let longURL = document.getElementById("url");
let myLink = document.getElementById("shortedURL");

function shortUrl() {
  if (longURL.value === "") {
    // Trigger shake animation if the input is empty
    longURL.classList.add('shake');
    setTimeout(() => {
      longURL.classList.remove('shake');
    }, 500);
    return; // Stop execution if no URL is entered
  }

  fetch("/short", {
    method: "POST",
    body: JSON.stringify({
      LongURL: longURL.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      // Display the shortened URL
      myLink.textContent = data;
      myLink.href = data;  // Make it clickable
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
