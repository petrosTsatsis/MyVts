package gr.hua.dit.springbootdemo.demo.dao;

import gr.hua.dit.springbootdemo.demo.entity.Vehicle;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public class VehicleDAOImpl implements  VehicleDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Vehicle> findAll() {
        Session session = entityManager.unwrap(Session.class);
        Query query = session.createQuery("from Vehicle ", Vehicle.class);
        List<Vehicle> vehicles = query.getResultList();
        return vehicles;
    }

    @Override
    @Transactional
    public void save(Vehicle vehicle) {
        Vehicle avehicle = entityManager.merge(vehicle);
    }

    @Override
    @Transactional
    public Vehicle findById(int id) {
        return entityManager.find(Vehicle.class, id);
    }

    @Override
    @Transactional
    public void delete(int id) {
        Vehicle vehicle = entityManager.find(Vehicle.class, id);
        entityManager.remove(vehicle);
    }
}
