package com.askend.proovitoo.repository;

import com.askend.proovitoo.models.database.Criteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriteriaRepository extends JpaRepository<Criteria, Long> {
    List<Criteria> findAllByFilterId(Long id);
}
