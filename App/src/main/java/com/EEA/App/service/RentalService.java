/**
 * @Date: 03-01-2021
 * @Description: Describes the Service class for Rental
 *               'Rental': An order added for a specific
 *               item of lessor by a lessee
 **/
package com.EEA.App.service;

import com.EEA.App.models.EStatus;
import com.EEA.App.models.Item;
import com.EEA.App.models.Rental;
import com.EEA.App.repository.ItemRepository;
import com.EEA.App.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class RentalService {
    @Autowired
    private RentalRepository rentalRepository;
    @Autowired
    private ItemRepository itemRepository;
    //check the availability of the item
    public Item checkItemAvailability(Long itemId, Date startDate, Date endDate) {
        System.out.println(startDate);
        List<Rental> rentals = rentalRepository.findByItemId(itemId);
        //get the item
        Item item = itemRepository.getOne(itemId);
        //convert the util date type to localDate format
        LocalDate start= Instant.ofEpochMilli(startDate.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate end=Instant.ofEpochMilli(endDate.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();

        //get the dates between the date range
        long numOfDaysBetween = ChronoUnit.DAYS.between(start, end);
        List<LocalDate> requestedDateList = IntStream.iterate(0, i -> i + 1).limit(numOfDaysBetween)
                .mapToObj(i -> start.plusDays(i))
                .collect(Collectors.toList());

        //iterate through the requested dates and check if any of the dates exist in each rental
        rentals.forEach(rental -> {
            Boolean isExist = requestedDateList.stream().anyMatch(date -> {
                //convert the dates to LocalDates
//                LocalDate startRental = Instant.ofEpochMilli(startDate.getTime()).atZone(ZoneId.systemDefault())
//                        .toLocalDate();
//                LocalDate endRental = Instant.ofEpochMilli(endDate.getTime()).atZone(ZoneId.systemDefault())
//                        .toLocalDate();
                System.out.println(rental.getRentalDate());
                System.out.println(rental.getReturnDate());

                //check if the requested date exists in the rental date range of the specific rental
                Boolean isDateExist = (!date.isBefore(rental.getRentalDate())) && (date.isBefore(rental.getReturnDate()));
                System.out.println(isDateExist);

                return isDateExist;
            });

            //if available then reduce the quantity of the item and return
            if (isExist == true) {
                Integer q = item.getQuantity();
                Integer quantity = item.getQuantity() - 1;
                item.setQuantity(quantity);
            }
        });
        System.out.println(item.getItemName());
        return item;
    }
    //get all the orders of the specified user (Role=Lessor)
    public List<Rental> getMyOrders(Long userId) {

        List<Rental> myOrders= new ArrayList<Rental>();
        //get all rentals
        List<Rental> rentals = new ArrayList<Rental>();
        rentalRepository.findAll().forEach(rentals::add);
        //get all items of user
        List<Item> itemsOfUser = new ArrayList<Item>();
        itemRepository.findByUserId(userId).forEach(itemsOfUser::add);

        //if rental item is item add to orders of user
        rentals.forEach(rental-> {
        itemsOfUser.forEach(item -> {
           if(rental.getItem().equals(item)){
               rental.getUser().setPassword(null);
               rental.getUser().setRoles(null);
               myOrders.add(rental);
           }
        });
    });

    return myOrders;
    }

    //get all the orders of the specified user (Role=Lessor)
    public List<Rental> getMyOrdersByStatus(Long userId, EStatus status) {

        List<Rental> myOrdersByStatus= new ArrayList<Rental>();
        //get all rentals
        List<Rental> allRentals = new ArrayList<Rental>();
        rentalRepository.findAll().forEach(allRentals::add);
        //get all items of user
        List<Item> itemsOfUser = new ArrayList<Item>();
        itemRepository.findByUserId(userId).forEach(itemsOfUser::add);

        //if rental item is item add to orders of user
        allRentals.forEach(rental-> {
            itemsOfUser.forEach(item -> {
                if(rental.getItem().equals(item) && rental.getStatus().equals(status)){
                    rental.getUser().setPassword(null);
                    rental.getUser().setRoles(null);
                    myOrdersByStatus.add(rental);
                }
            });
        });

        return myOrdersByStatus;
    }
}
