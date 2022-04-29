
class UserModule{
    showAddAccountForm(){
        let promiseSentAccound = fetch('addNewAccount',{
            method: 'POST',
            body: new FormData(form_add_acound)
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

