import { LightningElement, track } from 'lwc';
import fsgetMovie from '@salesforce/apex/fsGetMovie.fsgetMovie';

export default class MovieSearch extends LightningElement {
    @track title = '';
    @track startDate = '';
    @track endDate = '';
    @track pageSize = 10;
    @track pageIndex = 1;
    @track movies = [];

    handleTitleChange(event) {
        this.title = event.target.value;
    }

    handleStartDateChange(event) {
        this.startDate = event.target.value;
    }

    handleEndDateChange(event) {
        this.endDate = event.target.value;
    }

    handlePageSizeChange(event) {
        this.pageSize = parseInt(event.target.value);
    }

    handlePageIndexChange(event) {
        this.pageIndex = parseInt(event.target.value);
    }

    handleSearchClick() {
        fsGetMovie({ 
            pageNumber: this.pageIndex, 
            pageSize: this.pageSize, 
            title: this.title, 
            startDate: this.startDate, 
            endDate: this.endDate 
        })
        .then(result => {
            this.movies = result;
        })
        .catch(error => {
            console.error('Error fetching movie data', error);
        });
    }
}
