package gr.hua.dit.springbootdemo.demo.controller;

import gr.hua.dit.springbootdemo.demo.dao.BuyerDAO;
import gr.hua.dit.springbootdemo.demo.dao.SellerDAO;
import gr.hua.dit.springbootdemo.demo.dao.VehicleDAO;
import gr.hua.dit.springbootdemo.demo.entity.Buyer;
import gr.hua.dit.springbootdemo.demo.entity.Transaction;
import gr.hua.dit.springbootdemo.demo.entity.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/buyers")
public class BuyerController {

    @Autowired
    BuyerDAO buyerDAO;

    @Autowired
    VehicleDAO vehicleDAO;

    @Autowired
    SellerDAO sellerDAO;

    //get all buyers
    @GetMapping("")
    public List<Buyer> getAll()
    {
        return buyerDAO.findAll();
    }

    //create a buyer
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add-buyer")
    Buyer save(@Valid @RequestBody Buyer buyer) {
        buyer.setId(0);
        buyerDAO.save(buyer);
        return buyer;
    }

    //get buyer by id
    @GetMapping("/{id}")
    Buyer get(@PathVariable int id) {
        Buyer buyer = buyerDAO.findById(id);
        return buyer;
    }

    //delete a buyer by id
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        buyerDAO.delete(id);
    }

    // view the vehicles of a buyer by id

    @PreAuthorize("hasRole('BUYER') OR hasRole('Seller')")
    @GetMapping("/{vid}/MyVehicles")
    List<Vehicle> getBuyerVehicles(@PathVariable int vid) {
        Buyer buyer = buyerDAO.findById(vid);

        if (buyer == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Buyer not found"
            );
        }

        return buyer.getVehicles();
    }

    // view the transactions of a buyer by id
    @PreAuthorize("hasRole('BUYER')")
    @GetMapping("/{vid}/MyTransactions")
    List<Transaction> getBuyerTransactions(@PathVariable int vid) {
        Buyer buyer = buyerDAO.findById(vid);

        if (buyer == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Buyer not found"
            );
        }

        return buyer.getTransactions();
    }

    //update a buyer
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/edit-buyer/{id}")
    public ResponseEntity<Buyer> updateBuyer(@PathVariable int id,@RequestBody Buyer BuyerDetails){
        Buyer updateBuyer = buyerDAO.findById(id);

        if (updateBuyer == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Buyer not found"
            );
        }

        //update buyer
        updateBuyer.setFirstName(BuyerDetails.getFirstName());
        updateBuyer.setLastName(BuyerDetails.getLastName());
        updateBuyer.setEmail(BuyerDetails.getEmail());
        updateBuyer.setVATnum(BuyerDetails.getVATnum());
        updateBuyer.setPhoneNum(BuyerDetails.getPhoneNum());

        buyerDAO.save(updateBuyer);

        return ResponseEntity.ok(updateBuyer);
    }

}
