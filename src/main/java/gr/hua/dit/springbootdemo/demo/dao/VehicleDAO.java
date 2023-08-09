package gr.hua.dit.springbootdemo.demo.dao;

import gr.hua.dit.springbootdemo.demo.entity.Vehicle;
import java.util.List;

public interface VehicleDAO {
    public List<Vehicle> findAll();
    public void save(Vehicle vehicle);

    public Vehicle findById(int id);

    public void delete(int id);
}
