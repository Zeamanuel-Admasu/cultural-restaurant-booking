

let form7 = <HTMLInputElement>document.getElementById("form-7");
let dateInp = <HTMLInputElement>document.getElementById("dateInp");
form7.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(`/reserve/${dateInp.value}`, {
        method: "GET",
    }).then(res => res.json())
        .then(data => {
            const arr = Array.from(data);

            createHTMLTable(arr, new Date(dateInp.value).toDateString());
        })
})



fetch("reserve/today", {
    method: "GET",
}).then(res => res.json())
    .then(data => {
        const arr = Array.from(data);
        createHTMLTable(arr, new Date().toDateString());
        let deleteButtons = Array.from(document.getElementsByClassName("deleteButton"));
        deleteButtons.forEach(<HTMLInputElement>(btn) => {

            btn.addEventListener("click", (evt) => {
                evt.preventDefault()
                let str = btn.getAttribute('sometime')
                fetch(`/reserve/delete${btn.value}&${str}`, {
                    method: "DELETE",
                })

            })
        })

    });

function createHTMLTable(arr, date) {
    let parent = document.getElementById("table-body")
    let len = parent.childElementCount;
    for (var i = 1; i < len; i++) {
        parent.removeChild(parent.lastChild);
    }

    arr.forEach(elt => {
        let row = document.createElement("tr");
        let col = document.createElement("td");
        let content = document.createTextNode(elt.tableNumber);
        col.appendChild(content);
        let col4 = document.createElement("td");
        let content4 = document.createTextNode(elt.date);
        col4.appendChild(content4);

        let col3 = document.createElement("td");
        let content3 = document.createTextNode(elt.time);
        col3.appendChild(content3);

        let col2 = document.createElement("td");
        let content2 = document.createTextNode(elt.Type);
        col2.appendChild(content2);

  

        let col5 = document.createElement("td");
        let content5 = document.createTextNode(elt.Number_of_people);
        col5.appendChild(content5);
        row.appendChild(col)
        row.appendChild(col4)

        row.appendChild(col3)
        row.appendChild(col2)

        row.appendChild(col5)

        if (date === new Date().toDateString()) {
            let button = document.createElement("button");
            button.classList.add("deleteButton");
            let content6 = document.createTextNode("Delete");
            button.setAttribute("value", elt.tableNumber);
            button.setAttribute("sometime", elt.time);
            button.setAttribute("type", "submit");
            button.appendChild(content6);
            row.appendChild(button)

        }

        document.getElementById("table-body").appendChild(row);

    });

}


const form = document.getElementById("form-1");
const seats = <HTMLInputElement>document.getElementById("seats");
const type = <HTMLInputElement>document.getElementById("type");
const floor = <HTMLInputElement>document.getElementById("floor");
const tableNum = <HTMLInputElement>document.getElementById("tableNum");
const tableNUM = <HTMLInputElement>document.getElementById("tableNUM");




form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("/tables", {
        method: "POST",
        body: JSON.stringify({
            seats: seats.value,
            floor: floor.value,
            type: type.value,
            tableNUM: tableNUM.value

        }),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(response => response.json())
        .then(data => {

        })
})

let updForm = document.getElementById("form-3");

updForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`/tables/${tableNum.value}`, {
        method: "PATCH",
        body: JSON.stringify({
            updseats: (<HTMLInputElement>document.getElementById("updseats")).value,
            updfloor: (<HTMLInputElement>document.getElementById("updfloor")).value,
            updtype: (<HTMLInputElement>document.getElementById("updtype")).value
        }),
        headers: {
            "Content-Type": "application/json",
        },

    }).then(res => res.json())
        .then(data => {
            if (data.error){
                if (document.getElementById("success2").style.display === "flex") {
                    document.getElementById("success2").style.display = "none"

                }
                let elt = document.getElementById("error2");
                elt.style.display = "flex";

                document.getElementById('errorHeader2').innerHTML = data.message;
            }
            else{
                if (document.getElementById("error2").style.display === "flex") {
                    document.getElementById("error2").style.display = "none"

                }
                let elt = document.getElementById("success2")
                elt.style.display = "flex";

                document.getElementById('successHeader2').innerHTML = data.message;
            }
        });
})

let form4 = document.getElementById("form-4");
let tabNum = <HTMLInputElement>document.getElementById("tabNum");


form4.addEventListener("submit", (e) => {
    fetch(`/tables/${tabNum.value}`, {
        method: "GET",
    }).then(res => res.json())
        .then(data => {
            window.location.href = `/tables/${tabNum.value}`;
        });
})
let form5 = document.getElementById("form-5");
let deleteNum = <HTMLInputElement>document.getElementById("deleteNum");
form5.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`/tables/${deleteNum.value}`, {
        method: "DELETE",
    }).then(res => res.json())
        .then(data => {
            if (data.error){
                if (document.getElementById("success3").style.display === "flex") {
                    document.getElementById("success3").style.display = "none"

                }
                let elt = document.getElementById("error3");
                elt.style.display = "flex";

                document.getElementById('errorHeader3').innerHTML = data.message;
            }
            else{
                if (document.getElementById("error3").style.display === "flex") {
                    document.getElementById("error3").style.display = "none"

                }
                let elt = document.getElementById("success3")
                elt.style.display = "flex";

                document.getElementById('successHeader3').innerHTML = data.message;
            }
        });

})





