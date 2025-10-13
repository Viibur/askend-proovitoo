package com.askend.proovitoo.services;

import com.askend.proovitoo.mappers.FilterMapper;
import com.askend.proovitoo.models.database.Criteria;
import com.askend.proovitoo.models.database.Filter;
import com.askend.proovitoo.models.dto.FilterDTO;
import com.askend.proovitoo.models.dto.FilterNameDTO;
import com.askend.proovitoo.repository.FilterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FilterService {
    private final FilterMapper filterMapper;
    private final FilterRepository filterRepository;

    public FilterDTO getfilterById(Long id) {
        Optional<Filter> filter = filterRepository.findById(id);
        if (filter.isPresent()) {
            return filterMapper.toDTO(filter.get());
        }
        throw new EntityNotFoundException("Filter with id=" + id + " not found");
    }

    public List<FilterNameDTO> getFilterNames() {
        List<FilterRepository.FilterIdName> filterIdNames = filterRepository.findAllIdAndNames();
        if (filterIdNames == null || filterIdNames.isEmpty()) {
            return Collections.emptyList();
        }
        return filterIdNames.stream()
                            .map(filterIdName -> new FilterNameDTO(filterIdName.getId(), filterIdName.getName()))
                            .toList();
    }

    @Transactional
    public void addFilter(FilterDTO filterDTO) {
        Filter filter = filterMapper.toEntity(filterDTO);
        for (Criteria criteria : filter.getCriteria()) {
            criteria.setFilter(filter);
        }
        filterRepository.save(filter);
    }
}
