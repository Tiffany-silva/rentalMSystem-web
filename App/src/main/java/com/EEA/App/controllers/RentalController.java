/**
 * @Date: 02-01-2021
 * @Description: Describes the controller for Rental
 *               'Rental': An order added for a specific
 *               item of lessor by a lessee
 **/
package com.EEA.App.controllers;

import com.EEA.App.exceptions.ResourceNotFoundException;
import com.EEA.App.models.*;
import com.EEA.App.payload.response.MessageResponse;
import com.EEA.App.repository.ItemRepository;
import com.EEA.App.repository.RentalRepository;
import com.EEA.App.repository.UserRepository;
import com.EEA.App.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RentalController {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RentalService rentalService;

    //gets all rentals of the item by id
    @GetMapping("/items/{itemId}/rentals")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN')")
    public List<Rental> getAllRentalsByItemId(@PathVariable(value = "itemId") Long itemId) {
        return rentalRepository.findByItemId(itemId);
    }
    //gets all rental of the user by id
    @GetMapping("/users/{userId}/rentals")
//    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public List<Rental> getAllRentalsByUserId(@PathVariable(value = "userId") Long userId) {
        return rentalRepository.findByUserId(userId);
    }
    //gets all rental orders of the user (Role=Lessor)
    @GetMapping("/users/{userId}/myorders")
    @PreAuthorize("hasRole('ROLE_LESSOR')")
    public List<Rental> getMyOrders(@PathVariable(value = "userId") Long userId) {
        return rentalService.getMyOrders(userId);
    }
    //get all rentals of the user by user id
    @GetMapping("/users/{userId}/rentals/{status}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")

    public List<Rental> getAllRentalsByUserIdAndStatus(@PathVariable(value = "userId") Long userId,
                                                  @PathVariable(value = "status") String status) {
        EStatus eStatus=EStatus.valueOf(status);
        return rentalRepository.findByUserIdAndStatus(userId,eStatus);
    }

    @GetMapping("/users/lessor/{userId}/rentals/{status}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")

    public List<Rental> getAllOrdersByUserIdAndStatus(@PathVariable(value = "userId") Long userId,
                                                       @PathVariable(value = "status") String status) {
        EStatus eStatus=EStatus.valueOf(status);
        return rentalService.getMyOrdersByStatus(userId,eStatus);
    }
     //get all rentals by the status
    @GetMapping("/rentals/findByStatus/{status}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Rental> getAllRentalsByStatus(@PathVariable(value = "status") String status) {
        EStatus eStatus=EStatus.valueOf(status);
        return rentalRepository.findByStatus(eStatus);
    }
    //get rental by the id
    @GetMapping("/rentals/{rentalId}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public Rental getRentalById(@PathVariable(value = "rentalId") Long rentalId) {
        return rentalRepository.getOne(rentalId);
    }

    //get all rentals
    @GetMapping("/rentals")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Rental>> getAllRentals() {
        try{
            List<Rental> rentals = new ArrayList<Rental>();
            rentalRepository.findAll().forEach(rentals::add);
            if (rentals.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(rentals, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //create a rental for an item
    @PostMapping("/items/{itemId}/rentals/{userId}")
    @PreAuthorize("hasRole('ROLE_LESSEE')")
    public ResponseEntity<MessageResponse> createRental(@PathVariable (value = "itemId") Long itemId,
                                                        @PathVariable (value = "userId") Long userId,
                                                        @Valid @RequestBody Rental rental) {
       Item item= itemRepository.findById(itemId).orElseThrow(() ->
               new ResourceNotFoundException("itemId " + itemId + " not found"));

       User user= userRepository.findById(userId).orElseThrow(() ->
               new ResourceNotFoundException("userId " + userId + " not found"));

       rental.setItem(item);
       rental.setUser(user);
       try{
            rentalRepository.save(rental);
           return ResponseEntity.ok(new MessageResponse("Rental added successfully!"));

        }catch (Exception e){
           return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
    //update the return date of the rental
    @PutMapping("/users/{userId}/rentals/{rentalId}/updateReturnDate")
    @PreAuthorize("hasRole('ROLE_LESSEE')")
    public Rental updateRentalReturnDate(@PathVariable (value = "userId") Long userId,
                                 @PathVariable (value = "rentalId") Long rentalId,
                                 @Valid @RequestBody Rental rentalRequest) {
        if(!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("userId " + userId + " not found");
        }

        return rentalRepository.findById(rentalId).map(rental -> {
            rental.setReturnDate(rentalRequest.getReturnDate());
            return rentalRepository.save(rental);
        }).orElseThrow(() -> new ResourceNotFoundException("rentalId " + rentalId + "not found"));
    }
    //update the status of the rental
    @PutMapping("/users/{userId}/rentals/{rentalId}/updateStatus/{status}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public ResponseEntity<MessageResponse> updateRentalStatus(@PathVariable (value = "userId") Long userId,
                                                              @PathVariable (value = "rentalId") Long rentalId,
                                                              @PathVariable (value = "status") String status) {
        if(!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("userId " + userId + " not found");
        }
        EStatus stat=EStatus.valueOf(status);
        return rentalRepository.findById(rentalId).map(rental -> {
            rental.setStatus(stat);
            rentalRepository.save(rental);
            return ResponseEntity.ok(new MessageResponse("Rental status updated successfully!"));
        }).orElseThrow(() -> new ResourceNotFoundException("rentalId " + rentalId + "not found"));
    }

    //check the availability of an item
    @PostMapping("items/checkAvailability/{itemId}")
//    @PreAuthorize("hasRole('ROLE_LESSEE')")
    public Item checkItemAvailability(@PathVariable (value = "itemId") Long itemId,
                               @Valid @RequestBody RequestedDate requestedDate) {
        System.out.println(requestedDate.getRentalDate());
        return rentalService.checkItemAvailability(itemId,requestedDate.getRentalDate(),
                requestedDate.getReturnDate());
    }

    @PostMapping("items/checkAvailabilityMob/{itemId}")
//    @PreAuthorize("hasRole('ROLE_LESSEE')")
    public String checkItemAvailabilityMob(@PathVariable (value = "itemId") Long itemId,
                                      @Valid @RequestBody RequestedDate requestedDate) {
        System.out.println(requestedDate.getRentalDate());
        Item item= rentalService.checkItemAvailability(itemId,requestedDate.getRentalDate(),
                requestedDate.getReturnDate());
        return item.getQuantity().toString();
    }
    //delete the specified item
    @DeleteMapping("/rentals/{rentalId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteRental(@PathVariable (value = "rentalId") Long rentalId) {
        return rentalRepository.findById(rentalId).map(rental -> {
            rentalRepository.delete(rental);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Rental not found with id " +
                rentalId + " and rentalId " + rentalId));
    }
}
