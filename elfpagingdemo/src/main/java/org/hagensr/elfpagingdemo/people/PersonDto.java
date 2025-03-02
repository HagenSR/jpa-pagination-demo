package org.hagensr.elfpagingdemo.people;

import lombok.Data;

import java.time.Instant;

@Data
public class PersonDto {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Instant hireDate;
}
