package gr.hua.dit.springbootdemo.demo.repository;


import gr.hua.dit.springbootdemo.demo.entity.ERole;
import gr.hua.dit.springbootdemo.demo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

