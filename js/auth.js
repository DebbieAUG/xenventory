const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", login);
async function login(e) {
    e.preventDefault();
    const username = document
        .getElementById("username")
        .value
        .trim();
    const password = document
        .getElementById("password")
        .value
        .trim();
    const response = await api.login(username, password);
    if (!response.success) {
        document
            .getElementById("error")
            .classList
            .remove("hidden");
        return;
    }
    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.user)
    );
    window.location.href = "dashboard.html";
}