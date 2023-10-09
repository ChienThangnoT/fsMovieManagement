public with sharing class fsGetMember {

    public fsGetMember() {
    }

    @AuraEnabled(cacheable=true)
    public static List<Membership__c> getUserMemberships() {
        Id currentUserId = UserInfo.getUserId();
        return [SELECT Id, Name, Rank__c, Address__c, Email__c
                FROM Membership__c
                WHERE OwnerId = :currentUserId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Membership__c> getMemberships() {
        return [SELECT Id, Name, Rank__c, Address__c, Email__c
                FROM Membership__c];
    }

}
