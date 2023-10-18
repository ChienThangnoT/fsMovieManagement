public with sharing class fsBookingController {
    
    @AuraEnabled (cacheable = true)
    public static List<Booking__c> fsBookingController(String memberId) {

        list<Booking__c> lstBooking = new list<Booking__c>();
            for(Booking__c con : [  SELECT Id, Movie__r.Title__c , ShowTime__r.ShowingDate__c, Availabel_Seat__r.Normal__c, Availabel_Seat__r.VIP__c, Availabel_Seat__r.VVIP__c, Name 
                                    FROM Booking__c 
                                    WHERE Membership__c = :memberId
                                    LIMIT 100])  {
                lstBooking.add(con);
            } 
            return lstBooking;  
    }
}
