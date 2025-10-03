package com.askend.proovitoo.mappers;

import com.askend.proovitoo.models.database.Criteria;
import com.askend.proovitoo.models.database.Filter;
import com.askend.proovitoo.models.dto.CriteriaDTO;
import com.askend.proovitoo.models.dto.FilterDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FilterMapper {
    List<FilterDTO> toDTOs(List<Filter> filters);

    @Mapping(target = "criteria", source = "criteriaList")
    FilterDTO toDTO(Filter filter);

    CriteriaDTO toDTO(Criteria criteria);
}
