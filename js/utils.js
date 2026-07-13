function formatCurrency(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
}
function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN");
}
function showToast(message) {
    alert(message);
}