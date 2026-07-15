let editingItemId = null;

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
    clearInventoryForm();
    editingItemId = null;
    document.getElementById("saveInventory").innerText = "Save Item";
}
async function loadInventory() {
    const inventory = await getInventory();
    renderInventoryTable(inventory);
}
async function populateInventoryDropdown() {
    const inventory = await getInventory();
    const select = document.getElementById("requestItem");
    if (!select) return;
    select.innerHTML = '<option value="">Select Item</option>';
    inventory.forEach(item => {
        select.innerHTML += `
            <option
                value="${item["Item ID"]}"
                data-name="${item["Item Name"]}">
                ${item["Item Name"]}
            </option>
        `;
    });
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
                <th class="text-center">Action</th>
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
            <td class="text-center">
                <button
                    onclick="editInventory('${item["Item ID"]}')"
                    class="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded">
                    Edit
                </button>
            </td>
        </tr>
        `;
    });
    html += "</tbody></table>";
    document.getElementById("inventorySection").innerHTML = html;
}

async function editInventory(itemId){
    const inventory = await getInventory();
    const item = inventory.find(i => i["Item ID"] == itemId);
    if(!item) return;
    editingItemId = itemId;
    document.getElementById("itemName").value =
        item["Item Name"];
    document.getElementById("category").value =
        item["Category"];
    document.getElementById("qty").value =
        item["Available Qty"];
    document.getElementById("customer").value =
        item["Customer"];
    document.getElementById("purchaseDate").value =
        item["Purchase Date"];
    document.getElementById("remarks").value =
        item["Remarks"];
    document.getElementById("cost").value =
        item["Cost Per Unit"];
    document.getElementById("saveInventory").innerText =
        "Update Item";
    openAddModal();
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
    if(editingItemId){
        item.itemId = editingItemId;
        await updateInventory(item);
    }
    else{
        await addInventory(item);
    }
    clearInventoryForm();
    editingItemId = null;
    document.getElementById("saveInventory").innerText = "Save Item";
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
    editingItemId = null;
}