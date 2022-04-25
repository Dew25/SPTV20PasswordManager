/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sessian;

import entity.Role;
import entity.User;
import entity.UserRoles;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author user
 */
@Stateless
public class UserRolesFacade extends AbstractFacade<UserRoles> {

    @PersistenceContext(unitName = "SPTV20PasswordManagerPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public UserRolesFacade() {
        super(UserRoles.class);
    }

    public String getRoleUser(User user) {
        try {
            List<String> listRoleName = em.createQuery("SELECT ur.role.roleName FROM UserRoles ur WHERE ur.user = :user")
                    .setParameter("user", user)
                    .getResultList();
            if(listRoleName.contains("ADMINISTRATOR")){
                return "ADMINISTRATOR";
            }else if(listRoleName.contains("USER")){
                return "USER";
            }else{
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public void setUserRole(User user, Role role) {
        removeRolesToUser(user);
        UserRoles ur = new UserRoles();
        ur.setRole(role);
        ur.setUser(user);
        super.create(ur);
    }

    private void removeRolesToUser(User user) {
        em.createQuery("DELETE FROM UserRoles ur WHERE ur.user = :user")
                .setParameter("user", user)
                .executeUpdate();
    }
    
}
