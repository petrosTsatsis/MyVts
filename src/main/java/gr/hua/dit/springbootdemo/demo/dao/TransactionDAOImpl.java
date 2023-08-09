package gr.hua.dit.springbootdemo.demo.dao;

import gr.hua.dit.springbootdemo.demo.entity.Transaction;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public class TransactionDAOImpl implements TransactionDAO{

    @Autowired
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Transaction> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Query query = session.createQuery("from Transaction ", Transaction.class);
        List<Transaction> transactions = query.getResultList();
        return transactions;
    }

    @Override
    @Transactional
    public void save(Transaction transaction) {
        Transaction atransaction = entityManager.merge(transaction);
    }

    @Override
    @Transactional
    public Transaction findById(int id) {
        return entityManager.find(Transaction.class, id);
    }

    @Override
    @Transactional
    public void delete(int id) {
        Transaction transaction = entityManager.find(Transaction.class, id);
        entityManager.remove(transaction);
    }


}
