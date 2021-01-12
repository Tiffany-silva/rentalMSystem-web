package com.EEA.App.models;

import javax.persistence.*;

@Entity
@Table(name="roles")
public class Role extends AuditModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole type;

    public Role() {

    }

    public Role(ERole type) {
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ERole getType() {
        return type;
    }

    public void setType(ERole name) {
        this.type = name;
    }
}
