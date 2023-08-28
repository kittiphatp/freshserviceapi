let btn = document.querySelector('button');

// The username and password
// DO NOT store credentials in your JS file like this
let username = 'EL7YJ8ZEg2goInJvTnH7';
let password = 'X';
//base64 encoded
let auth = btoa(`${username}:${password}`);


function fetchdata() {
    let url =  `https://mverge.freshservice.com/api/v2/tickets`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    myHeaders.append("Authorization", `Basic ${auth}`);

    const request = new Request(url, {
        headers: myHeaders,
        method: "GET"
    });

    fetch(request)
        .then(res => res.json())
        .then(obj => obj.tickets)
        .then(arr => {
            //Show number of all ticket
            let numticket = document.querySelector('.numticket');
            numticket.innerHTML = arr.length

            //Get Card
            let datafill = document.querySelector('.datafill');

            //Loop
            arr.forEach(ele => {

                // Check status
                let status = "unknown"
                if (ele.status == 2) {
                    status = "open"
                } else if (ele.status == 3) {
                    status = "pending"
                } else if (ele.status == 4) {
                    status = "resolved"
                } else if (ele.status == 5) {
                    status = "closed"
                } else if (ele.stauts == 6) {
                    status = "assigned"
                } else {
                    status = "in progress"
                }

                datafill.innerHTML += `
                    <div class="card">
                        <div class="topic">
                            <div class="subject">${ele.subject}</div>
                            <div class="ticketid">${ele.id}</div>
                        </div>
                        <div class="sub-topic">
                            <div class="status">${status}</div>
                        </div>
                        <div class="detail">
                            ${ele.description_text}
                        </div>
                        <div class="footer">
                            <div class="created"><span>Created: </span>${ele.created_at}</div>
                            <div class="category"><span>Category: </span>${ele.category='null'? "-": ele.category}</div>
                        </div>
                    </div>
                `
            });
        })
        .catch(err => console.log(`Network is error: ${err}`))
};

btn.addEventListener('click', fetchdata);