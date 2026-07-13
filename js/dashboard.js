document.getElementById("loggedUser").innerText =
localStorage.getItem("username");
const role=localStorage.getItem("role");
if(role!=="Admin"){
    document
    .getElementById("showAdd")
    .style.display="none";
}
document
.getElementById("showInventory")
.onclick=loadInventory;
async function loadInventory(){
    const inventory=await getInventory();
    let html=`
    <table class="table-auto w-full border">
    <tr>
    <th>Item ID</th>
    <th>Item</th>
    <th>Qty</th>
    <th>Customer</th>
    </tr>
    `;
    inventory.forEach(item=>{
        html+=`
        <tr>
        <td>${item["Item ID"]}</td>
        <td>${item["Item Name"]}</td>
        <td>${item["Available Qty"]}</td>
        <td>${item["Customer"]}</td>
        </tr>
        `;
    });
    html+="</table>";
    document
    .getElementById("inventorySection")
    .innerHTML=html;
}
loadInventory();