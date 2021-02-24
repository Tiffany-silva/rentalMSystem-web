package com.EEA.App.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

    @Entity
    @NamedEntityGraph(name = "item-user-category-graph",
            attributeNodes={
                    @NamedAttributeNode("category"),
                    @NamedAttributeNode("user")
            })
    @Table(name = "item")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public class Item extends AuditModel{

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long id;

        @Column(name = "itemName")
        private String itemName;

        @Column(name = "description")
        private String description;

        @Column(name = "quantity")
        private Integer quantity;

        @Column(name = "price")
        private Double price;

        @Column(name = "image")
        private String image;

        @ManyToOne(fetch = FetchType.EAGER,  optional = false)
        @JoinColumn(name = "user_id", nullable = false)
        @OnDelete(action = OnDeleteAction.CASCADE)
        private User user;

        @ManyToOne(fetch = FetchType.EAGER, optional = false)
        @JoinColumn(name = "category_id", nullable = false)
        @OnDelete(action = OnDeleteAction.CASCADE)
        private Category category;

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public Item(long id, String itemName, String description, Integer quantity, Double price, Category category, User user, String image) {
            this.id = id;
            this.itemName = itemName;
            this.quantity = quantity;
            this.price = price;
            this.category = category;
            this.description=description;
            this.user=user;
            this.image=image;
        }

        public Item() {
        }

        public User getUser() {
            return user;
        }

        public void setUser(User user) {
            this.user = user;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getItemName() {
            return itemName;
        }

        public void setItemName(String itemName) {
            this.itemName = itemName;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public Category getCategory() {
            return category;
        }

        public void setCategory(Category category) {
            this.category = category;
        }
    }
