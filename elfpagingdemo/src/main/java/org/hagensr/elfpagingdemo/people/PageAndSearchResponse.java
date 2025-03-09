package org.hagensr.elfpagingdemo.people;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedModel;

@Getter
@Setter
public class PageAndSearchResponse<T> extends PagedModel<T> {
    private SearchCriteria searchCriteria;

    public PageAndSearchResponse(Page<T> page, SearchCriteria searchCriteria) {
        super(page);
        this.searchCriteria = searchCriteria;
    }
}
