package com.EEA.App.repository;

import com.EEA.App.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String name);
    Boolean existsByUsername(String name);

    Boolean existsByEmail(String email);
}
