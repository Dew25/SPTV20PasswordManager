

package sessian;

import entity.AccountData;
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

    public List<AccountData> findAll(String userId) {
        return em.createQuery("SELECT ad FROM AccountData ad WHERE ad.id = :userId")
                .setParameter("userId", userId)
                .getResultList();
    }

}
