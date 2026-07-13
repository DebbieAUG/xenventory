const loginBtn = document.getElementById("loginBtn");
if(loginBtn){
    loginBtn.addEventListener("click",()=>{
        const username=document.getElementById("username").value;
        const password=document.getElementById("password").value;
        if(username==="admin" && password==="admin"){
            localStorage.setItem("username",username);
            localStorage.setItem("role","Admin");
            window.location="dashboard.html";
        }
        else{
            document.getElementById("error").innerText="Invalid Login";
            document.getElementById("error").classList.remove("hidden");
        }
    });
}
if(window.location.pathname.includes("dashboard.html")){
    const user=localStorage.getItem("username");
    if(!user){
        window.location="index.html";
    }
}
const logoutBtn=document.getElementById("logoutBtn");
if(logoutBtn){
    logoutBtn.addEventListener("click",()=>{
        localStorage.clear();
        window.location="index.html";
    });
}