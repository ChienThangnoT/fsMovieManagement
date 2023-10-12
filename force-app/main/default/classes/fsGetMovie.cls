public with sharing class fsGetMovie {

    @AuraEnabled(cacheable=true)
    public static List<MovieWrapper> fsgetMovie(String title, Date startDate, Date endDate, Integer pageNumber, Integer pageSize) {
        Integer offset = (pageNumber - 1) * pageSize;
        
        Date sevenDaysAgo = startDate.addDays(-7);
        
        if (startDate > endDate) {
            throw new AuraHandledException('End Date must be greater than or equal to Start Date.');
        } else if (startDate > sevenDaysAgo) {
            throw new AuraHandledException('Start Date must be at least 7 days before End Date.');
        }
        
        List<Movie__c> movies = [SELECT Id, Name, Duration__c, Genre__c, Description__c, Status__c, Title__c, Movie_img_Url__c, Movie_trailer_URL__c, Premiere_date__c, End_DateE__c
                                FROM Movie__c
                                WHERE Title__c LIKE :('%' + title + '%')
                                
                                ORDER BY Premiere_date__c
                                LIMIT :pageSize OFFSET :offset];

        List<MovieWrapper> movieWrappers = new List<MovieWrapper>();
        for (Movie__c movie : movies) {
            movieWrappers.add(new MovieWrapper(movie));
        }
        
        return movieWrappers;
    }


    @AuraEnabled(cacheable=true)
    public static List<Movie__c> getMovieTrailer(String currentMovieId) {
        return [SELECT Id, Name, Movie_trailer_URL__c 
                FROM Movie__c
                WHERE Id = :currentMovieId];
    }

        

    public class MovieWrapper {
        @AuraEnabled
        public Id Id { get; set; }
        @AuraEnabled
        public String Name { get; set; }
        @AuraEnabled
        public Decimal Duration { get; set; }
        @AuraEnabled
        public String Genre { get; set; }
        @AuraEnabled
        public String Description { get; set; }
        @AuraEnabled
        public String Status { get; set; }
        @AuraEnabled
        public String Title { get; set; }
        @AuraEnabled
        public String Movie_img_Url { get; set; }
        @AuraEnabled
        public String Movie_trailer_URL { get; set; }
        @AuraEnabled
        public Date Premiere_date { get; set; }
        @AuraEnabled
        public Date End_DateE { get; set; }
        public MovieWrapper(Movie__c movie) {
            Id = movie.Id;
            Name = movie.Name;
            Duration = movie.Duration__c;
            Genre = movie.Genre__c;
            Description = movie.Description__c;
            Status = movie.Status__c;
            Title = movie.Title__c;
            Movie_img_Url = movie.Movie_img_Url__c;
            Movie_trailer_URL = movie.Movie_trailer_URL__c;
            Premiere_date = movie.Premiere_date__c;
            End_DateE = movie.End_DateE__c;
        }
    }
}