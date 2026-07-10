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
// Replace with Google Sheets later
// ==========================================
let inventory = [];
let requests = [];
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
                <td class="p-3">${item.itemName}</td>
                <td class="p-3">${item.category}</td>
                <td class="p-3">${item.quantity}</td>
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
	const totalStock = inventory.reduce(
		(sum, item) => sum + Number(item.quantity),
		0
	);
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
async function loadInventory() {
    const response = await api.getInventory();
    inventory = response;
    renderInventory();
    updateCards();
}
async function loadRequests() {
    const response = await api.getRequests();
    requests = response;
    renderRequests();
    updateCards();
}
document
.getElementById("inventoryForm")
.addEventListener("submit", async function(e){
    e.preventDefault();
    const item = {
        itemName: document.getElementById("itemName").value,
        category: document.getElementById("category").value,
        quantity: Number(document.getElementById("quantity").value),
        vendor: document.getElementById("vendor").value,
        purchaseDate: document.getElementById("purchaseDate").value,
        purchasedFor: document.getElementById("purchasedFor").value,
        cost: Number(document.getElementById("cost").value),
        total: Number(document.getElementById("total").value)
    };
    const response = await api.addInventory(item);
    alert(response.message);
    this.reset();
    loadInventory();
});
// ==========================================
// Dummy Approve
// ==========================================
async function approveRequest(index){
    const response = await api.approveRequest(
        requests[index].id
    );
    alert(response.message);
    loadRequests();
    loadInventory();
}
// ==========================================
// Forms
// ==========================================
document
.getElementById("requestForm")
.addEventListener("submit", async function(e){
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const request = {
        user: user.username,
        item: document.getElementById("requestItem").value,
        quantity: Number(document.getElementById("requestQty").value),
        purpose: document.getElementById("purpose").value
    };
    const response = await api.createRequest(request);
    alert(response.message);
    this.reset();
    loadRequests();
});
// ==========================================
async function init(){
    await loadInventory();
    await loadRequests();
}
init();