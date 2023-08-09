package gr.hua.dit.springbootdemo.demo.dao;

import gr.hua.dit.springbootdemo.demo.entity.Transaction;
import java.util.List;

public interface TransactionDAO {

    public List<Transaction> findAll();
    public void save(Transaction transaction);

    public Transaction findById(int id);

    public void delete(int id);
}
