package com.askend.proovitoo.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaDTO {
    private Long id;
    private Long filterId;
    private String type;
    private String condition;
    private String criteriaValue;
}
