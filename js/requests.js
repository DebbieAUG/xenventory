document
.getElementById("submitRequest")
.onclick = submitNewRequest;
async function submitNewRequest() {
    const select =
        document.getElementById("requestItem");
    if (!select.value) {
        alert("Select an item");
        return;
    }
    const request = {
        user:
            localStorage.getItem("username"),
        itemId:
            select.value,
        itemName:
            select.options[
                select.selectedIndex
            ].dataset.name,
        qty:
            document.getElementById("requestQty").value,
        purpose:
            document.getElementById("requestPurpose").value,
        customer:
            document.getElementById("requestCustomer").value,
        date:
            new Date().toLocaleDateString()
    };
    await createRequest(request);
    clearRequestForm();
    await loadPendingRequests();
    await loadDashboard();
    alert("Request Submitted");
}

function clearRequestForm(){

    document.getElementById("requestItem").selectedIndex=0;
    document.getElementById("requestQty").value="";
    document.getElementById("requestPurpose").value="";
    document.getElementById("requestCustomer").value="";
}

function renderPendingRequests(requests){
    const section =
        document.getElementById(
            "pendingRequestsSection"
        );
    if(!section) return;
    let html=`
    <table class="min-w-full">
    <thead>
    <tr class="bg-slate-200">
    <th>User</th>
    <th>Item</th>
    <th>Qty</th>
    <th>Purpose</th>
    <th>Customer</th>
    <th>Date</th>
    <th>Approve</th>
    <th>Reject</th>
    </tr>
    </thead>
    <tbody>
    `;
    requests.forEach(r=>{
        html+=`
        <tr class="border-b">
        <td>${r.User}</td>
        <td>${r["Item Name"]}</td>
        <td>${r.Qty}</td>
        <td>${r.Purpose}</td>
        <td>${r.Customer}</td>
        <td>${r.Date}</td>
        <td>
        <button
            onclick="approve('${r["Request ID"]}')"
            class="bg-green-600 text-white px-3 py-1 rounded">
            ✓
        </button>
        </td>
        <td>
        <button
            onclick="reject('${r["Request ID"]}')"
            class="bg-red-600 text-white px-3 py-1 rounded">
            ✕
        </button>
        </td>
        </tr>
        `;
    });
    html+="</tbody></table>";
    section.innerHTML=html;
}

async function loadMyRequests(){
    const requests = await getUserRequests();
    renderMyRequests(requests);
}

function renderMyRequests(requests){
    const section =
        document.getElementById("myRequestsSection");
    if(!section) return;
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
    requests.forEach(r=>{
        let badge = "";
        switch(r.Status){
            case "Pending":
                badge = "bg-yellow-100 text-yellow-700";
                break;
            case "Approved":
                badge = "bg-green-100 text-green-700";
                break;
            case "Rejected":
                badge = "bg-red-100 text-red-700";
                break;
            case "Returned":
                badge = "bg-blue-100 text-blue-700";
                break;
            default:
                badge = "bg-gray-100 text-gray-700";
        }
        html += `
        <tr class="border-b">
            <td class="p-3">${r["Request ID"]}</td>
            <td>${r["Item Name"]}</td>
            <td>${r.Qty}</td>
            <td>${r.Purpose}</td>
            <td>
                <span class="${badge} px-3 py-1 rounded-full text-sm">
                    ${r.Status}
                </span>
            </td>
            <td>${r.Date}</td>
        </tr>
        `;
    });
    html += "</tbody></table>";
    section.innerHTML = html;
}