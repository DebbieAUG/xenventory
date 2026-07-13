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