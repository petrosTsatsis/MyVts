package gr.hua.dit.springbootdemo.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="seller")
public class Seller implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    @NotBlank(message="Please enter the first name")
    @Size(max = 30, message = "Name should not be greater than 30 characters")
    private String firstName;

    @Column(name = "last_name")
    @NotBlank(message="Please enter the lastname")
    @Size(max = 30, message = "Name should not be greater than 30 characters")
    private String lastName;

    @Column(name="email", unique = true)
    @Email(message = "Please enter a valid email")
    @Size(max = 100)
    private String email;

    @Column(name="VATnumber", unique = true)
    @NotNull(message = "VAT number is required")
    private String VATnum;

    @Column(name = "phoneNumber")
    @NotNull(message = "Phone is required")
    private String phoneNum;

    @OneToMany(mappedBy="seller",
            cascade= {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE})
    @JsonIgnore
    private List<Vehicle> vehicles;

    @OneToMany(mappedBy="seller",
            cascade= {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE})
    @JsonIgnore
    private List<Transaction> transactions;


    public Seller(String firstName, String lastName, String email, String VATnum, String phoneNum) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.VATnum = VATnum;
        this.phoneNum = phoneNum;
    }

    public Seller(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVATnum() {
        return VATnum;
    }

    public void setVATnum(String VATnum) {
        this.VATnum = VATnum;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public List<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(List<Vehicle> vehicles) {
        this.vehicles = vehicles;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }


    @Override
    public String toString() {
        return "Seller{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", VATnum='" + VATnum + '\'' +
                ", phoneNum=" + phoneNum +
                ", vehicles=" + vehicles +
                ", transactions=" + transactions +
                '}';
    }
}
