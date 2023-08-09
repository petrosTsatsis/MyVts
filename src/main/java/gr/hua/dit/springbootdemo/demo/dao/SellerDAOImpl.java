package gr.hua.dit.springbootdemo.demo.dao;


import gr.hua.dit.springbootdemo.demo.entity.Seller;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public class SellerDAOImpl implements SellerDAO{

    @Autowired
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Seller> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Query query = session.createQuery("from Seller", Seller.class);
        List<Seller> sellers = query.getResultList();
        return sellers;
    }

    @Override
    @Transactional
    public void save(Seller seller) {
        Seller aseller = entityManager.merge(seller);
    }

    @Override
    @Transactional
    public Seller findById(int id) {
        return entityManager.find(Seller.class, id);
    }

    @Override
    @Transactional
    public void delete(int id) {
        Seller seller = entityManager.find(Seller.class, id);
        entityManager.remove(seller);
    }


}
