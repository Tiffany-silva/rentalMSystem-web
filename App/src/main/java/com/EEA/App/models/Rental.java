/**
 * @Date: 24-12-2020
 * @Description: Describes the model
 *               class for the rental entity
 *               'Rental': An order added for a specific
 *               item of lessor by a lessee
 **/
package com.EEA.App.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@NamedEntityGraph(name = "rental-user-item-graph",
        attributeNodes={
                @NamedAttributeNode("item"),
                @NamedAttributeNode("user")
        })
@Table(name = "rental")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Rental extends AuditModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate rentalDate;

    @NotNull
    private LocalDate returnDate;

    @NotNull
    private Double totalPrice;

    @NotNull
    private EStatus status;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    public Rental(Long id, @NotNull LocalDate rentalDate, @NotNull LocalDate returnDate,
                  @NotNull Double totalPrice, User user, Item item, EStatus status) {
        this.id = id;
        this.rentalDate = rentalDate;
        this.returnDate = returnDate;
        this.totalPrice = totalPrice;
        this.user = user;
        this.item = item;
        this.status=status;
    }

    public Rental(){}

    public EStatus getStatus() { return status; }

    public void setStatus(EStatus status) { this.status = status; }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public void setRentalDate(LocalDate rentalDate) {
        this.rentalDate = rentalDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public LocalDate getRentalDate() {
        return rentalDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public Double getTotalPrice() { return totalPrice; }

    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public Item getItem() { return item; }

    public void setItem(Item item) { this.item = item; }
}
