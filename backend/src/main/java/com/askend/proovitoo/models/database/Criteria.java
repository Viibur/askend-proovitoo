package com.askend.proovitoo.models.database;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "criteria")
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long filterId;
    private String type;
    private String condition;
    private String criteriaValue;
}