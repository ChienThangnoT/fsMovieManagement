import { LightningElement, wire, track } from 'lwc';
import fsgetMovie from '@salesforce/apex/fsGetMovie.fsgetMovie';

export default class fsSearchMovie extends LightningElement {
    @track searchQuery = '';
    @track filteredMovies;
    @track error;
    @track pageNumber = 1;
    @track pageSize = 6;

    handleSearch(event) {
        this.searchQuery = event.target.value;
        this.pageNumber = 1; 
    }

    @wire(fsgetMovie, { title: '$searchQuery', pageNumber: '$pageNumber', pageSize: '$pageSize' })
    wiredMovies({ error, data }) {
        if (data) {
            this.filteredMovies = data;
        } else if (error) {
            this.error = error;
        }
    }

    handlePreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
        }
    }

    handleNextPage() {
        if (this.filteredMovies.length === this.pageSize) {
            this.pageNumber++;
        }
    }
    
}