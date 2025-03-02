package org.hagensr.elfpagingdemo.people.internal;

import lombok.RequiredArgsConstructor;
import org.hagensr.elfpagingdemo.people.PersonDto;
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

}
