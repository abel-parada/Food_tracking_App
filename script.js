'use scrict';

/* Sample usage do not modify */
class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) { // gets data
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) { //changes data
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) { //pushes data
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) { //deletes data
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const startLoader = element => {
    element.innerHTML = `<div class="loading-spinner"></div>`;
}

const stopLoader = (element, value) => {
    element.textContent = value;
}

const inputData = document.getElementById('form');
const showFood = document.getElementById('submit');

const API = new FetchWrapper('https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/');
const endThePoint = 'abel';

const saveData = (e) => {
    e.preventDefault()
    let data = new FormData(inputData);
    console.log(data.get("foods"));
    const newData = {
        fields:{
            fat:{
                integerValue: data.get("Fat")
            },
            carbs:{
                integerValue: data.get("Carbs")
            },
            name:{
                stringValue: data.get("foods")
            },
            protein:{
                integerValue: data.get("Protein")
            }
        }
    }
    API.post(endThePoint,newData)
}

showFood.addEventListener('click', saveData);
