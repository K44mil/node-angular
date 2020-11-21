import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import paginate from 'jw-paginate';

@Component({
    selector: 'pagination',
    template: `<ul class="pagination">
                    <!--<li [ngClass]="{disabled: !pagination.prev }" class="page-item first-item">
                        <a (click)="setPage(1)" class="page-link">First</a>
                    </li> -->
                    <li [ngClass]="{disabled: !pagination.prev }" class="page-item previous-item">
                        <a (click)="setPage(this.currentPage - 1)" class="page-link">Previous</a>
                    </li>
                    <li [ngClass]="{active: 1 }" class="page-item number-item">
                        <a (click)="setPage(this.currentPage)" class="page-link">{{ this.currentPage }}</a>
                    </li>
                    <li [ngClass]="{disabled: !pagination.next }" class="page-item next-item">
                        <a (click)="setPage(this.currentPage + 1)" class="page-link">Next</a>
                    </li>
                    <!-- <li [ngClass]="{disabled: !pagination.next }" class="page-item last-item">
                        <a (click)="setPage(pager.totalPages)" class="page-link">Last</a>
                    </li> -->
                </ul>`
})

export class PaginationComponent implements OnInit {
    @Output() changePage = new EventEmitter<any>(true);
    @Output() getPageNumber = new EventEmitter<any>(true);
    @Input() initialPage = 1;
    currentPage = 1;

    @Input() pagination: any = {};

    ngOnInit() {
        this.setPage(this.initialPage);
    }

    // ngOnChanges(changes: SimpleChanges) {
    //     if (changes.items.currentValue !== changes.items.previousValue) {
    //         this.setPage(this.initialPage);
    //     }
    // }

    setPage(page: number) {

        // this.getPageNumber.emit(this.pager.currentPage)
    }
}