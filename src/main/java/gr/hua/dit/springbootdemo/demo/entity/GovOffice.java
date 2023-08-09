package gr.hua.dit.springbootdemo.demo.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="govOffice")
public class GovOffice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @NotBlank(message="Please enter the address of the GovOffice")
    @Column(name = "address")
    private String address;  //GovOffice Address

    public GovOffice(){}
    public GovOffice(String address) {

        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "GovOffice{" +
                "id=" + id +
                ", address='" + address + '\'' +
                '}';
    }
}
