package com.askend.proovitoo.backend;

import com.askend.proovitoo.mappers.FilterMapper;
import com.askend.proovitoo.models.database.Criteria;
import com.askend.proovitoo.models.database.Filter;
import com.askend.proovitoo.models.dto.CriteriaDTO;
import com.askend.proovitoo.models.dto.FilterDTO;
import com.askend.proovitoo.models.dto.FilterNameDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FilterService {
    private final FilterMapper filterMapper;
    private final FilterRepository filterRepository;
    private final CriteriaRepository criteriaRepository;

    public FilterDTO getfilterById(Long id) {
        Optional<Filter> filter = filterRepository.findById(id);
        if (filter.isPresent()) {
            List<Criteria> criteria = criteriaRepository.findAllByFilterId(id);
            FilterDTO filterDTO = filterMapper.toDTO(filter.get());
            filterDTO.setCriteria(filterMapper.toCriteriaDTOs(criteria));
            return filterDTO;
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
        Long savedId = filterRepository.save(filter).getId();

        List<Criteria> criteriaList = filterMapper.toEntity(filterDTO.getCriteria());
        for (Criteria criteria : criteriaList) {
            criteria.setFilterId(savedId);
        }
        criteriaRepository.saveAll(criteriaList);
    }
}
