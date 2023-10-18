import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fsgetMovie from '@salesforce/apex/fsGetMovie.fsgetMovie';

export default class fsSearchMovie extends LightningElement {
    @track searchQuery = '';
    @track filteredMovies = [];
    @track error;
    @track pageNumber = 1;
    @track pageSize = 6;
    @track oldDate;
    @track oldDate2;

    connectedCallback() {
        this.loadMovies();
    }

    handleSearch(event) {
        this.searchQuery = event.target.value;
        this.pageNumber = 1;
        this.loadMovies();
    }

    handleChangeAction(event) {
        if (event.target.name === 'oldDate') {
            this.oldDate = event.target.value;
        }

        if (event.target.name === 'oldDate2') {
            this.oldDate2 = event.target.value;
        }

        this.loadMovies();
    }

    handlePreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
            this.loadMovies();
        }
    }

    handleNextPage() {
        this.pageNumber++;
        this.loadMovies();
    }

    loadMovies() {
        fsgetMovie({
            title: this.searchQuery,
            dateStr1: this.oldDate,
            dateStr2: this.oldDate2,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
        })
            .then(result => {
                this.filteredMovies = result;
            })
            .catch(error => {
                this.error = error;
                const toastEvent = new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                });
                this.dispatchEvent(toastEvent);
            });
    }

    get isPreviousDisabled() {
        return this.pageNumber <= 1;
    }

    get isNextDisabled() {
        return this.filteredMovies.length < this.pageSize;
    }
}
