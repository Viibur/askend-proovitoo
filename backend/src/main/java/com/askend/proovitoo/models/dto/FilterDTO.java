package com.askend.proovitoo.models.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilterDTO {
    private Long id;
    @NonNull
    private String name;
    private int option;
    private List<CriteriaDTO> criteria;
}
