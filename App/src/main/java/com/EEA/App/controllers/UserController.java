package com.EEA.App.controllers;

import com.EEA.App.exceptions.ResourceNotFoundException;
import com.EEA.App.models.User;
import com.EEA.App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/userId/{userId}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public User getUserbyId(@PathVariable (value = "userId") Long userId) {
        return userRepository.getOne(userId);
    }

    @PutMapping("/users/{userId}/updateName")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public User updateName(@PathVariable Long userId, @Valid @RequestBody User userRequest) {
        return userRepository.findById(userId).map(user -> {
            user.setName(userRequest.getName());
            return userRepository.save(user);
        }).orElseThrow(() -> new ResourceNotFoundException("UserId " + userId + " not found"));
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        return userRepository.findById(userId).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("UserId " + userId + " not found"));
    }
}
