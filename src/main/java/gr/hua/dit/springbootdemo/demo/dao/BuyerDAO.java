package gr.hua.dit.springbootdemo.demo.dao;

import gr.hua.dit.springbootdemo.demo.entity.Buyer;
import java.util.List;

public interface BuyerDAO {

    public List<Buyer> findAll();
    public void save(Buyer buyer);

    public Buyer findById(int id);

    public void delete(int id);
}
