package com.EEA.App.repository;

import com.EEA.App.models.EStatus;
import com.EEA.App.models.Rental;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    List<Rental> findByItemId(Long itemId);

    Optional<Rental> findByIdAndItemIdAndUserId(Long id, Long itemId, Long userId);
    Optional<Rental> findByUserIdAndItemId(Long itemId, Long userId);

    @EntityGraph("rental-user-item-graph")
    List<Rental> findByUserIdAndStatus(Long userId, EStatus status);

    List<Rental> findByStatus(EStatus status);

    @EntityGraph("rental-user-item-graph")
    List<Rental> findByUserId(Long userId);

    @Modifying
    @Query("update Rental rental set rental.status = :status where rental.id = :id")
    int setStatusForRental(@Param("status") EStatus status, @Param("id") Long id);
}
