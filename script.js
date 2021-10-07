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

// Here stops the FetchWrapper class code and starts mine

const inputData = document.getElementById('form');
const showFood = document.getElementById('button');

const API = new FetchWrapper('https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/');
const endThePoint = 'cac';

const saveData = (e) => {
    e.preventDefault()
    let data = new FormData(inputData);
    console.log(data.get("foods"));
    let newData = {
        //HUOM: This needs to match the exact structure as in firebase
        fields:{
            fat:{
                integerValue: data.get("Fat").toString()
            },
            carbs:{
                integerValue: data.get("Carbs").toString()
            },
            name:{
                stringValue: data.get("foods").toString()
            },
            protein:{
                integerValue: data.get("Protein").toString()
            }
        }
    }
    API.post(endThePoint, newData)

    inputData.reset();

    //Now I create my chart using Chart.js

    let dynamic = document.getElementById('dynamicCanvas');
    dynamic.innerHTML = " ";
    dynamic.innerHTML = `<canvas id="myChart" width="400" height="400"></canvas>`;
    console.log(dynamic)
    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Carbs', 'Protein', 'Fat'],//this are my labels
            datasets: [{
                label: `${data.get("foods")}`,
                data: [`${data.get("Carbs")}`,`${data.get("Protein")}`,`${data.get("Fat")}`],//here I passed my data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    Snackbar.show({text: 'Food added finally.'});
}



let logBox = document.getElementById('log');

API.get(endThePoint).then((list => {
    // I ain't sure, so I console log the data
    // console.log(list);
    // console.log(list.documents);
    
    let dataOfInterest = list.documents;
    let foodLog=0;
    for (let data of dataOfInterest){
        // console.log(data);
        let dataField = data.fields;
        // console.log(dataField);
        foodLog+= Number(dataField.fat.integerValue)*9+(Number(dataField.protein.integerValue)+Number(dataField.carbs.integerValue))*4;
        // console.log(foodLog);
    };
    console.log(foodLog);
    
    logBox.innerText = `Total calories intake: ${foodLog}`;
    
    let eachFood = document.getElementById('foodCard');
    eachFood.innerHTML = " ";
    
    for (let data of dataOfInterest){
        // console.log(data);
        let dataField = data.fields;
        // console.log(dataField);
        let each = document.createElement('div');
        each.classList.add('data');
        each.innerText =  `Fat is ${dataField.fat.integerValue}g .Carbs are ${dataField.carbs.integerValue}g. Proteins are ${dataField.protein.integerValue}g. The food is ${dataField.name.stringValue}`;
        eachFood.append(each)

        // console.log(eachFood.innerText);
    };
    
}));

showFood.addEventListener('click', saveData);
//*************************************** */



   
 
  
  
//         // allFields.map((i) => {
//         //   //continuously append kore jaite hobe till we reach the final value
//         //
//         //   const todoDiv = document.createElement("div");
//         //   todoDiv.classList.add("todo");
//         //   todoDiv.innerText = `carbs is ${Object.values(
//         //     i.carbs
//         //   )}, fat is${Object.values(i.fat)}, protein is ${Object.values(
//         //     i.fat
//         //   )}, name of the food is ${Object.values(
//         //     i.name
//         //   )} and total calories is ${
//         //     (Number(Object.values(i.carbs)) + Number(Object.values(i.carbs))) *
//         //       4 +
//         //     Number(Object.values(i.fat)) * 9
//         //   }`;
//         //   todoDiv.appendChild(card);
//         //   // card.innerText = `carbs is ${Object.values(
//         //   //   i.carbs
//         //   // )}, fat is${Object.values(i.fat)}, protein is ${Object.values(
//         //   //   i.fat
//         //   // )}, name of the food is ${Object.values(
//         //   //   i.name
//         //   // )} and total calories is ${
//         //   //   (Number(Object.values(i.carbs)) + Number(Object.values(i.carbs))) *
//         //   //     4 +
//         //   //   Number(Object.values(i.fat)) * 9
//         //   // }`;
//         // });
