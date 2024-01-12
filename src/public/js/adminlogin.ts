

fetch("/auth/adminInfo",{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
      },
})

let formA = <HTMLFormElement>document.getElementById("formA");
const formData = new FormData(formA);
const username = <HTMLInputElement>document.getElementById("nameA");
const password = <HTMLInputElement>document.getElementById('passwordA');

formA.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("/auth/admin",{
        method: "POST",
        body: JSON.stringify({
            name: username.value,
            password: password.value
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
            window.location.href = "/admin";
        }
      })
})
