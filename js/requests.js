// Event Listeners
const submitBtn = document.getElementById("submitRequest");
if (submitBtn) {
    submitBtn.addEventListener("click", submitNewRequest);
}
// Load Data
async function loadPendingRequests() {
    const requests = await getPendingRequests();
    renderPendingRequests(requests);
}
async function loadMyRequests() {
    const requests = await getUserRequests();
    renderMyRequests(requests);
}
// Submit Request
async function submitNewRequest() {
    const item = document.getElementById("requestItem");
    const qty = document.getElementById("requestQty");
    const purpose = document.getElementById("requestPurpose");
    const customer = document.getElementById("requestCustomer");
    if (!item.value) {
        alert("Please select an item.");
        return;
    }
    if (!qty.value || Number(qty.value) <= 0) {
        alert("Quantity should be greater than 0.");
        return;
    }
    if (!purpose.value.trim()) {
        alert("Purpose is required.");
        return;
    }
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";
    const request = {
        user: localStorage.getItem("username"),
        itemId: item.value,
        itemName: item.options[item.selectedIndex].dataset.name,
        qty: qty.value,
        purpose: purpose.value,
        customer: customer.value,
        date: new Date().toLocaleDateString("en-IN")
    };
    await createRequest(request);
    clearRequestForm();
    await loadDashboard();
    await loadPendingRequests();
    await loadMyRequests();
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit";
    alert("Request submitted successfully.");
}
// Clear Form
function clearRequestForm() {
    document.getElementById("requestItem").selectedIndex = 0;
    document.getElementById("requestQty").value = "";
    document.getElementById("requestPurpose").value = "";
    document.getElementById("requestCustomer").value = "";
}
// Pending Requests
function renderPendingRequests(requests) {
    const section = document.getElementById("pendingRequestsSection");
    if (!section) return;
    if (requests.length === 0) {
        section.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                No pending requests.
            </div>
        `;
        return;
    }
    let html = `
    <table class="min-w-full">
        <thead>
            <tr class="bg-slate-200">
                <th class="text-left p-3">User</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Purpose</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
    `;
    requests.forEach(r => {
        html += `
        <tr class="border-b hover:bg-slate-50">
            <td class="p-3">${r.User}</td>
            <td>${r["Item Name"]}</td>
            <td>${r.Qty}</td>
            <td>${r.Purpose}</td>
            <td>${r.Customer}</td>
            <td>${r.Date}</td>
            <td class="space-x-2">
                <button
                    onclick="approve('${r["Request ID"]}')"
                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                    Approve
                </button>
                <button
                    onclick="reject('${r["Request ID"]}')"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                    Reject
                </button>
            </td>
        </tr>
        `;
    });
    html += "</tbody></table>";
    section.innerHTML = html;
}
// My Requests
function renderMyRequests(requests) {
    const section = document.getElementById("myRequestsSection");
    if (!section) return;
    if (requests.length === 0) {
        section.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                You haven't requested any items yet.
            </div>
        `;
        return;
    }
    let html = `
    <table class="min-w-full">
        <thead>
            <tr class="bg-slate-200">
                <th class="text-left p-3">Request ID</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
    `;
    requests.forEach(r => {
        html += `
        <tr class="border-b hover:bg-slate-50">
            <td class="p-3">${r["Request ID"]}</td>
            <td>${r["Item Name"]}</td>
            <td>${r.Qty}</td>
            <td>${r.Purpose}</td>
            <td>${getStatusBadge(r.Status)}</td>
            <td>${r.Date}</td>
        </tr>
        `;
    });
    html += "</tbody></table>";
    section.innerHTML = html;
}
// Status Badge
function getStatusBadge(status) {
    switch (status) {
        case "Pending":
            return `<span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">Pending</span>`;
        case "Approved":
            return `<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Approved</span>`;
        case "Rejected":
            return `<span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Rejected</span>`;
        case "Returned":
            return `<span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Returned</span>`;
        default:
            return `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${status}</span>`;
    }
}
// Admin Actions
async function approve(requestId) {
    await approveRequest(requestId);
    await loadDashboard();
    await loadInventory();
    await loadPendingRequests();
    await loadMyRequests();
}
async function reject(requestId) {
    await rejectRequest(requestId);
    await loadDashboard();
    await loadPendingRequests();
    await loadMyRequests();
}