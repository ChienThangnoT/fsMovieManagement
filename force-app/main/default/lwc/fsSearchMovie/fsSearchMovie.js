import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fsgetMovie from '@salesforce/apex/fsGetMovie.fsgetMovie';

export default class fsSearchMovie extends LightningElement {
    @track searchQuery = '';
    @track startDate = null;
    @track endDate = null;
    @track filteredMovies;
    @track error;
    @track pageNumber = 1;
    @track pageSize = 6;

    handleSearch(event) {
        this.searchQuery = event.target.value;
        this.pageNumber = 1; 
    }

    handleStartDateChange(event) {
        this.startDate = event.target.value;
    }

    handleEndDateChange(event) {
        this.endDate = event.target.value;
    }

    @wire(fsgetMovie, { title: '$searchQuery', pageNumber: '$pageNumber', pageSize: '$pageSize' })
    wiredMovies({ error, data }) {
        if (data) {
            this.filteredMovies = data;
        } else if (error) {
            this.error = error;
            const toastEvent = new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            });
            this.dispatchEvent(toastEvent);
        }
    }

    get isPreviousDisabled() {
        return this.pageNumber <= 1;
    }

    get isNextDisabled() {
        return this.filteredMovies && this.filteredMovies.length < this.pageSize;
    }

    handlePreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
        }
    }

    handleNextPage() {
        if (this.filteredMovies && this.filteredMovies.length === this.pageSize) {
            this.pageNumber++;
        }
    }
}
