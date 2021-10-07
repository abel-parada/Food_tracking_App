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
const endThePoint = 'padron';
let data = new FormData(inputData);
const saveData = (e) => {
    e.preventDefault()
    
    console.log(data.get("foods"));
    const newData = {
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
    API.post(endThePoint,newData);
   
   
    // inputData.reset(); --> THIS CREATES A PROBLEM. I CANNOT RESET MY CHART.
    
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
}

showFood.addEventListener('click', saveData);

//Now I create my chart using Chart.js


//*************************************** */


// /* Sample usage do not modify */
// class FetchWrapper {
//     constructor(baseURL) {
//       this.baseURL = baseURL;
//     }
  
//     get(endpoint) {
//       return fetch(this.baseURL + endpoint).then((response) => response.json());
//     }
  
//     put(endpoint, body) {
//       return this._send("put", endpoint, body);
//     }
  
//     post(endpoint, body) {
//       return this._send("post", endpoint, body);
//     }
  
//     delete(endpoint, body) {
//       return this._send("delete", endpoint, body);
//     }
  
//     _send(method, endpoint, body) {
//       return fetch(this.baseURL + endpoint, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }).then((response) => response.json());
//     }
//   }
  
//   const startLoader = (element) => {
//     element.innerHTML = `<div class="loading-spinner"></div>`;
//   };
  
//   const stopLoader = (element, value) => {
//     element.textContent = value;
//   };
  
//   const API = new FetchWrapper(
//     "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
//   );
//   const endpppoint = "sau";
//   // let card = document.getElementById("card");
//   // API.get(endpppoint).then((repos) => {
//   //   let liist = repos.documents;
//   //   if (typeof liist !== "undefined") {
//   //     let allFields = liist.map((i) => i.fields);
//   //     let names = allFields.map((i) => {
//   //       card.innerText = `carbs is ${Object.values(
//   //         i.carbs
//   //       )}, fat is${Object.values(i.fat)}, protein is ${Object.values(
//   //         i.fat
//   //       )}, name of the food is ${Object.values(i.name)} and total calories is ${
//   //         (Number(Object.values(i.carbs)) + Number(Object.values(i.carbs))) * 4 +
//   //         Number(Object.values(i.fat)) * 9
//   //       }`;
//   //     });
//   //   }
//   // });
  
//   const formm = document.getElementById("form");
//   const button = document.getElementById("button");
//   const formData = (e) => {
//     e.preventDefault();
//     let data = new FormData(formm);
//     console.log(typeof data.get("Protein"));
//     API.post(endpppoint, {
//       fields: {
//         name: { stringValue: data.get("foods").toString() },
//         carbs: {
//           integerValue:
//             data.get("carbs") === "" ? "0" : data.get("Carbs").toString(),
//         },
//         protein: {
//           integerValue:
//             data.get("protein") === "" ? "0" : data.get("Protein").toString(),
//         },
//         fat: {
//           integerValue: data.get("fat") === "" ? "0" : data.get("Fat").toString(),
//         },
//       },
//     });
//     formm.reset();
  
//     // Snackbar.show({
//     //   // pos: "bottom-left",
//     //   width: "220px",
//     //   text: `Details of ${data.get("food").toString()} added successfully`,
//     // });
  
//     let canvasDiv = document.getElementById("dynamicCanvas");
//     canvasDiv.innerHTML = "";
//     canvasDiv.innerHTML = `<canvas id="myChart" width="400" height="400"></canvas>`;
//     ctx = document.getElementById("myChart");
    
   
  
//     let myChart = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: ["carbs", "protein", "fat"],
//         datasets: [
//           {
//             label: `nutrition charts for ${data.get("foods").toString()}`,
//             data: [
//               data.get("Carbs"),
//               data.get("Protein"),
//               data.get("Fat"),
       
//             ],
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(255, 206, 86, 0.2)",
             
//             ],
//             borderColor: [
//               "rgba(255, 99, 132, 1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(255, 206, 86, 1)",
              
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
  
  
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
//       }
// //     });
// //   };
  
//   button.addEventListener("click", formData);