package gr.hua.dit.springbootdemo.demo.controller;

import gr.hua.dit.springbootdemo.demo.dao.TransactionDAO;
import gr.hua.dit.springbootdemo.demo.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionDAO transactionDAO;

    //get all transactions
    @GetMapping("")
    List<Transaction> getall() {
        return transactionDAO.findAll();
    }

    //get transaction by id
    @GetMapping("/{id}")
    Transaction get(@PathVariable int id) {
        Transaction transaction = transactionDAO.findById(id);
        return transaction;
    }

    //delete transaction
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        transactionDAO.delete(id);
    }

    //update a status of the transaction
    @PreAuthorize("hasRole('SELLER') OR hasRole('ADMIN') OR hasRole('BUYER')")
    @PutMapping("/update-transfer/{id}")
    public ResponseEntity<Transaction> updateStatus(@PathVariable int id, @RequestBody Transaction transactionDetails){
        Transaction updateTransaction = transactionDAO.findById(id);

        if (updateTransaction == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Seller not found"
            );
        }

        //update status of transaction
        updateTransaction.setStatus(transactionDetails.getStatus());
        updateTransaction.setAddress(transactionDetails.getAddress());
        updateTransaction.setBuyerVAT(transactionDetails.getBuyerVAT());

        transactionDAO.save(updateTransaction);

        return ResponseEntity.ok(updateTransaction);
    }

}
