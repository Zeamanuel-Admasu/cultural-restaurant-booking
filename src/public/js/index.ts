var id: string = "";
ContainerFunc();


async function ContainerFunc():Promise<void> {
    await fetch("/auth/user", {
        method: "GET",
    }).then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                id = data.id;
            }

        })
    const currentDate: Date = new Date();

    const day:number = currentDate.getDate();
    const month:number = currentDate.getMonth() + 1;
    const year:number = currentDate.getFullYear();

    const formattedDate:string = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
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

                    btn.addEventListener("click", (evt:Event) => {
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
                let row:HTMLTableRowElement = document.createElement("tr");
                let col:HTMLTableCellElement = document.createElement("td");
                let content:Text = document.createTextNode(elt.tableNumber);
                col.appendChild(content);
                let col2:HTMLTableCellElement = document.createElement("td");
                let content2:Text = document.createTextNode(elt.Type);
                col2.appendChild(content2);
                let col3:HTMLTableCellElement = document.createElement("td");
                let content3:Text = document.createTextNode(elt.time);
                col3.appendChild(content3);

                let col4:HTMLTableCellElement = document.createElement("td");
                let content4:Text = document.createTextNode(elt.date);
                col4.appendChild(content4);

                let col5:HTMLTableCellElement = document.createElement("td");
                let content5:Text = document.createTextNode(elt.Number_of_people);
                col5.appendChild(content5);
                row.appendChild(col)
                row.appendChild(col4)
                row.appendChild(col3)
                row.appendChild(col2)

                
                row.appendChild(col5)
                let button:HTMLButtonElement = document.createElement("button");
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

formH.addEventListener("submit", (e:Event) => {
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
                    let elt:HTMLElement = document.getElementById("success")
                    elt.style.display = "flex";

                    document.getElementById('successHeader').innerHTML = data.message;
                }
                else {
                    if (document.getElementById("success").style.display === "flex") {
                        document.getElementById("success").style.display = "none"

                    }
                    let elt:HTMLElement = document.getElementById("error");
                    elt.style.display = "flex";

                    document.getElementById('errorHeader').innerHTML = data.message;

                }
            }
            );

    }

})
