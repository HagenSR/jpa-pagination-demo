package org.hagensr.elfpagingdemo.people.internal;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.hagensr.elfpagingdemo.people.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class PeopleSpecification {

    public static Specification<Person> searchPeople(SearchCriteria searchCriteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();


            addCriteriaIfPresent(searchCriteria.getFirstName(), "firstName", root, predicates, criteriaBuilder);
            addCriteriaIfPresent(searchCriteria.getLastName(), "lastName", root, predicates, criteriaBuilder);
            addCriteriaIfPresent(searchCriteria.getEmail(), "email", root, predicates, criteriaBuilder);

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static void addCriteriaIfPresent(Optional<String> optionalCriteria,
                                             String fieldName,
                                             Root<Person> root,
                                             List<Predicate> predicates,
                                             CriteriaBuilder criteriaBuilder) {
        optionalCriteria.ifPresent((value) -> {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(fieldName)),
                    value.toLowerCase() + "%"));
        });
    }
}
