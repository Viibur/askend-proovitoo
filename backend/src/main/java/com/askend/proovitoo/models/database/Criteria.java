package com.askend.proovitoo.models.database;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "criteria")
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long filterId;
    private String type;
    private String condition;
    private String criteriaValue;
}