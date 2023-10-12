import { LightningElement, wire, api } from 'lwc';
import getMovieTrailer from '@salesforce/apex/fsGetMovie.getMovieTrailer';

export default class FsShowTrailer extends LightningElement {
    @api recordId;
    movieTrailerURL;

    @wire(getMovieTrailer, { currentMovieId: '$recordId' })
    wiredMovie({ error, data }) {
        if (data) {
            this.movieTrailerURL = data[0].Movie_trailer_URL__c;
        } else if (error) {
        }
    }
}
