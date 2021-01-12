package com.EEA.App.repository;


import com.EEA.App.models.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByCategoryId(Long categoryId, Pageable pageable);
    Optional<Item> findByIdAndCategoryId(Long id, Long categoryId);
    Page<Item> findByUserId(Long userId, Pageable pageable);

//    Item getOne(Long itemId);
    Page<Item> findByItemName(String itemName, Pageable pageable);

    @Modifying
    @Query("update Item item set item.quantity = :quantity where item.id = :id")
    int setQuantityForItem(@Param("quantity") Integer quantity, @Param("id") Long id);
}
