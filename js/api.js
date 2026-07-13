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