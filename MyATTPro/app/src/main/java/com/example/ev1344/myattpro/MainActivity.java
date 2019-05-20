package com.example.ev1344.myattpro;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    Button showDialogButton;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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

    private void showNetworkDialog(int msgId) {
        new AlertDialog.Builder(this)
                .setTitle(R.string.dialog_title)
                .setMessage(msgId)
                .setPositiveButton(R.string.thanks, null)
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }
}
