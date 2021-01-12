package com.EEA.App.models;

import javax.persistence.*;

@Entity
@Table(name = "category")
public class Category extends AuditModel{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "categoryName")
    private String categoryName;

    public Category() {

    }

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

}
