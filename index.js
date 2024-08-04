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
function invokeAWSAPI(e) {
  e.preventDefault();           
  var subject = $("#name").val();
  var email = $("#email").val();
  var message = $("#message").val();
  var data = {
     subject : subject,
     message : message,
     email : email
   };
$.ajax({
    type: "POST",
    url : "https://v4uftcj3yvkh3zjonikann2zby0yypcr.lambda-url.ap-southeast-2.on.aws/",
    dataType: "json",
    crossDomain: "true",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function () {
      alert("Successful");
      document.getElementById("contact-form").reset();
  location.reload();
    },
    error: function () {
      alert("unsuccessful");
    }});
}