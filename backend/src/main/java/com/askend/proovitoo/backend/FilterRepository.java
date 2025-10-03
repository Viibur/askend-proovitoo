package com.askend.proovitoo.backend;

import com.askend.proovitoo.models.database.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilterRepository extends JpaRepository<Filter, Long> {

    @Query(value = "SELECT id, name FROM Filter", nativeQuery = true)
    List<FilterIdName> findAllIdAndNames();

    interface FilterIdName {
        Long getId();

        String getName();
    }
}
