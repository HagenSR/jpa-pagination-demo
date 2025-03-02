package org.hagensr.elfpagingdemo.people.internal;

import org.hagensr.elfpagingdemo.config.MapStructConfig;
import org.hagensr.elfpagingdemo.people.PersonDto;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
interface PersonMapper {

    PersonDto toExternal(Person person);
}
