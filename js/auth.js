const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        const username =
            document.getElementById("username").value;
        const password =
            document.getElementById("password").value;
        const result = await login(username, password);
        console.log(result);
        if (result.success) {
            localStorage.setItem(
                "username",
                result.username
            );
            localStorage.setItem(
                "role",
                result.role
            );
            window.location = "dashboard.html";
        }
        else {
            const error =
                document.getElementById("error");
            error.innerText = "Invalid username or password";
            error.classList.remove("hidden");
        }
    });
}
if (window.location.pathname.includes("dashboard.html")) {
    if (!localStorage.getItem("username")) {
        window.location = "index.html";
    }
}
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.clear();
        window.location = "index.html";
    }
}