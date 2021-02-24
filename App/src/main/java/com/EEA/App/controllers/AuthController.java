package com.EEA.App.controllers;

import com.EEA.App.models.ERole;
import com.EEA.App.models.Role;
import com.EEA.App.models.User;
import com.EEA.App.payload.request.LoginRequest;
import com.EEA.App.payload.request.SignupRequest;
import com.EEA.App.payload.response.JwtResponse;
import com.EEA.App.payload.response.MessageResponse;
import com.EEA.App.repository.RoleRepository;
import com.EEA.App.repository.UserRepository;
import com.EEA.App.security.jwt.JwtUtils;
import com.EEA.App.security.securityServices.UserDetailsImplementation;
import com.EEA.App.service.FileService;
import com.EEA.App.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    FileService fileService;

    @Autowired
    UserService userService;

    //authenticates the user
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImplementation userDetails = (UserDetailsImplementation)
                authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getName(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles, userDetails.getImageUrl(), userDetails.getAddress(), userDetails.getContactNumber()));
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
//        SignupRequest userJson = userService.user2json(user);

        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        try {
//            File newFile=fileService.store(file);
            System.out.println(signupRequest.toString());

            // Create new user's account
            User newUser = new User(signupRequest.getName(), signupRequest.getUsername(),
                    signupRequest.getEmail(),
                    encoder.encode(signupRequest.getPassword()), signupRequest.getPhotoURL(), signupRequest.getContactNumber(), signupRequest.getAddress());

            String role = signupRequest.getRole();
//            Set<Role> roles =userJson.getRole();
            Set<Role> newRoles = new HashSet<>();
            if (role == null) {
                System.out.println(role);
                Role userRole = roleRepository.findByType(ERole.ROLE_LESSEE)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                newRoles.add(userRole);
            } else {

                switch (role) {
                    case "ROLE_ADMIN":
                        Role adminRole = roleRepository.findByType(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        newRoles.add(adminRole);

                        break;
                    case "ROLE_LESSOR":
                        Role modRole = roleRepository.findByType(ERole.ROLE_LESSOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        newRoles.add(modRole);

                        break;
                    case "ROLE_LESSEE":
                    default:
                        System.out.println(role);
                        Role userRole = roleRepository.findByType(ERole.ROLE_LESSEE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        newRoles.add(userRole);
                }
            }

            newUser.setRoles(newRoles);
            userRepository.save(newUser);

            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            String message = e.getMessage();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }
}
