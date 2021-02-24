package com.EEA.App.repository;


import com.EEA.App.models.Item;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCategoryId(Long categoryId);
    Optional<Item> findByIdAndCategoryId(Long id, Long categoryId);

    @EntityGraph(value = "item-user-category-graph", type = EntityGraph.EntityGraphType.LOAD)
    List<Item> findByUserId(Long userId);

//    Item getOne(Long itemId);
    List<Item> findByItemName(String itemName);

    @EntityGraph(value = "item-user-category-graph", type = EntityGraph.EntityGraphType.LOAD)
    List<Item> findByUserIdAndCategoryId(Long userId, Long CategoryId);

    @EntityGraph(value = "item-user-category-graph", type = EntityGraph.EntityGraphType.LOAD)
    List<Item> findAll();
    @Modifying
    @Query("update Item item set item.quantity = :quantity where item.id = :id")
    int setQuantityForItem(@Param("quantity") Integer quantity, @Param("id") Long id);
}
