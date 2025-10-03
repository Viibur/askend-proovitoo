package com.askend.proovitoo.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilterDTO {
    private Long id;
    private String name;
    private int option;
    private List<CriteriaDTO> criteria;
}
