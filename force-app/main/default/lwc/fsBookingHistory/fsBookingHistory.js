import { LightningElement, wire, api } from 'lwc';
import getBookings from '@salesforce/apex/fsBookingController.fsBookingController';

export default class FsBookingLWC extends LightningElement {
    @api memberId;
    bookings = [];

    @wire(getBookings, { memberId: '$memberId' })
    wiredBookings({ error, data }) {
        if (data) {
            this.bookings = data;
        } else if (error) {
            console.error(error);
        }
    }

    get hasBookings() {
        return this.bookings && this.bookings.length > 0;
    }

    get hasSeatInfo() {
        return this.bookings.some(booking => booking.Availabel_Seat__r.Normal__c || booking.Availabel_Seat__r.VIP__c || booking.Availabel_Seat__r.VVIP__c);
    }
}
