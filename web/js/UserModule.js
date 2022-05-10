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
                                  viewModule.showAccountsForm();
                              }else{
                                  document.getElementById('info').innerHTML = response.info;
                              }
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = "Ошибка сервера (showAddAccountForm)"+error;
                          })
    }
}
const userModule = new UserModule();
export {userModule};

