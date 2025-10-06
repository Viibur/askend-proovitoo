package com.askend.proovitoo.backend;

import com.askend.proovitoo.models.database.Filter;
import com.askend.proovitoo.models.dto.FilterDTO;
import com.askend.proovitoo.models.dto.FilterNameDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class FilterController {

    private final FilterService filterService;

    @GetMapping(value = "/filter_names", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FilterNameDTO>> getFilterNames() {
        return new ResponseEntity<>(filterService.getFilterNames(), HttpStatus.OK);
    }

    @GetMapping(value = "/filter/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FilterDTO> getFilterById(@PathVariable Long id) {
        return new ResponseEntity<>(filterService.getfilterById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/add_filter", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> addFilter(@RequestBody FilterDTO filterDTO) {
        filterService.addFilter(filterDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
