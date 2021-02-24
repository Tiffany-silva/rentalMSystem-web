package com.EEA.App.models;

import java.util.Date;

public class RequestedDate {


    private Date rentalDate;

    private Date returnDate;

    public RequestedDate() {
    }

    public RequestedDate(Date rentalDate, Date returnDate) {
        this.rentalDate = rentalDate;
        this.returnDate = returnDate;
    }

    public Date getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(Date rentalDate) {
        this.rentalDate = rentalDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }
}
