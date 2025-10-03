package com.askend.proovitoo.models.database;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "criteria")
public class Criteria {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String type;
    String condition;
    String criteriaValue;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Filter filter;
}