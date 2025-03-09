package org.hagensr.elfpagingdemo.people;

import lombok.RequiredArgsConstructor;
import org.hagensr.elfpagingdemo.people.internal.PersonService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("people")
public class PeopleController {

    private final PersonService personService;

    @GetMapping
    public Page<PersonDto> get(Pageable pageable) {
        return personService.getPeople(pageable);
    }

    @GetMapping("/search")
    public PageAndSearchResponse<PersonDto> search(SearchCriteria searchCriteria, Pageable pageable) {
        return personService.searchPeople(searchCriteria, pageable);
    }
}
