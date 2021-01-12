package com.EEA.App.repository;

import com.EEA.App.models.ERole;
import com.EEA.App.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByType(ERole type);
}
