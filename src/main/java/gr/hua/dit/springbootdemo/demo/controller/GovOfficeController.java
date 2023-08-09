package gr.hua.dit.springbootdemo.demo.controller;

import gr.hua.dit.springbootdemo.demo.entity.GovOffice;
import gr.hua.dit.springbootdemo.demo.entity.Vehicle;
import gr.hua.dit.springbootdemo.demo.repository.GovOfficeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/offices")
public class GovOfficeController {

    @Autowired
    private GovOfficeRepository govOfficeRepository;


    // get all offices
    @GetMapping(" ")
    List<GovOffice> getAll(){
        return govOfficeRepository.findAll();
    }

    //add a new office
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add-office")
    GovOffice save(@RequestBody GovOffice govOffice) {
        govOffice.setId(0);
        govOfficeRepository.save(govOffice);
        return govOffice;
    }

    //get office by id
    @GetMapping("/{id}")
    GovOffice get(@PathVariable int id) {
        GovOffice govOffice = govOfficeRepository.findById(id);
        return govOffice;
    }

    //delete office by id
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    GovOffice delete(@PathVariable("id") int id){
        govOfficeRepository.deleteById(id);
        return null;
    }

    //update a office
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/edit-office/{id}")
    public ResponseEntity<GovOffice> updateVehicle(@PathVariable int id, @RequestBody GovOffice govOfficeDetails){
        GovOffice updateGovOffice = govOfficeRepository.findById(id);

        if (updateGovOffice == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Office not found"
            );
        }

        //update govOffice
        updateGovOffice.setAddress(govOfficeDetails.getAddress());


        govOfficeRepository.save(updateGovOffice);

        return ResponseEntity.ok(updateGovOffice);
    }
}
