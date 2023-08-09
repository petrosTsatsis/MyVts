package gr.hua.dit.springbootdemo.demo.controller;

import gr.hua.dit.springbootdemo.demo.dao.BuyerDAO;
import gr.hua.dit.springbootdemo.demo.dao.SellerDAO;
import gr.hua.dit.springbootdemo.demo.dao.TransactionDAO;
import gr.hua.dit.springbootdemo.demo.dao.VehicleDAO;
import gr.hua.dit.springbootdemo.demo.entity.*;
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
@RequestMapping("/sellers")
public class SellerController {

    @Autowired
    private SellerDAO sellerDAO;

    @Autowired
    private BuyerDAO buyerDAO;

    @Autowired
    private VehicleDAO vehicleDAO;

    @Autowired
    private TransactionDAO transactionDAO;

    //get all sellers
    @GetMapping("")
    List<Seller> getall() {
        return sellerDAO.findAll();
    }

    //get seller by id
    @GetMapping("/{id}")
    Seller get(@PathVariable int id) {
        Seller seller = sellerDAO.findById(id);
        return seller;
    }

    //create a seller
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add-seller")
    Seller save(@Valid @RequestBody Seller seller) {
        seller.setId(0);
        sellerDAO.save(seller);
        return seller;
    }

    //delete seller by id
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        sellerDAO.delete(id);
    }


    // create/add a vehicle and buyer
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SELLER')")
    @PostMapping("/{sellerId}/buyers/{buyerId}/vehicle")
    Vehicle addVehicle(@PathVariable int sellerId , @PathVariable int buyerId, @RequestBody Vehicle vehicle) {

        Seller seller = sellerDAO.findById(sellerId);
        Buyer buyer = buyerDAO.findById(buyerId);

        if (seller == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Seller not found"
            );
        }

        if (buyer == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Buyer not found"
            );
        }

        vehicle.setSeller(seller);
        vehicle.setBuyer(buyer);

        List<Vehicle> sellerVehicles = seller.getVehicles();
        sellerVehicles.add(vehicle);
        seller.setVehicles(sellerVehicles);

        List<Vehicle> buyerVehicles = buyer.getVehicles();
        buyerVehicles.add(vehicle);
        buyer.setVehicles(buyerVehicles);

        vehicleDAO.save(vehicle);
        sellerDAO.save(seller);
        buyerDAO.save(buyer);

        return vehicle;
    }

    // view the vehicles of a seller by id
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/{vid}/MyVehicles")
    List<Vehicle> getSellerVehicles(@PathVariable int vid) {
        Seller seller = sellerDAO.findById(vid);

        if (seller == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Seller not found"
            );
        }

        return seller.getVehicles();
    }

    //update a seller
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/edit-seller/{id}")
    public ResponseEntity<Seller> updateSeller(@PathVariable int id,@RequestBody Seller sellerDetails){
        Seller updateSeller = sellerDAO.findById(id);

        if (updateSeller == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Seller not found"
            );
        }

        //update seller
        updateSeller.setFirstName(sellerDetails.getFirstName());
        updateSeller.setLastName(sellerDetails.getLastName());
        updateSeller.setEmail(sellerDetails.getEmail());
        updateSeller.setVATnum(sellerDetails.getVATnum());
        updateSeller.setPhoneNum(sellerDetails.getPhoneNum());

        sellerDAO.save(updateSeller);

        return ResponseEntity.ok(updateSeller);
    }
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SELLER')")
    @PostMapping("/{sellerId}/MyVehicles/{vehicleId}/transfer")
    Transaction createTransfer(@PathVariable int sellerId, @PathVariable int vehicleId,
                               @RequestBody Transaction transaction){

        Seller seller = sellerDAO.findById(sellerId);

        if (seller == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Seller not found"
            );
        }

        Vehicle vehicle = vehicleDAO.findById(vehicleId);

        if (vehicle == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Vehicle not found"
            );
        }

        if (vehicle.getTransaction() != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This vehicle is already part of a Transfer!"
            );
        }

        int buyerId = vehicle.getBuyer().getId();
        Buyer buyer = buyerDAO.findById(buyerId);

        if (buyer == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Buyer not found"
            );
        }


        transaction.setSeller(seller);
        transaction.setBuyer(buyer);
        transaction.setVehicle(vehicle);

        transactionDAO.save(transaction);

        return transaction;
    }

    // view the transactions of a seller by id
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/{vid}/MyTransactions")
    List<Transaction> getSellerTransactions(@PathVariable int vid) {
        Seller seller = sellerDAO.findById(vid);

        if (seller == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Seller not found"
            );
        }

        return seller.getTransactions();
    }

    //Specific seller gets all the buyers
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/{sellerId}/buyers")
    public List<Buyer> getAllBuyersForSeller()
    {
        return buyerDAO.findAll();
    }

    //get buyer by id for specific seller
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/{sellerid}/buyers/{buyerId}")
    Buyer getBuyerForSeller(@PathVariable int buyerId) {
        Buyer buyer = buyerDAO.findById(buyerId);
        return buyer;
    }





}
