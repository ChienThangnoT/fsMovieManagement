import { LightningElement, wire } from 'lwc';
import getMemberships from '@salesforce/apex/fsGetMember.getMemberships';

export default class FsCreateMember extends NavigationMixin( LightningElement) {
    @wire(getMemberships)
    memberships;

    createNewMembership() {
    
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Membership__c',
                actionName: 'new'
            }
        });
    }
}