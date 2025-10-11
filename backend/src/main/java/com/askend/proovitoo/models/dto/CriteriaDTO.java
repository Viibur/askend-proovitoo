package com.askend.proovitoo.models.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaDTO {
    private Long id;
    private Long filterId;
    @NonNull
    private String type;
    @NonNull
    private String condition;
    @NonNull
    private String criteriaValue;
}
