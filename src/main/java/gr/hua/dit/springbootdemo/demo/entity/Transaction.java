package gr.hua.dit.springbootdemo.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @NotBlank(message="Please enter the status of the transaction")
    @Column(name = "status")
    private String status;  //completed-pending-cancelled

    @NotBlank(message="Please enter the address of the GovOffice")
    @Column(name = "address")
    private String address;  //GovOffice Address

    @NotNull(message="Please enter the VAT number of the buyer")
    @Column(name = "buyerVAT")
    private int buyerVAT;  //Buyer's VAT number

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

    @OneToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE})
    @JoinColumn(name="vehicle_id")
    @JsonIgnore
    private Vehicle vehicle;

    public Transaction(){

    }

    public Transaction(String status, String address, int buyerVAT) {
        this.status = status;
        this.address = address;
        this.buyerVAT = buyerVAT;
    }

    public int getBuyerVAT() {
        return buyerVAT;
    }

    public void setBuyerVAT(int buyerVAT) {
        this.buyerVAT = buyerVAT;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", address='" + address + '\'' +
                ", buyerVAT=" + buyerVAT +
                ", seller=" + seller +
                ", buyer=" + buyer +
                ", vehicle=" + vehicle +
                '}';
    }
}