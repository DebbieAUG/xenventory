// Load Returns
async function loadReturns() {
    const returns = await getReturns();
    renderReturns(returns);
}
// Render Returns Table
function renderReturns(returns) {
    const section = document.getElementById("returnsSection");
    if (!section) return;
    if (!returns || returns.length === 0) {
        section.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                No returns recorded.
            </div>
        `;
        return;
    }
    let html = `
        <table class="min-w-full">
            <thead>
                <tr class="bg-slate-200">
                    <th class="text-left p-3">Return ID</th>
                    <th>Request ID</th>
                    <th>Item ID</th>
                    <th>Qty</th>
                    <th>Comment</th>
                    <th>Returned By</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
    `;
    returns.forEach(r => {
        html += `
            <tr class="border-b hover:bg-slate-50">
                <td class="p-3">${r["Return ID"]}</td>
                <td>${r["Request ID"]}</td>
                <td>${r["Item ID"]}</td>
                <td>${r["Qty"]}</td>
                <td>${r["Comment"]}</td>
                <td>${r["Returned By"]}</td>
                <td>${r["Date"]}</td>
            </tr>
        `;
    });
    html += `
            </tbody>
        </table>
    `;
    section.innerHTML = html;
}
// Approved Requests Dropdown
async function loadApprovedRequests() {
    const requests = await getApprovedRequests();
    populateReturnDropdown(requests);
}
function populateReturnDropdown(requests) {
    const select = document.getElementById("returnRequest");
    if (!select) return;
    select.innerHTML =
        '<option value="">Select Approved Request</option>';
    if (!Array.isArray(requests)) return;
    requests.forEach(r => {
        select.innerHTML += `
            <option
                value="${r["Request ID"]}"
                data-item="${r["Item ID"]}"
                data-qty="${r.Qty}">
                ${r["Request ID"]} - ${r["Item Name"]}
            </option>
        `;
    });
}
// Auto Fill Qty
document
.getElementById("returnRequest")
.addEventListener("change", function () {
    const option = this.options[this.selectedIndex];
    document.getElementById("returnQty").value =
        option.dataset.qty || "";
});
// Submit Return
document
.getElementById("submitReturn")
.addEventListener("click", submitReturnItem);
async function submitReturnItem() {
    const select =
        document.getElementById("returnRequest");
    if (!select.value) {
        alert("Select a request.");
        return;
    }
    const returnData = {
        requestId:
            select.value,
        itemId:
            select.options[
                select.selectedIndex
            ].dataset.item,
        qty:
            document.getElementById("returnQty").value,
        comment:
            document.getElementById("returnComment").value,
        returnedBy:
            localStorage.getItem("username"),
        date:
            new Date().toLocaleDateString("en-IN")
    };
    await submitReturn(returnData);
    clearReturnForm();
    await loadReturns();
    await loadApprovedRequests();
    await loadInventory();
    await loadDashboard();
    await loadMyRequests();
    alert("Return recorded successfully.");
}
// Clear Form
function clearReturnForm() {
    document.getElementById("returnRequest").selectedIndex = 0;
    document.getElementById("returnQty").value = "";
    document.getElementById("returnComment").value = "";
}