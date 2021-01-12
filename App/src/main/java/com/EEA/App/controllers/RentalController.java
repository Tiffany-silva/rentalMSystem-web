package com.EEA.App.controllers;

import com.EEA.App.exceptions.ResourceNotFoundException;
import com.EEA.App.models.*;
import com.EEA.App.repository.ItemRepository;
import com.EEA.App.repository.RentalRepository;
import com.EEA.App.repository.UserRepository;
import com.EEA.App.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
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

    @GetMapping("/items/{itemId}/rentals")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN')")
    public Page<Rental> getAllRentalsByItemId(@PathVariable(value = "itemId") Long itemId,
                                             Pageable pageable) {
        return rentalRepository.findByItemId(itemId, pageable);
    }

    @GetMapping("/users/{userId}/rentals")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public Page<Rental> getAllRentalsByUserId(@PathVariable(value = "userId") Long userId,
                                              Pageable pageable) {
        return rentalRepository.findByUserId(userId, pageable);
    }

    @GetMapping("/users/{userId}/rentals/{status}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")

    public Page<Rental> getAllRentalsByUserIdAndStatus(@PathVariable(value = "userId") Long userId,
                                                  @PathVariable(value = "status") String status,Pageable pageable) {
        EStatus eStatus=EStatus.valueOf(status);
        return rentalRepository.findByUserIdAndStatus(userId,eStatus,pageable);
    }

    @GetMapping("/rentals/findByStatus/{status}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public Page<Rental> getAllRentalsByStatus(@PathVariable(value = "status") String status,
                                              Pageable pageable) {
        EStatus eStatus=EStatus.valueOf(status);
        return rentalRepository.findByStatus(eStatus, pageable);
    }

    @GetMapping("/rentals/{rentalId}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public Optional<Rental> getRentalById(@PathVariable(value = "rentalId") Long rentalId) {
        return rentalRepository.findById(rentalId);
    }

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

    @PostMapping("/items/{itemId}/rentals/{userId}")
    @PreAuthorize("hasRole('ROLE_LESSEE')")
    public Rental createRental(@PathVariable (value = "itemId") Long itemId,
                               @PathVariable (value = "userId") Long userId,
                                 @Valid @RequestBody Rental rental) {
       Item item= itemRepository.findById(itemId).orElseThrow(() -> new ResourceNotFoundException("itemId " + itemId + " not found"));

       User user= userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("userId " + userId + " not found"));

       rental.setItem(item);
       rental.setUser(user);
       return rentalRepository.save(rental);
    }

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

    @PutMapping("/users/{userId}/rentals/{rentalId}/updateStatus")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public Rental updateRentalStatus(@PathVariable (value = "userId") Long userId,
                                         @PathVariable (value = "rentalId") Long rentalId,
                                         @Valid @RequestBody Rental rentalRequest) {
        if(!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("userId " + userId + " not found");
        }

        return rentalRepository.findById(rentalId).map(rental -> {
            rental.setStatus(rentalRequest.getStatus());
            return rentalRepository.save(rental);
        }).orElseThrow(() -> new ResourceNotFoundException("rentalId " + rentalId + "not found"));
    }


    @PostMapping("/items/checkAvailability/{itemId}")
    @PreAuthorize("hasRole('ROLE_LESSEE')")
    public Optional<Item> checkItemAvailability(@PathVariable (value = "itemId") Long itemId,
                               @Valid @RequestBody RequestedDate requestedDate) {

        return rentalService.checkItemAvailability(itemId,requestedDate.getRentalDate(), requestedDate.getReturnDate());
    }

    @DeleteMapping("/rentals/{rentalId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteRental(@PathVariable (value = "rentalId") Long rentalId) {
        return rentalRepository.findById(rentalId).map(rental -> {
            rentalRepository.delete(rental);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Rental not found with id " + rentalId + " and rentalId " + rentalId));
    }
}
