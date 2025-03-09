package org.hagensr.elfpagingdemo.people;

import lombok.Data;

import java.util.Optional;

@Data
public class SearchCriteria {

    private String firstName;
    private String email;
    private String lastName;

    public Optional<String> getFirstName() {
        return Optional.ofNullable(firstName);
    }

    public Optional<String> getEmail() {
        return Optional.ofNullable(email);
    }

    public Optional<String> getLastName() {
        return Optional.ofNullable(lastName);
    }
}
