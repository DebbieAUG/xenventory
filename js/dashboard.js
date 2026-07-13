document.addEventListener("DOMContentLoaded", init);
async function init() {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if (!username) {
        window.location = "index.html";
        return;
    }
    document.getElementById("loggedUser").innerText = username;
    configureRole(role);
    await loadDashboard();
    await loadInventory();
    await populateInventoryDropdown();
    await loadPendingRequests();
    // await loadReturns();
}
function configureRole(role) {
    if (role === "Admin") {
        document
            .querySelectorAll(".admin-only")
            .forEach(el => el.classList.remove("hidden"));
        document
            .querySelectorAll(".user-only")
            .forEach(el => el.classList.remove("hidden"));
    }
    else {
        document
            .querySelectorAll(".admin-only")
            .forEach(el => el.classList.add("hidden"));
        document
            .querySelectorAll(".user-only")
            .forEach(el => el.classList.remove("hidden"));
    }
}
async function loadDashboard() {
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