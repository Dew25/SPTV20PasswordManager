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
        document.getElementById('password').addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                e.preventDefault();
                loginModule.sendCredential();
            }
        });
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
            `<div class="d-flex flex-column">
              <div class="card border-primary mx-auto" style="max-width: 40rem;">
                <form id="form_account">
                    <h3 class="card-header text-center my-3" id="title_page">Новая страница</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="caption" class="form-label mt-4">Заголовок</label>
                        <input type="hidden" id="id" name="id">
                        <input type="text" class="form-control" id="caption" name="caption" placeholder="Заголовок">
                      </div>
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
                      <div id="list_scrinshots" class="form-group mb-4 d-none">
                        <label for="list_covers" class=" col-form-label mt-2">Список загруженных скриншотов</label>
                        <select class="form-select form-control-plaintext" id="scrinshort_id" name="scrinshortId"></select>
                      </div>
                      <div class="w-100 text-center my-3">
                        <button type="submit" class="btn btn-primary my-3" id="btn_add_account">Добавить</button>
                        <button type="submit" class="btn btn-primary my-3 d-none" id="btn_change_account">Изменить</button>
                      </div>
                    </div>
                </form>
              </div>
              <div class="card mx-auto my-2" style="max-width: 40rem;">
                <div class="card-body">
                  <h3 class="card-body text-center">Изменить данные страницы</h3>
                  <select  id="change_account_data_id" style="min-width: 30rem"></select>
                </div>
              </div>
            </div>`;
        userModule.insertAcoountOptions();
        document.getElementById('form_account').addEventListener('submit',e=>{
            e.preventDefault();
            if(!document.getElementById('btn_add_account').classList.contains('d-none')){
                //кнопка добавить
                userModule.sendNewAccountData();
            }else{
                //кнопка изменить
                userModule.sendChangeAccountData();
                document.getElementById('title_page').innerHTML='Новая страница';
                document.getElementById('btn_add_account').classList.remove('d-none');
                document.getElementById('btn_change_account').classList.add('d-none');
                document.getElementById('list_scrinshots').classList.add('d-none');
            }
            
        });
        
        document.getElementById('change_account_data_id').addEventListener('change',e=>{
            e.preventDefault();
            document.getElementById('title_page').innerHTML='Изменить данные'; //изменяем заголовок
            document.getElementById('btn_add_account').classList.add('d-none');//прячем кнопку добавить
            document.getElementById('btn_change_account').classList.remove('d-none');//показываем кнопку изменить
            document.getElementById('list_scrinshots').classList.remove('d-none');//показываем выпадающий список со скриншотами
            const selectSelection = document.getElementById('change_account_data_id').value;
            userModule.insertChangeAccountData(selectSelection); //заполняем форму данными выбранного аккаунта
        });
    }
    showListAccountsData(listAccountData){
        let content = document.getElementById('content');
        content.innerHTML = "";
        let list = document.createElement('div');
        list.classList.add('d-flex');
        list.classList.add('justify-content-center');
        content.appendChild(list);
        for(let i = 0; i < listAccountData.length; i++){
            list.innerHTML +=  
            `<div class="card border-primary m-3 p-2" style="max-width: 18rem;">
                <h3 class="card-header text-center my-3">${listAccountData[i].caption}</h3>
                <a href="${listAccountData[i].url}" target="_blank">
                    <img src="insertFile/${listAccountData[i].pathToImage}" class="card-img-top" style="max-height: 20rem;" alt="...">
                </a>
                <div class="card-body">
                    <p class="card-text">Логин: ${listAccountData[i].login}</p>
                    <p class="card-text">Пароль: ${listAccountData[i].password}</p>
                </div>
            </div>`
        }
    }
    showProfileForm(){
        let authUser = JSON.parse(sessionStorage.getItem('user'));
        const content = document.getElementById('content');
        content.innerHTML =`<div class="card border-primary my-5 mx-auto" style="max-width: 30rem;">
                                <h3 class="card-header text-center">Изменение профиля пользователя</h3>
                                <div class="card-body">
                                  <div class="form-group">
                                    <label for="firstname" class="form-label mt-4">Имя</label>
                                    <input type="text" class="form-control" id="firstname" placeholder="Имя" value="${authUser.firstname}">
                                  </div>
                                  <div class="form-group">
                                    <label for="lastname" class="form-label mt-4">Фамилия</label>
                                    <input type="text" class="form-control" id="lastname" placeholder="Фамилия"  value="${authUser.lastname}">
                                  </div>
                                  <div class="form-group">
                                    <label for="phone" class="form-label mt-4">Телефон</label>
                                    <input type="text" class="form-control" id="phone" placeholder="Телефон"  value="${authUser.phone}">
                                  </div>
                                  <div class="form-group">
                                    <label for="login" class="form-label mt-4">Логин</label>
                                    <input type="text" class="form-control" id="login" placeholder="Логин" readonly value="${authUser.login}">
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
                                <button type="submit" id="btn_change_profile" class="btn btn-primary m-3">Изменить профиль</button>
                            </div>`;
        const btnRegistration = document.getElementById('btn_change_profile');
        btnRegistration.addEventListener('click', (e)=>{
            e.preventDefault();
            userModule.changeProfile();
        })
    }
    showAboutAs(){
        const content = document.getElementById('content');
        content.innerHTML =`<div class="card border-primary my-5 mx-auto" style="max-width: 30rem;">
                                <h3 class="card-header text-center">Наша программа сохранения паролей для Вас!!!</h3>
                                <div class="card-body">
                                        Сохраняйте скриншоты страниц и вы быстро найдете сайт по виду<br><br>
                                        ВАЖНО!!!<br>Пароли для сайтов шифруются при запоминании и прочесть их можете только Вы!<br><br>
                                        Вы также можете изменить данные своего профиля, все кроме логина. Если пароли оставить пустыми, они не поменяются.
                                </div>
                            </div>`;
    }
}
const viewModule = new ViewModule();
export {viewModule};


