import {loginModule} from './LoginModule.js';
import {adminModule} from './AdminModule.js';
import {userModule} from './UserModule.js';
class ViewModule{
    showLoginForm(){
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
                                <p class="info">Нет логина? <a class="text-info" id="registration">Зарегистрируйся</a></p>
                            </div>`;
        const btnLogin = document.getElementById('btnLogin');
        btnLogin.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.sendCredential();
        });
        const registration = document.getElementById('registration');
        registration.addEventListener('click', (e)=>{
            e.preventDefault();
            viewModule.showRegistrationForm();
        })
    }
    showRegistrationForm(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML =`<div class="card border-primary mb-3 mx-auto" style="max-width: 30rem;">
                                <h3 class="card-header text-center">Новый пользователь</h3>
                                <div class="card-body">
                                  <div class="form-group">
                                    <label for="firstname" class="form-label mt-4">Имя</label>
                                    <input type="text" class="form-control" id="firstname" placeholder="Имя">
                                  </div>
                                  <div class="form-group">
                                    <label for="lastname" class="form-label mt-4">Фамилия</label>
                                    <input type="text" class="form-control" id="lastname" placeholder="Фамилия">
                                  </div>
                                  <div class="form-group">
                                    <label for="phone" class="form-label mt-4">Телефон</label>
                                    <input type="text" class="form-control" id="phone" placeholder="Телефон">
                                  </div>
                                  <div class="form-group">
                                    <label for="login" class="form-label mt-4">Логин</label>
                                    <input type="text" class="form-control" id="login" placeholder="Логин">
                                  </div>
                                  <div class="form-group">
                                    <label for="password1" class="form-label mt-4">Пароль</label>
                                    <input type="password" class="form-control" id="password1" placeholder="Пароль">
                                  </div>
                                  <div class="form-group">
                                    <label for="password2" class="form-label mt-4">Повторить пароль</label>
                                    <input type="password" class="form-control" id="password2" placeholder="Повторить пароль">
                                  </div>
                                </div>
                                <button type="submit" id="btn_registration" class="btn btn-primary m-3">Зарегистрироваться</button>
                            </div>`;
        const btnRegistration = document.getElementById('btn_registration');
        btnRegistration.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.registrationNewUser();
        })
    }
    showAdminPanelForm(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="card border-primary my-5 mx-auto" style="max-width: 30rem;">
                <h3 class="card-header text-center">Панель администратора</h3>
                <div class="card-body">
                  <div class="form-group">
                    <label for="select_users" class="form-label mt-4">Пользователи</label>
                    <select class="form-select" id="select_users" name="selectUsers">
                      
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="select_roles" class="form-label mt-4">Роли</label>
                    <select class="form-select" id="select_roles" name="selectRoles">
                      
                    </select>
                  </div>
                <button id="btnSetRole" type="submit" class="btn btn-primary m-3">Назначить роль</button>
            </div>`;
        
        document.getElementById('btnSetRole').addEventListener('click',(e)=>{
            e.preventDefault();
            adminModule.setNewRole();
        });
    }
    showAddAccountForm(){
        document.getElementById("info").innerHTML = '';
        const content = document.getElementById('content');
        content.innerHTML = 
            `<div class="card border-primary mb-3 mx-auto" style="max-width: 40rem;">
                <form id="form_add_accound">
                    <h3 class="card-header text-center my-3">Новая учетная запись</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="url" class="form-label mt-4">URL</label>
                        <input type="text" class="form-control" id="url" name="url" placeholder="URL">
                      </div>
                      <div class="form-group">
                        <label for="login" class="form-label mt-4">Логин</label>
                        <input type="text" class="form-control" id="login" name="login" placeholder="Логин">
                      </div>
                      <div class="form-group">
                        <label for="password" class="form-label mt-4">Пароль</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Пароль">
                      </div>
                      <div class="form-group">
                        <label for="imageFile" class="form-label mt-4">Изображение</label>
                        <input class="form-control" type="file" id="image_file" name="imageFile">
                      </div>  
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_add_account">Добавить</button>
                      </div>
                    </div>
                </form>
            </div>`;
        document.getElementById('form_add_accound').addEventListener('submit',e=>{
            e.preventDefault();
            userModule.sendNewAccountData();
        });
    }
    showAccountsForm(listAccountData){
        content.innerHTML = "";
        for(let i = 0; i < listAccountData.length; i++){
            listAccountData[i]
            content.innerHTML += 
            `<div class="card border-primary mb-3 mx-auto" style="max-width: 18rem;">
                <h3 class="card-header text-center my-3">${listAccountData[i].url}</h3>
                <a href="accountData.url" target="_blank">
                    <img src="insertFile/${listAccountData[i].pathToImage}" class="card-img-top" style="max-height: 20rem;" alt="...">
                </a>
                <div class="card-body">
                    <p class="card-text">Логин: ${listAccountData[i].login}</p>
                    <p class="card-text">Пароль: ${listAccountData[i].password}</p>
                </div>
            </div>`
        }
    }
}
const viewModule = new ViewModule();
export {viewModule};


