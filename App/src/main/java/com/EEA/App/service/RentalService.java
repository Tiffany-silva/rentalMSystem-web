package com.EEA.App.service;

import com.EEA.App.models.Item;
import com.EEA.App.models.Rental;
import com.EEA.App.repository.ItemRepository;
import com.EEA.App.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class RentalService {
    @Autowired
    private RentalRepository rentalRepository;
    @Autowired
    private ItemRepository itemRepository;

    public Optional<Item> checkItemAvailability(Long itemId, Date startDate, Date endDate) {

        List<Rental> rentals = rentalRepository.findByItemId(itemId);
        //get the item
        Optional<Item> item = itemRepository.findById(itemId);

        //convert the util date to localDate for processing
        LocalDate start = LocalDate.ofInstant(startDate.toInstant(), ZoneId.systemDefault());
        LocalDate end = LocalDate.ofInstant(endDate.toInstant(), ZoneId.systemDefault());

        //get the stream of dates between the given dates
        Stream<LocalDate> dates = start.datesUntil(end.plusDays(1));

        //convert to a list of localDates
        List<LocalDate> requestedDateList = dates.collect(Collectors.toList());

        //iterate through the requested dates and check if any of the dates exist in each rental
        rentals.forEach(rental -> {
            Boolean isExist = requestedDateList.stream().anyMatch(date -> {
                //convert the dates to LocalDates
                LocalDate startRental = LocalDate.ofInstant(rental.getRentalDate().toInstant(), ZoneId.systemDefault());
                LocalDate endRental = LocalDate.ofInstant(rental.getReturnDate().toInstant(), ZoneId.systemDefault());

                //check if the requested date exists in the rental date range of the specific rental
                Boolean isDateExist = (!date.isBefore(startRental)) && (date.isBefore(endRental));
                return isDateExist;
            });

            //if available then reduce the quantity of the item and return
            if (isExist == true) {
                Integer q = item.orElse(item.get()).getQuantity();
                Integer quantity = item.orElse(item.get()).getQuantity() - 1;
                item.get().setQuantity(quantity);
            }
        });

        return item;
    }
}
