import { LightningElement, wire, track } from 'lwc';
import fsgetMovie from '@salesforce/apex/fsGetMovie.fsgetMovie';

export default class FsListMovie extends LightningElement {
    @track movies;

    @wire(fsgetMovie, { pageNumber: 1, pageSize: 10 })
    wiredMovies({ error, data }) {
        if (data) {
            this.movies = data;
        } else if (error) {
        }
    }
}
