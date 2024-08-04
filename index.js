//API for web visit counter
const counter = document.querySelector(".count");
async function updateCounter() {
    //let response = await fetch("https://zqini5jtlkzelhgdzsudbq47ky0fnxzb.lambda-url.ap-southeast-2.on.aws/");
    let response = await fetch("https://api.aye-chan.net/");
    let data = await response.json();
    counter.innerHTML = `This webpage has been visited ${data} times`;
}
updateCounter();

//get current date
const currentdate = document.querySelector(".currentdate");
async function updateCurrentDate() {
    const now = new Date();
    const current = now.toLocaleString();
    currentdate.innerHTML = `Last visited on: ${current}`;
}
updateCurrentDate();

const btnScrollToTop = document.querySelector(".btnScrollToTop");

// scroll to top of page when button clicked
btnScrollToTop.addEventListener("click", e => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});

// toggle 'scroll to top' based on scroll position
window.addEventListener('scroll', e => {
  btnScrollToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
});


//send email
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { name, email, message } = event.target;

  const endpoint =
    "<https://bcmt5kmizf.execute-api.ap-southeast-2.amazonaws.com/default/sendemail>";
	const body = JSON.stringify({
    senderName: name.value,
    senderEmail: email.value,
    message: message.value
  });
  const requestOptions = {
    method: "POST",
    body
  };

  fetch(endpoint, requestOptions)
    .then((response) => {
      if (!response.ok) throw new Error("Error in fetch");
      return response.json();
    })
    .then((response) => {
      document.getElementById("result-text").innerText =
        "Email sent successfully!";
    })
    .catch((error) => {
      document.getElementById("result-text").innerText =
        "An unkown error occured.";
    });
});