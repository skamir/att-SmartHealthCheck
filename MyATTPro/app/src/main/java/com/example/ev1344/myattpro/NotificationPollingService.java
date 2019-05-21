package com.example.ev1344.myattpro;


import io.reactivex.Observable;
import retrofit2.http.GET;

public interface NotificationPollingService {

    @GET("poll/2345")
    Observable<String> getNotification();
}
