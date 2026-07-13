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