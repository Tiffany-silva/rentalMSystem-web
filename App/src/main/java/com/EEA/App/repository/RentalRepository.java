package com.EEA.App.repository;

import com.EEA.App.models.EStatus;
import com.EEA.App.models.Rental;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    Page<Rental> findByItemId(Long itemId, Pageable pageable);
    List<Rental> findByItemId(Long itemId);

    Optional<Rental> findByIdAndItemIdAndUserId(Long id, Long itemId, Long userId);
    Optional<Rental> findByUserIdAndItemId(Long itemId, Long userId);
    Page<Rental> findByUserIdAndStatus(Long userId, EStatus status, Pageable pageable);

    Page<Rental> findByStatus(EStatus status, Pageable pageable);

    Page<Rental> findByUserId(Long userId, Pageable pageable);

    @Modifying
    @Query("update Rental rental set rental.status = :status where rental.id = :id")
    int setStatusForRental(@Param("status") EStatus status, @Param("id") Long id);
}
