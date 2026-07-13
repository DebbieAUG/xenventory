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
async function downloadInventory() {
    const data = await exportSheet("Inventory");
    downloadCSV(data.data, "Inventory.csv");
}
async function downloadRequests() {
    const data = await exportSheet("Requests");
    downloadCSV(data.data, "Requests.csv");
}
async function downloadReturns() {
    const data = await exportSheet("Returns");
    downloadCSV(data.data, "Returns.csv");
}