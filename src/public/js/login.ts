
let formL = document.getElementById("formL");
let emailL = <HTMLInputElement>document.getElementById("emailL");
let passwordL = <HTMLInputElement>document.getElementById("passwordL");
let logoutform = document.getElementById('logoutform');


fetch("/auth/user", {
  method: "GET",
}).then(response => response.json())
  .then(data => {
      if (data.status === "success") {
          document.getElementById("logoutform").style.display = "block";

      }

  })

formL.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email: emailL.value,
            password: passwordL.value,

        }),
        headers: {
            "Content-Type": "application/json",
          },

    }).then(res => res.json())
      .then(data => {
        if (data.error){
          let elt = document.getElementById("error");
          elt.style.display = "flex";

          document.getElementById('errorHeader').innerHTML = data.message;

        }
        else{
          window.location.href = "/book";
        }

      })
    
    
    
    })


logoutform.addEventListener('submit',(e) => {
  e.preventDefault()
  fetch("/auth/logout",{
    method: "GET"
  })
  logoutform.style.display = "none";
})