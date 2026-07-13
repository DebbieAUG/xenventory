// =====================================================
// Xenventory API
// =====================================================

// Replace with your deployed Apps Script Web App URL
const API_URL =
  "https://script.google.com/macros/s/AKfycbzx4L7QQHDgMi9Dl400DdX_FHR6QDhugZ_QXsP3hGQZ3YVR2IA8T2xXwAFSin0Zuexr/exec";

/**
 * Generic API Caller
 */
async function callAPI(payload) {
  try {
    const formData = new URLSearchParams();
    formData.append("data", JSON.stringify(payload));

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("API Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}

// =====================================================
// API Wrapper
// =====================================================

const api = {

  login(username, password) {
    return callAPI({
      action: "login",
      username,
      password,
    });
  },

  getInventory() {
    return callAPI({
      action: "getInventory",
    });
  },

  addInventory(item) {
    return callAPI({
      action: "addInventory",
      item,
    });
  },

  createRequest(request) {
    return callAPI({
      action: "createRequest",
      request,
    });
  },

  getRequests() {
    return callAPI({
      action: "getRequests",
    });
  },

  approveRequest(requestID) {
    return callAPI({
      action: "approveRequest",
      requestID,
    });
  },

};