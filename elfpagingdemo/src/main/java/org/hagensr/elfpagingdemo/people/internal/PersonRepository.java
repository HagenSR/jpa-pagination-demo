package org.hagensr.elfpagingdemo.people.internal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;


@Repository
interface PersonRepository extends JpaRepository<Person, Integer>, JpaSpecificationExecutor<Person> {

}

