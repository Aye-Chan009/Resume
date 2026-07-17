//API for web visit counter
const counter = document.querySelector(".count");
async function updateCounter() {
    let response = await fetch("count_api_url");
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

//contact form
const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };
    // Show loading message
    statusMessage.innerText = "Sending...";

    try {
        const response = await fetch("contact_api_url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        });

        const result = await response.json();

        if (response.ok) {
            statusMessage.innerText = result.message || "Thank you! Your message has been sent. I will get back to you shortly.";
            form.reset();
        } else if (response.status === 403) {
            statusMessage.innerText = "The contact form has been temporarily paused to keep communication focused and reliable. Please reach out to me directly via email or LinkedIn.";
        }
          else {
            statusMessage.innerText = result.message || "Something went wrong.";
        }
    } catch (error) {
        console.error("Error sending email:", error);
        statusMessage.innerText = "The contact form has been temporarily paused to keep communication focused and reliable. Please reach out to me directly via email or LinkedIn.";
    }
});


