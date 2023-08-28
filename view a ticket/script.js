let btn = document.querySelector('button');

// The username and password
// DO NOT store credentials in your JS file like this
let username = 'EL7YJ8ZEg2goInJvTnH7';
let password = 'X';
//base64 encoded
let auth = btoa(`${username}:${password}`);


function fetchdata() {
    let ticketId = document.querySelector('#ticketid').value;
    let url =  `https://mverge.freshservice.com/api/v2/tickets/${ticketId}`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");
    myHeaders.append("Authorization", `Basic ${auth}`);

    const request = new Request(url, {
        headers: myHeaders,
        method: "GET"
    });

    fetch(request)
        .then(res => res.json())
        .then(obj => obj.ticket)
        .then(datas => {
            let datafill = document.querySelector('.datafill');
            // Clear
            datafill.innerHTML = `<div class="grid-topic">Topic</div>
            <div class="grid-topic">Value</div>`;            

            //Loop Object
            Object.entries(datas).forEach((entry,idx) => {
                const [key, value] = entry;
                if(idx%2==0) {
                    datafill.innerHTML += `
                    <div class="grid-item even">${key.toUpperCase()}</div>
                    <div class="grid-item even">${value}</div>`
                } else {
                    datafill.innerHTML += `
                    <div class="grid-item odd">${key.toUpperCase()}</div>
                    <div class="grid-item odd">${value}</div>`
                }
              });
            
        })
        .catch(err => console.log(`Network is error: ${err}`))
};

btn.addEventListener('click', fetchdata);