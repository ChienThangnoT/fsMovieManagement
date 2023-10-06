import { LightningElement, wire } from 'lwc';
import getUserMemberships from '@salesforce/apex/fsGetMember.getUserMemberships';
import { NavigationMixin } from 'lightning/navigation';

export default class FsOwnMember extends NavigationMixin( LightningElement) {
    @wire(getUserMemberships)
    memberships;

    createNewMembership() {
        // Use the NavigationMixin to navigate to a new record page for Membership
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Membership__c',
                actionName: 'new'
            }
        });
    }
}
