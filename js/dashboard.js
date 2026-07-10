// ==========================================
// Xenventory Dashboard
// ==========================================

// Logged in user
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "index.html";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
});

// ==========================================
// Admin Access
// ==========================================

// Hide admin-only section for users
if (loggedInUser.role !== "admin") {
    document.querySelector("#inventoryForm").parentElement.style.display = "none";
    document.querySelector("#requestTable").closest("section").style.display = "none";
}

// ==========================================
// Dummy Inventory Data
// Replace with Google Sheets later
// ==========================================

let inventory = [
    {
        item: "Wireless Mouse",
        category: "Electronics",
        qty: 20,
        vendor: "Amazon",
        purchasedFor: "Internal"
    },
    {
        item: "Webcam",
        category: "Electronics",
        qty: 8,
        vendor: "Flipkart",
        purchasedFor: "ABC Bank"
    },
    {
        item: "HDMI Cable",
        category: "Accessories",
        qty: 15,
        vendor: "Amazon",
        purchasedFor: "Internal"
    }
];

// ==========================================
// Dummy Requests
// ==========================================

let requests = [
    {
        user: "Rahul",
        item: "Webcam",
        qty: 2,
        purpose: "Workshop",
        status: "Pending"
    }
];

// ==========================================
// Render Inventory
// ==========================================

function renderInventory(data = inventory) {

    const tbody = document.getElementById("inventoryTable");

    tbody.innerHTML = "";

    if (data.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center p-4">
                    No inventory found
                </td>
            </tr>
        `;

        return;
    }

    data.forEach(item => {

        tbody.innerHTML += `
            <tr class="border-b">

                <td class="p-3">${item.item}</td>

                <td class="p-3">${item.category}</td>

                <td class="p-3">${item.qty}</td>

                <td class="p-3">${item.vendor}</td>

                <td class="p-3">${item.purchasedFor}</td>

            </tr>
        `;

    });

}

// ==========================================
// Render Requests
// ==========================================

function renderRequests() {

    const tbody = document.getElementById("requestTable");

    tbody.innerHTML = "";

    if (requests.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center p-4">
                    No Pending Requests
                </td>
            </tr>
        `;

        return;
    }

    requests.forEach((request, index) => {

        tbody.innerHTML += `
            <tr class="border-b">

                <td class="p-3">${request.user}</td>

                <td class="p-3">${request.item}</td>

                <td class="p-3">${request.qty}</td>

                <td class="p-3">${request.purpose}</td>

                <td class="p-3">
                    <span class="text-orange-600 font-semibold">
                        ${request.status}
                    </span>
                </td>

                <td class="p-3">

                    <button
                        onclick="approveRequest(${index})"
                        class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">

                        Approve

                    </button>

                </td>

            </tr>
        `;

    });

}

// ==========================================
// Dashboard Cards
// ==========================================

function updateCards() {

    document.getElementById("totalItems").textContent = inventory.length;

    const totalStock = inventory.reduce((sum, item) => sum + item.qty, 0);

    document.getElementById("availableStock").textContent = totalStock;

    const pending = requests.filter(r => r.status === "Pending").length;

    document.getElementById("pendingRequests").textContent = pending;

}

// ==========================================
// Auto Calculate Total
// ==========================================

const qtyInput = document.getElementById("quantity");
const costInput = document.getElementById("cost");
const totalInput = document.getElementById("total");

function calculateTotal() {

    const qty = Number(qtyInput.value) || 0;

    const cost = Number(costInput.value) || 0;

    totalInput.value = qty * cost;

}

qtyInput.addEventListener("input", calculateTotal);

costInput.addEventListener("input", calculateTotal);

// ==========================================
// Search
// ==========================================

document
.getElementById("searchInventory")
.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = inventory.filter(item =>
        item.item.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.vendor.toLowerCase().includes(keyword) ||
        item.purchasedFor.toLowerCase().includes(keyword)
    );

    renderInventory(filtered);

});

// ==========================================
// Dummy Approve
// ==========================================

function approveRequest(index) {

    requests[index].status = "Approved";

    alert("Request Approved");

    requests.splice(index, 1);

    renderRequests();

    updateCards();

}

// ==========================================
// Forms
// ==========================================

document
.getElementById("inventoryForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Inventory saved (dummy)");

    this.reset();

});

document
.getElementById("requestForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Request submitted (dummy)");

    this.reset();

});

// ==========================================

renderInventory();

renderRequests();

updateCards();