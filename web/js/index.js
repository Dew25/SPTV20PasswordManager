
const menu_list_pages = document.getElementById("menu_list_pages");
menu_list_pages.addEventListener("click",(e)=>{
    toogleActiveMenu(e.target.id);
})
const menu_add = document.getElementById("menu_add");
menu_add.addEventListener("click",(e)=>{
    toogleActiveMenu(e.target.id);
})

const menu_profile = document.getElementById("menu_profile");
menu_profile.addEventListener("click",(e)=>{
    e.preventDefault();
    toogleActiveMenu(e.target.id);
})
const menu_about = document.getElementById("menu_about");
menu_about.addEventListener("click",(e)=>{
    e.preventDefault();
    toogleActiveMenu(e.target.id);
    hiddenMenu(e.target.id);
})
const menu_login = document.getElementById("menu_login");
menu_login.addEventListener("click", (e) => {
    e.preventDefault();
    hiddenMenu(e.target.id);
})
const menu_logout = document.getElementById("menu_logout");
menu_logout.addEventListener("click",(e)=>{
    e.preventDefault();
    hiddenMenu(e.target.id);
})
const info = document.getElementById("info");


function toogleActiveMenu(selectedElementId){
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


function hiddenMenu(elementId){
    if(elementId === "menu_login"){
        const menu_logout = document.getElementById("menu_logout");
        menu_logout.classList.remove('d-none');
        const menu_login = document.getElementById("menu_login")
        menu_login.classList.add('d-none');
        toogleActiveMenu("")
        document.getElementById("info").innerHTML='Вы вошли';
    }else if(elementId === "menu_logout"){
        document.getElementById("menu_logout").classList.add('d-none');
        document.getElementById("menu_login").classList.remove('d-none');
        toogleActiveMenu("")
        document.getElementById("info").innerHTML='Вы вышли';
    }
   
}