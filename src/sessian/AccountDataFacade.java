

package sessian;

import entity.AccountData;
import entity.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@Stateless
public class AccountDataFacade extends AbstractFacade<AccountData> {

    @PersistenceContext(unitName = "SPTV20PasswordManagerPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public AccountDataFacade() {
        super(AccountData.class);
    }

    public List<AccountData> findAll(User user) {
        return em.createQuery("SELECT ad FROM AccountData ad WHERE ad.user = :user")
                .setParameter("user", user)
                .getResultList();
    }

}
