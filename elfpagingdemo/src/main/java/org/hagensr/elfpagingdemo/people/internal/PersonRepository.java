package org.hagensr.elfpagingdemo.people.internal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
interface PersonRepository extends JpaRepository<Person, Integer> {

    Page<Person> findAll(Pageable pageable);
}

