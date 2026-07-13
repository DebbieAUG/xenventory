async function loadPendingRequests() {
    const requests = await getPendingRequests();
    renderPendingRequests(requests);
}
function renderPendingRequests(requests) {
    console.log(requests);
}
async function submitRequest(request) {
    await createRequest(request);
    await loadDashboard();
    await loadPendingRequests();
}
async function approve(requestId) {
    await approveRequest(requestId);
    await loadDashboard();
    await loadInventory();
    await loadPendingRequests();
}
async function reject(requestId) {
    await rejectRequest(requestId);
    await loadPendingRequests();
}