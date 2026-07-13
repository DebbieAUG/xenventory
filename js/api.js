const API_URL = "https://script.google.com/macros/s/AKfycbx4-4sCdujwiAcJglYPc4zfDkMoGVgF9l2Qh62kaR85PLOYjYH0u6Bpj6FYTM1_6sf1/exec";
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