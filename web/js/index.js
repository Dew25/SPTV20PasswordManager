const menu_list_pages = document.getElementById("menu_list_pages");
menu_list_pages.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
})
const menu_add = document.getElementById("menu_add");
menu_add.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
})

const menu_profile = document.getElementById("menu_profile");
menu_profile.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
})
const menu_about = document.getElementById("menu_about");
menu_about.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleActiveMenu(e.target.id);
    toggleMenuLogin(e.target.id);
})
const menu_login = document.getElementById("menu_login");
menu_login.addEventListener("click", (e) => {
    e.preventDefault();
    //toggleMenuLogin(e.target.id);
    showLoginForm();
})
const menu_logout = document.getElementById("menu_logout");
menu_logout.addEventListener("click",(e)=>{
    e.preventDefault();
    toggleMenuLogin(e.target.id);
    sendLogout();
})
const info = document.getElementById("info");


function toggleActiveMenu(selectedElementId){
    document.getElementById("info").innerHTML='';
    const listNavlinks = document.getElementsByClassName("nav-link");
    for(let i = 0; i < listNavlinks.length; i++){
        console.log('id='+listNavlinks[i].id);
        if(listNavlinks[i].id === selectedElementId){
           if(!listNavlinks[i].classList.contains("active")){
               listNavlinks[i].classList.add("active");
           }
        }else{
            if(listNavlinks[i].classList.contains("active")){
               listNavlinks[i].classList.remove("active");
            }
        }
    }
}


function toggleMenuLogin(elementId){
    if(elementId === "menu_login"){
        hiddenMenuLogin()  
    }else if(elementId === "menu_logout"){
        showMenuLogin()
    }
   
}
function showMenuLogin(){
    document.getElementById("menu_logout").classList.add('d-none');
    document.getElementById("menu_login").classList.remove('d-none');
    toggleActiveMenu("");
    hiddenMenu();
    document.getElementById("info").innerHTML='Вы вышли';
}
function hiddenMenuLogin(){
    const menu_logout = document.getElementById("menu_logout");
    menu_logout.classList.remove('d-none');
    const menu_login = document.getElementById("menu_login")
    menu_login.classList.add('d-none');
    toggleActiveMenu("");
    showMenu();
    document.getElementById("info").innerHTML='Вы вошли';
}
function showMenu(){
    document.getElementById('menu_add').classList.remove('d-none');
    document.getElementById('menu_profile').classList.remove('d-none');
}
function hiddenMenu(){
    document.getElementById('menu_add').classList.add('d-none');
    document.getElementById('menu_profile').classList.add('d-none');
}
function showLoginForm(){
    const content = document.getElementById('content');
    content.innerHTML = `<div class="card border-primary mb-3 mx-auto" style="max-width: 30rem;">
                            <h3 class="card-header text-center">Авторизация</h3>
                            <div class="card-body">
                              <div class="form-group">
                                <label for="login" class="form-label mt-4">Логин</label>
                                <input type="text" class="form-control" id="login" placeholder="Логин">
                              </div>
                              <div class="form-group">
                                <label for="password" class="form-label mt-4">Пароль</label>
                                <input type="password" class="form-control" id="password" placeholder="password">
                              </div>
                            </div>
                            <button id="btnLogin" type="submit" class="btn btn-primary m-3">Войти</button>
                        </div>`;
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', (e)=>{
        e.preventDefault();
        sendCredential();
    });
}

function sendCredential(){
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const credential = {
        "login": login,
        "password": password
    };
    let promise = fetch('login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset:utf8'
        },
        body: JSON.stringify(credential)
    });
    promise.then(response=> response.json())
       .then(response =>{
           if(response.auth){
               document.getElementById('info').innerHTML = response.info;
               showMenu();
               hiddenMenuLogin();
           }else{
               hiddenMenu();
               showMenuLogin();
               document.getElementById('info').innerHTML = "Ошибка авторизации";
           }
       })
       .catch(
            document.getElementById('info').innerHTML = "Ошибка запроса"
       )
 }
 function sendLogout(){
     let promise = fetch('logout', {
         method: 'GET',
     });
     promise.then(response => response.json())
             .then(response => {
                 if(!response.auth){
                    hiddenMenu();
                    showMenuLogin();
                    document.getElementById('info').innerHTML = "Вы вышли";
                    showLoginForm();
                 }
     })
     
 }
