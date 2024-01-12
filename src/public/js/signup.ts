let signupform = document.getElementById("signupform");
let emailS = <HTMLInputElement>document.getElementById("emailS");
let nameS= <HTMLInputElement>document.getElementById("usernameS");

let passwordS = <HTMLInputElement>document.getElementById("passwordS");


signupform.addEventListener('submit',(e) => {
    e.preventDefault()
    fetch("/auth/signup",{
        method: "POST",
        body: JSON.stringify({
            username: nameS.value,
            email: emailS.value,
            password: passwordS.value

        }),
        headers: {
            "Content-Type": "application/json",
          }
    }).then(res => res.json())
      .then(data => {
        if (data.error){
            let elt = document.getElementById("error");
            elt.style.display = "flex";
  
            document.getElementById('errorHeader').innerHTML = data.message;
  
          }
          else{
            window.location.href = "/login";
          }

      })
})
