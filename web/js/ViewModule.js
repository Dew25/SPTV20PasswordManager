import {loginModule} from './LoginModule.js';
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
                            </div>`;
        const btnLogin = document.getElementById('btnLogin');
        btnLogin.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.sendCredential();
        });
    }
}
const viewModule = new ViewModule();
export {viewModule};


