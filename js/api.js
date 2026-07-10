// Replace with your Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbzx4L7QQHDgMi9Dl400DdX_FHR6QDhugZ_QXsP3hGQZ3YVR2IA8T2xXwAFSin0Zuexr/exec";
async function callAPI(payload) {
    try {
        const formData = new URLSearchParams();
        formData.append("data", JSON.stringify(payload));
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
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