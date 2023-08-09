package gr.hua.dit.springbootdemo.demo.dao;

import gr.hua.dit.springbootdemo.demo.entity.Seller;
import java.util.List;

public interface SellerDAO {

    public List<Seller> findAll();
    public void save(Seller seller);

    public Seller findById(int id);

    public void delete(int id);
}

