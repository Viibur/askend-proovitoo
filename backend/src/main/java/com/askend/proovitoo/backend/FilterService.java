package com.askend.proovitoo.backend;

import com.askend.proovitoo.mappers.FilterMapper;
import com.askend.proovitoo.models.database.Filter;
import com.askend.proovitoo.models.dto.FilterDTO;
import com.askend.proovitoo.models.dto.FilterNameDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FilterService {
    private final FilterRepository filterRepository;
    private final FilterMapper filterMapper;

    public List<FilterDTO> getFilters() {
        return filterMapper.toDTOs(filterRepository.findAll());
    }

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
}
