var id: string = "";
ContainerFunc();


async function ContainerFunc() {
    await fetch("/auth/user", {
        method: "GET",
    }).then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                id = data.id;
            }

        })
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    document.getElementById("date").setAttribute("min", formattedDate);
    if (id) {
        fetch("/reserve/userreservations", {
            method: "POST",
            body: JSON.stringify({
                id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
            .then(data => {
                const arr = Array.from(data);
                createHTMLTable(arr);
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

        function createHTMLTable(arr) {
            let parent = document.getElementById("table-body")
            arr.forEach((elt: { tableNumber: string; Type: string; time: string; date: string; Number_of_people: string; }) => {
                let row = document.createElement("tr");
                let col = document.createElement("td");
                let content = document.createTextNode(elt.tableNumber);
                col.appendChild(content);
                let col2 = document.createElement("td");
                let content2 = document.createTextNode(elt.Type);
                col2.appendChild(content2);
                let col3 = document.createElement("td");
                let content3 = document.createTextNode(elt.time);
                col3.appendChild(content3);

                let col4 = document.createElement("td");
                let content4 = document.createTextNode(elt.date);
                col4.appendChild(content4);

                let col5 = document.createElement("td");
                let content5 = document.createTextNode(elt.Number_of_people);
                col5.appendChild(content5);
                row.appendChild(col)
                row.appendChild(col4)
                row.appendChild(col3)
                row.appendChild(col2)

                
                row.appendChild(col5)
                let button = document.createElement("button");
                button.classList.add("deleteButton");
                let content6 = document.createTextNode("Cancel");
                button.setAttribute("value", elt.tableNumber);
                button.setAttribute("sometime", elt.time);
                button.setAttribute("type", "submit");
                button.appendChild(content6);
                row.appendChild(button)
                parent.appendChild(row);

        });
    }
}
}
let formH = <HTMLInputElement>document.getElementById("reserveForm");
let date = <HTMLInputElement>document.getElementById("date");
let time = <HTMLInputElement>document.getElementById("time");
let typeH = <HTMLInputElement>document.getElementById("type");
let seatsH = <HTMLInputElement>document.getElementById("seats");

formH.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!id) {
        let elt = document.getElementById("error");
        elt.style.display = "flex";
        document.getElementById('errorHeader').innerHTML = "Log in First to book";

    }
    else {
        fetch("/reserve", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                seats: seatsH.value,
                date: date.value,
                time: time.value,
                type: typeH.value


            }),
            headers: {
                "Content-Type": "application/json",
            },

        }).then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    if (document.getElementById("error").style.display === "flex") {
                        document.getElementById("error").style.display = "none"

                    }
                    let elt = document.getElementById("success")
                    elt.style.display = "flex";

                    document.getElementById('successHeader').innerHTML = data.message;
                }
                else {
                    if (document.getElementById("success").style.display === "flex") {
                        document.getElementById("success").style.display = "none"

                    }
                    let elt = document.getElementById("error");
                    elt.style.display = "flex";

                    document.getElementById('errorHeader').innerHTML = data.message;

                }
            }
            );

    }

})
