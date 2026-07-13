document.getElementById("loggedUser").innerText =
localStorage.getItem("username");
const role=localStorage.getItem("role");
if(role!=="Admin"){
    document
    .getElementById("showAdd")
    .style.display="none";
}

async function loadInventory(){
    const inventory=await getInventory();
    let html = `
    <table class="min-w-full">
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
    inventory.forEach(item=>{
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
    html+="</table>";
    document
    .getElementById("inventorySection")
    .innerHTML=html;
    const totalItems = inventory.length;
    const totalQty = inventory.reduce(
        (sum, item) => sum + Number(item["Available Qty"]),
        0
    );
}

const modal = document.getElementById("addModal");
const addBtn = document.getElementById("showAdd");
const closeBtn = document.getElementById("closeModal");
if(addBtn){
    addBtn.onclick = () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
}
closeBtn.onclick = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

document.getElementById("closeModalSecondary").onclick = closeModal;
function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

document
.getElementById("saveInventory")
.onclick = async () => {
    const item = {
        item: document.getElementById("itemName").value,
        category: document.getElementById("category").value,
        qty: document.getElementById("qty").value,
        customer: document.getElementById("customer").value,
        purchaseDate: document.getElementById("purchaseDate").value,
        remarks: document.getElementById("remarks").value,
        cost: document.getElementById("cost").value
    };
    if(item.item===""){
        alert("Item Name required");
        return;
    }
    await addInventory(item);
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    clearForm();
    loadInventory();
}

function clearForm(){
    document.getElementById("itemName").value="";
    document.getElementById("category").value="";
    document.getElementById("qty").value="";
    document.getElementById("customer").value="";
    document.getElementById("purchaseDate").value="";
    document.getElementById("remarks").value="";
    document.getElementById("cost").value="";
}

async function loadDashboard(){
    const dashboard = await getDashboard();
    document.getElementById("cardInventory").innerText =
        dashboard.totalItems;
    document.getElementById("cardAvailable").innerText =
        dashboard.availableQty;
    document.getElementById("cardPending").innerText =
        dashboard.pending;
    document.getElementById("cardApproved").innerText =
        dashboard.approved;
}

window.onload = async () => {
    await loadDashboard();
    await loadInventory();
};

const btnInventory = document.getElementById("downloadInventory");

if (btnInventory) {
    btnInventory.onclick = downloadInventory;
}
const btnRequests = document.getElementById("downloadRequests");

if (btnRequests) {
    btnRequests.onclick = downloadRequests;
}
const btnReturns = document.getElementById("downloadReturns");

if (btnReturns) {
    btnReturns.onclick = downloadReturns;
}