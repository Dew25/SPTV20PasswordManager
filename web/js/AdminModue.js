

class AdminModule{
    getRoles(){
        return "[]";
    }
    getUsersMap(){
        return "[]";
    }
    setNewRole(){
        alert("Новая роль");
    }
}
const adminModule = new AdminModule();
export {adminModule};

