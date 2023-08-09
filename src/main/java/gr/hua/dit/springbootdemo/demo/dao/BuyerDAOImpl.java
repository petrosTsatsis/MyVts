package gr.hua.dit.springbootdemo.demo.dao;

import gr.hua.dit.springbootdemo.demo.entity.Buyer;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public class BuyerDAOImpl implements BuyerDAO{

    @Autowired
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Buyer> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Query query = session.createQuery("from Buyer", Buyer.class);
        List<Buyer> buyers = query.getResultList();
        return buyers;
    }

    @Override
    @Transactional
    public void save(Buyer buyer) {
        Buyer abuyer = entityManager.merge(buyer);
    }

    @Override
    @Transactional
    public Buyer findById(int id) {
        return entityManager.find(Buyer.class, id);
    }

    @Override
    @Transactional
    public void delete(int id) {
        Buyer buyer = entityManager.find(Buyer.class, id);
        entityManager.remove(buyer);
    }
}
