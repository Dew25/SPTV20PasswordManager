

class AdminModule{
    getRoles(){
        let pormiseRoles = fetch('getRoles',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
        });
        pormiseRoles.then(response => response.json())
                    .then(response => {
                        if(response.roles.length > 0){
                            return response.roles;
                        }
                        document.getElementById('info').innerHTML = 'Список ролей пуст';
                    })
                    .catch(error =>{
                       document.getElementById('info').innerHTML = 'Ошибка сервера: '+error
                        
                    })
    }
    getUsersMap(){
        let promiseUsersMap = fetch('getUsersMap',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
        });
        promiseUsersMap.then(response => response.json())
                       .then(response => {
                           if(response.usersMap.length > 0){
                               return response.usersMap;
                           }
                           document.getElementById('info').innerHTML = 'Список пользователей пуст';
                           
                       })
                       .catch(error => {
                           document.getElementById('info').innerHTML = 'Ошибка сервера: '+error
                       });
       
    }
    setNewRole(){
        const userId = document.getElementById('select_users').value;
        const roleId = document.getElementById('select_roles').value;
        const newUserRole = {
            "userId": userId,
            "roleId": roleId
        };
        let promiseSetUserRole = fetch('setUserRole',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newUserRole)
        });
        promiseSetUserRole.then(response => response.json())
                          .then(response =>{
                              if(response.status){
                                  adminModule.setNewRole(response.user,response.role);
                                  adminModule.insertSelectedOptions(adminModule.getUsersMap(),adminModule.getRoles());
                              }
                              document.getElementById('info').innerHTML = response.info;
                          })
                          .catch(error => {
                              document.getElementById('info').innerHTML = 'Ошибка сервера: '+error
                          });
        alert("Новая роль");
    }
    insertSelectedOptions(usersMap,roles){
        const select_users = document.getElementById('select_users');
        for(let i=0; i < usersMap.length; i++){
            const option = document.createElement('option');
            option.value = usersMap[i].user.id;
            option.text = `${usersMap[i].user.login}. Роль: ${usersMap[i].role}`;
            select_users.add(option);
        }
        
        const select_roles = document.getElementById('select_roles');
        for(let i=0; i < roles.length; i++){
            const option = document.createElement('option');
            option.value = roles[i].id;
            option.text = roles[i].roleName;
            select_roles.add(option);
        }
    }
}
const adminModule = new AdminModule();
export {adminModule};

