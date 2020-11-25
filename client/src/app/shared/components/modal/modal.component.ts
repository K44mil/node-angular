import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '@shared/services/modal.service';

@Component({ 
    selector: 'box-modal', 
    templateUrl: 'modal.component.html', 
    styleUrls: ['modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    @Input() width: string;
    @Input() height: string;
    @Input() bodyClasses: any;

    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', el => {
            if (el.target.className === 'box-modal') {
                this.close();
            }
        });

        // Modal body element
        const modalBody = document.getElementById('box-modal-body');

        // Add width and height
        if (this.width) modalBody.style.width = this.width;
        if (this.height) modalBody.style.height = this.height;

        // Add classes to body
        if (this.bodyClasses) {
            const classes = this.bodyClasses.split(',');
            for (const c of classes) {
                modalBody.classList.add(c);
            }
        }

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('box-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('box-modal-open');
    }
}