package com.example.ev1344.myattpro;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import java.util.concurrent.TimeUnit;

import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;
import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    Button showDialogButton;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        final OkHttpClient okHttpClient = new OkHttpClient()
                .newBuilder()
                .readTimeout(600, TimeUnit.SECONDS)
                .connectTimeout(600, TimeUnit.SECONDS)
                .build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.193.169:8095")
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .client(okHttpClient)
                .build();
        NotificationPollingService notificationService = retrofit.create(NotificationPollingService.class);
        subscribeOnNotifications(notificationService);

        setContentView(R.layout.activity_main);
        getSupportActionBar().setIcon(R.mipmap.logo);
        showDialogButton = findViewById(R.id.show_dialog_button);
        showDialogButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showNetworkDialog(R.string.driving_problem_solved);
            }
        });
        try
        {
            this.getSupportActionBar().hide();
        }
        catch (NullPointerException e){}
    }

    private void subscribeOnNotifications(final NotificationPollingService notificationService) {
        notificationService.getNotification()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<String>() {
                   @Override
                   public void onSubscribe(Disposable d) {
                   }

                   @Override
                   public void onNext(String s) {
                       showNetworkDialog(R.string.driving_problem_solved);
                   }

                   @Override
                   public void onError(Throwable e) {
                       e.printStackTrace();
                   }

                   @Override
                   public void onComplete() {
                      subscribeOnNotifications(notificationService);
                   }
               });
    }

    private void showNetworkDialog(int msgId) {
        new AlertDialog.Builder(this)
                .setTitle(R.string.dialog_title)
                .setMessage(msgId)
                .setPositiveButton(R.string.thanks, null)
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }
}
