// Replace with your Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbxL5nCd5QrTlBQUMUqG4Q_cEImzcEP5n1mimqxaiQorB4uBMcNJH-uAvT3spmHIs0s3/exec";
async function callAPI(payload) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Unable to connect to server."
        };
    }
}
// =========================
const api = {
    login(username, password) {
        return callAPI({
            action: "login",
            username,
            password
        });
    },
    getInventory() {
        return callAPI({
            action: "getInventory"
        });
    },
    addInventory(item) {
        return callAPI({
            action: "addInventory",
            item
        });
    },
    createRequest(request) {
        return callAPI({
            action: "createRequest",
            request
        });
    },
    getRequests() {
        return callAPI({
            action: "getRequests"
        });
    },
    approveRequest(requestID) {
        return callAPI({
            action: "approveRequest",
            requestID
        });
    }
};