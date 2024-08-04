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
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var emailRegex = /^\S+@\S+\.\S+$/;
  if (!name || !email || !message || !emailRegex.test(email)) {
    alert('Please fill in all fields with valid inputs.');
    return;
  }
  var formData = {
    name: name,
    email: email,
    message: message
  };
  submitForm(formData);
});

function submitForm(formData) {
  fetch('https://bcmt5kmizf.execute-api.ap-southeast-2.amazonaws.com/default/sendemail', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(function(response) {
    if (response.ok) {
      document.getElementById("result-text").innerText =
        "Email sent successfully!";
    } else {
      throw new Error('Form submission failed.');
    }
  })
  .catch(function(error) {
    console.error(error);
    alert('Form submission failed. Please try again later.');
  });
}