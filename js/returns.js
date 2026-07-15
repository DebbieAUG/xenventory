async function loadReturns() {
    const returns = await getReturns();
    renderReturns(returns);
}
function renderReturns(returns) {
    console.log(returns);
}
async function submitReturnItem(returnData) {
    await submitReturn(returnData);
    await loadDashboard();
    await loadInventory();
    await loadReturns();
}

document
.getElementById("submitReturn")
.addEventListener("click", submitReturnItem);

async function loadApprovedRequests(){
    const requests = await getApprovedRequests();
    console.log("Approved Requests:", requests);
    populateReturnDropdown(requests);
}

function populateReturnDropdown(requests) {
    const select = document.getElementById("returnRequest");
    if (!select) return;
    select.innerHTML = '<option value="">Select Approved Request</option>';
    if (!Array.isArray(requests)) {
        console.error("Expected array, got:", requests);
        return;
    }
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

document
.getElementById("returnRequest")
.onchange = function(){
    const option =
        this.options[this.selectedIndex];
    document
        .getElementById("returnQty")
        .value =
        option.dataset.qty || "";
}

async function submitReturnItem(){
    const select =
        document.getElementById("returnRequest");
    if(!select.value){
        alert("Select a request.");
        return;
    }
    const returnData={
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
    await loadReturns();
    await loadInventory();
    await loadDashboard();
    await loadApprovedRequests();
    alert("Return recorded.");
}