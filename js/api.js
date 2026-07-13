const API_URL = "https://script.google.com/macros/s/AKfycbzIFFHx0gdWtMieAIDMlQyzMVl32w0qCvZUH__-rkumXiOd8PQujhalNb9YTWXUQC4e/exec";
async function login(username, password) {
    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "login",
            username,
            password
        })
    });
    return await response.json();
}

async function getInventory(){
    const response=await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"getInventory"
        })
    });
    return await response.json();
}
async function addInventory(item){
    const response=await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"addInventory",
            ...item
        })
    });
    return await response.json();
}

async function createRequest(request){
    const response=await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"createRequest",
            ...request
        })
    });
    return await response.json();
}
async function getPendingRequests(){
    const response=await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"getPendingRequests"
        })
    });
    return await response.json();
}
async function approveRequest(requestId){
    const response=await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"approveRequest",
            requestId,
            admin:localStorage.getItem("username")
        })
    });
    return await response.json();
}
async function rejectRequest(requestId){
    const response=await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"rejectRequest",
            requestId,
            admin:localStorage.getItem("username")
        })
    });
    return await response.json();
}

async function submitReturn(returnData){
    const response = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"submitReturn",
            ...returnData
        })
    });
    return await response.json();
}
async function getReturns(){
    const response = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"getReturns"
        })
    });
    return await response.json();
}

async function getDashboard(){
    const response = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"getDashboard"
        })
    });
    return await response.json();
}

async function exportSheet(sheet){
    const response = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"exportSheet",
            sheet
        })
    });
    return await response.json();
}
function downloadCSV(data, filename){
    let csv = "";
    data.forEach(row=>{
        csv += row.join(",") + "\n";
    });
    const blob = new Blob([csv],{
        type:"text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
}

async function downloadInventory() {
    const inventory = await exportSheet("Inventory");
    downloadCSV(
        inventory.data,
        "Inventory.csv"
    );
}

async function downloadRequests() {
    const requests = await exportSheet("Requests");
    downloadCSV(
        requests.data,
        "Requests.csv"
    );
}

async function downloadReturns() {
    const returns = await exportSheet("Returns");
    downloadCSV(
        returns.data,
        "Returns.csv"
    );
}