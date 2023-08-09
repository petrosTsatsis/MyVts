package gr.hua.dit.springbootdemo.demo.repository;

import gr.hua.dit.springbootdemo.demo.entity.GovOffice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GovOfficeRepository extends JpaRepository<GovOffice, Integer> {

    GovOffice findById(int id);
    GovOffice deleteById(int id);
}
