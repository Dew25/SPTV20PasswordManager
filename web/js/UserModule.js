import {viewModule} from './ViewModule.js';
class UserModule{
    sendNewAccountData(){
        let promiseSentAccound = fetch('addNewAccount',{
            method: 'POST',
            body: new FormData(document.getElementById('form_add_accound'))
        });
        promiseSentAccound.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  userModule.getListAccountData();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (showAddAccountForm)"+error;
                          })
    }
    sendChangeAccountData(){
        let promiseSentAccound = fetch('addChangeAccount',{
            method: 'POST',
            body: new FormData(document.getElementById('form_add_accound'))
        });
        promiseSentAccound.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  userModule.getListAccountData();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (showAddAccountForm)"+error;
                          })
        
    }
    insertChangeAccountData(changeAccountDataId){
       
        
        let promiseGetChangeAccountData = fetch('getListAccountData?accountDataId='+changeAccountDataId,{
            method: 'GET',
        });
        promiseGetChangeAccountData.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  //заполняем данными инпуты
                                  document.getElementById('id').value=response.changeAccountData.id;
                                  document.getElementById('caption').value=response.changeAccountData.caption;
                                  document.getElementById('url').value=response.changeAccountData.url;
                                  document.getElementById('login').value=response.changeAccountData.login;
                                  document.getElementById('login').readeOnly=true; //логин менять нельзя
                                  document.getElementById('password').value=''; //пароль пустой - значит не меняется
                                  let select = document.getElementById('list_scrinshots'); // заполняем список скриншотов
                                  select.options.length=0; //очищаем, если там что то есть.
                                  for(let i=0;i< response.sctinshots.length; i++){
                                      let option = document.createElement('ogtion');
                                      option.text = response.scrinshots[i].name;
                                      option.value = response.scrinshots[i].name;
                                      select.options.add(option);
                                  }
                                  //делаем видимым список
                                  document.getElementById('list_scrinshots').classList.remove('d-none');
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (showAddAccountForm)"+error;
                          })
    }
    getListAccountData(){
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(user === null){
            document.getElementById('content').innerHTML = '';
            document.getElementById('info').innerHTML = 'Авторизуйтесь!';
            viewModule.showLoginForm();
            return;
        }
        
        let promiseGetListAccountData = fetch('getListAccountData?userId='+user.id+'&t='+Date.now(),{
            method: 'GET',
        });
        promiseGetListAccountData.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  viewModule.showListAccountsData(response.listAccountData);
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (showAddAccountForm)"+error;
                          })
    }
    changeProfile(){
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        const newFirstname = document.getElementById('firstname').value;
        const newLstname = document.getElementById('lastname').value;
        const newPhone = document.getElementById('phone').value;
        const newPassword1 = document.getElementById('password1').value;
        const newPassword2 = document.getElementById('password2').value;
        if(newPassword1 !== newPassword2){
            document.getElementById('info').innerHTML = 'Не совпадают пароли';
            return;
        }
        const changeUser = {
            "id": authUser.id,
            "newFirstname": newFirstname,
            "newLstname": newLstname,
            "newPhone": newPhone,
            "newPassword1": newPassword1,
            "newPassword2": newPassword2,
        }
        let promiseChangeProfile = fetch('changeProfile',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(changeUser)
        });
        promiseChangeProfile.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  document.getElementById('info').innerHTML = response.info;
                                  sessionStorage.setItem('user',JSON.stringify(response.user));
                                  viewModule.showProfileForm();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (changeProfile)"+error;
                          })
    }
    insertAcoountOptions(){
        let promiseListAccounts = fetch('getListAccounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include'
        });
        promiseListAccounts.then(response => response.json())
                    .then(response =>{
                        if(response.status){
                            let select = document.getElementById('changeAccountDataId');
                            select.options.length = 0;
                            let option = document.createElement('option');
                            option.text = 'Выберите страницу для изменения';
                            option.value = '#';
                            select.options.add(option);
                            for (let i=0; i<response.accountData.length;i++) {
                                option = document.createElement('option');
                                option.text = response.accountData[i].caption;
                                option.value = response.accountData[i].id;
                                select.options.add(option);
                            }
                        }
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка insertAuthorOptions: "+error;
                    });
    }
}
const userModule = new UserModule();
export {userModule};

