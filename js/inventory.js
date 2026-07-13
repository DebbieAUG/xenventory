const modal = document.getElementById("addModal");
const addBtn = document.getElementById("showAdd");
const closeBtn = document.getElementById("closeModal");
const closeBtnSecondary = document.getElementById("closeModalSecondary");
if (addBtn) {
    addBtn.onclick = openAddModal;
}
if (closeBtn) {
    closeBtn.onclick = closeAddModal;
}
if (closeBtnSecondary) {
    closeBtnSecondary.onclick = closeAddModal;
}
function openAddModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}
function closeAddModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}
async function loadInventory() {
    const inventory = await getInventory();
    renderInventoryTable(inventory);
}
function renderInventoryTable(inventory) {
    let html = `
    <table class="min-w-full border-collapse">
        <thead>
            <tr class="bg-slate-200">
                <th class="text-left p-3">ID</th>
                <th class="text-left">Item</th>
                <th class="text-left">Category</th>
                <th class="text-left">Qty</th>
                <th class="text-left">Customer</th>
                <th class="text-left">Purchase Date</th>
                <th class="text-left">Cost</th>
                <th class="text-left">Total</th>
            </tr>
        </thead>
        <tbody>
    `;
    inventory.forEach(item => {
        html += `
        <tr class="border-b hover:bg-slate-50">
            <td class="p-3">${item["Item ID"]}</td>
            <td>${item["Item Name"]}</td>
            <td>${item["Category"]}</td>
            <td>${item["Available Qty"]}</td>
            <td>${item["Customer"]}</td>
            <td>${item["Purchase Date"]}</td>
            <td>₹${item["Cost Per Unit"]}</td>
            <td>₹${item["Total Cost"]}</td>
        </tr>
        `;
    });
    html += "</tbody></table>";
    document.getElementById("inventorySection").innerHTML = html;
}
document.getElementById("saveInventory").onclick = saveInventory;
async function saveInventory() {
    const item = {
        item: document.getElementById("itemName").value,
        category: document.getElementById("category").value,
        qty: document.getElementById("qty").value,
        customer: document.getElementById("customer").value,
        purchaseDate: document.getElementById("purchaseDate").value,
        remarks: document.getElementById("remarks").value,
        cost: document.getElementById("cost").value
    };
    if (!item.item) {
        alert("Item Name is required");
        return;
    }
    await addInventory(item);
    clearInventoryForm();
    closeAddModal();
    await loadInventory();
    await loadDashboard();
}
function clearInventoryForm() {
    document.getElementById("itemName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("customer").value = "";
    document.getElementById("purchaseDate").value = "";
    document.getElementById("remarks").value = "";
    document.getElementById("cost").value = "";
}

