package gr.hua.dit.springbootdemo.demo.controller;

import gr.hua.dit.springbootdemo.demo.dao.VehicleDAO;
import gr.hua.dit.springbootdemo.demo.entity.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleDAO vehicleDAO;

    //get all vehicles
    @GetMapping("")
    List<Vehicle> getall() {
        return vehicleDAO.findAll();
    }

    //add a new vehicle
    @PreAuthorize("hasRole('ADMIN') OR hasRole('Seller')")
    @PostMapping("/add-vehicle")
    Vehicle save(@RequestBody Vehicle vehicle) {
        vehicle.setId(0);
        vehicleDAO.save(vehicle);
        return vehicle;
    }

    //get vehicle by id
    @GetMapping("/{id}")
    Vehicle get(@PathVariable int id) {
        Vehicle vehicle = vehicleDAO.findById(id);
        return vehicle;
    }

    //delete vehicle by id
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SELLER')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        vehicleDAO.delete(id);
    }

    //update a vehicle
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SELLER')")
    @PutMapping("/edit-vehicle/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable int id,@RequestBody Vehicle vehicleDetails){
        Vehicle updateVehicle = vehicleDAO.findById(id);

        if (updateVehicle == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Vehicle not found"
            );
        }

        //update vehicle
        updateVehicle.setBrand(vehicleDetails.getBrand());
        updateVehicle.setModel(vehicleDetails.getModel());
        updateVehicle.setYear(vehicleDetails.getYear());
        updateVehicle.setRegisternumber(vehicleDetails.getRegisternumber());
        updateVehicle.setLicensenumber(vehicleDetails.getRegisternumber());

        vehicleDAO.save(updateVehicle);

        return ResponseEntity.ok(updateVehicle);
    }

}
