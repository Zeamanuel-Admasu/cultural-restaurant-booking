

fetch("/auth/adminInfo",{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
      },
})

let formA:HTMLFormElement = <HTMLFormElement>document.getElementById("formA");
const formData:FormData = new FormData(formA);
const username:HTMLInputElement = <HTMLInputElement>document.getElementById("nameA");
const password:HTMLInputElement = <HTMLInputElement>document.getElementById('passwordA');

formA.addEventListener("submit", (e:Event) => {
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
            let elt:HTMLElement = document.getElementById("error");
            elt.style.display = "flex";

            document.getElementById('errorHeader').innerHTML = data.message;
        }
        else{
            window.location.href = "/admin";
        }
      })
})
