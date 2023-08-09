package gr.hua.dit.springbootdemo.demo.entity;

import com.fasterxml.jackson.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="brand")
    @NotBlank(message="Please enter the brand of the vehicle")
    private String brand;

    @Column(name = "model")
    @NotBlank(message="Please enter the model of the vehicle")
    private String model;

    @Column(name = "year")
    @NotNull(message = "Year is required")
    @DateTimeFormat(pattern = "yyyy")
    private int year;

    @Column(name = "licenseNo") // ΑΡ ΑΔΕΙΑΣ ΚΥΚΛΟΦΟΡΙΑΣ
    private String licensenumber;

    @Column(name = "registerNo") // ΑΡ ΠΙΝΑΚΙΔΑΣ
    private String registernumber;


    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="seller_id")
    @JsonIgnore
    private Seller seller;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="buyer_id")
    @JsonIgnore
    private Buyer buyer;

    @OneToOne(mappedBy = "vehicle", cascade= {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE})

    @JsonIgnore
    private Transaction transaction;



    public Vehicle(){

    }

    public Vehicle(String brand, String model, int year, String licensenumber, String registernumber) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.licensenumber = licensenumber;
        this.registernumber = registernumber;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getLicensenumber() {
        return licensenumber;
    }

    public void setLicensenumber(String licensenumber) {
        this.licensenumber = licensenumber;
    }

    public String getRegisternumber() {
        return registernumber;
    }

    public void setRegisternumber(String registernumber) {
        this.registernumber = registernumber;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", year=" + year +
                ", licensenumber='" + licensenumber + '\'' +
                ", registernumber='" + registernumber + '\'' +
                ", buyer=" + buyer +
                ", seller=" + seller +
                '}';
    }
}

