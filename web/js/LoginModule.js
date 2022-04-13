
import {showMenu,hiddenMenu,hiddenMenuLogin, showMenuLogin} from './app.js';
import {viewModule} from './ViewModule.js';

class LoginModule{

 sendCredential(){
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
               document.getElementById('content').innerHTML = "";
           }else{
               hiddenMenu();
               showMenuLogin();
               document.getElementById('info').innerHTML = response.info;
           }
       })
       .catch(
            document.getElementById('info').innerHTML = "Ошибка запроса"
       )
 }
 sendLogout(){
     let promise = fetch('logout', {
         method: 'GET',
     });
     promise.then(response => response.json())
             .then(response => {
                 if(!response.auth){
                    hiddenMenu();
                    showMenuLogin();
                    document.getElementById('info').innerHTML = response.info;
                    viewModule.showLoginForm();
                 }
     })
     
 }
}
const loginModule = new LoginModule();
export {loginModule};