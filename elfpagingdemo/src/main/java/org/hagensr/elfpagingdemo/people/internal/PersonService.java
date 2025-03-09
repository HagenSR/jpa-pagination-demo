package org.hagensr.elfpagingdemo.people.internal;

import lombok.RequiredArgsConstructor;
import org.hagensr.elfpagingdemo.people.PageAndSearchResponse;
import org.hagensr.elfpagingdemo.people.PersonDto;
import org.hagensr.elfpagingdemo.people.SearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    public Page<PersonDto> getPeople(Pageable pageable) {
        // Note: Paging default object provided by Endpoint if none is provided
        // The pageable object also provides a sort option, which may degrade performance
        // if a sort is passed to an un-indexed column
        return personRepository.findAll(pageable).map(personMapper::toExternal);
    }

    public PageAndSearchResponse<PersonDto> searchPeople(SearchCriteria searchCriteria, Pageable pageable) {
        // Here, findAll can take a specification and pageable object because our repository extends JpaSpecificationExecutor<Person>
        // The specification uses CriteriaApi to define how to search
        Page<PersonDto> page = personRepository.findAll(PeopleSpecification.searchPeople(searchCriteria), pageable)
                .map(personMapper::toExternal);
        return new PageAndSearchResponse<>(page, searchCriteria);
    }

}
