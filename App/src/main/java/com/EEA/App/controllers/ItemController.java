package com.EEA.App.controllers;

import com.EEA.App.exceptions.ResourceNotFoundException;
import com.EEA.App.models.Category;
import com.EEA.App.models.Item;
import com.EEA.App.models.User;
import com.EEA.App.repository.CategoryRepository;
import com.EEA.App.repository.ItemRepository;
import com.EEA.App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ItemController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/categories/{categoryId}/items")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public Page<Item> getAllItemsByCategory(@PathVariable (value = "categoryId") Long categoryId,
                                            Pageable pageable) {
        return itemRepository.findByCategoryId(categoryId, pageable);
    }

    @GetMapping("/users/{userId}/items")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN')")
    public Page<Item> getAllItemsByUserId(@PathVariable (value = "userId") Long userId,
                                            Pageable pageable) {
        return itemRepository.findByUserId(userId, pageable);
    }

    @GetMapping("/items/{itemName}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public Page<Item> getAllByItemName(@PathVariable (value = "itemName") String itemName,
                                          Pageable pageable) {
        return itemRepository.findByItemName(itemName, pageable);
    }

    @PostMapping("users/{userId}/categories/{categoryId}/items")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN')")
    public Item createItem(@PathVariable (value = "categoryId") Long categoryId,
                           @PathVariable (value = "userId") Long userId,
                                 @Valid @RequestBody Item item) {
        User user= userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("UserId " + userId + " not found"));
        Category category= categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("CategoryId " + categoryId + " not found"));
        item.setCategory(category);
        item.setUser(user);
        return itemRepository.save(item);
    }

    @PutMapping("/categories/{categoryId}/items/{itemId}/updateQuantity")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN')")
    public Item updateItemQuantity(@PathVariable(value = "categoryId") Long categoryId,
                                 @PathVariable (value = "itemId") Long itemId,
                                 @Valid @RequestBody Item itemRequest) {
        if(!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("CategoryId " + categoryId + " not found");
        }

        return itemRepository.findById(itemId).map(item -> {
            item.setQuantity(itemRequest.getQuantity());
            return itemRepository.save(item);
        }).orElseThrow(() -> new ResourceNotFoundException("ItemId " + itemId + "not found"));
    }

    @PutMapping("/categories/{categoryId}/items/{itemId}/updatePrice")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN')")
    public Item updateItemPrice(@PathVariable(value = "categoryId") Long categoryId,
                           @PathVariable (value = "itemId") Long itemId,
                           @Valid @RequestBody Item itemRequest) {
        if(!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("CategoryId " + categoryId + " not found");
        }

        return itemRepository.findById(itemId).map(item -> {
            item.setPrice(itemRequest.getPrice());
            return itemRepository.save(item);
        }).orElseThrow(() -> new ResourceNotFoundException("ItemId " + itemId + "not found"));
    }

    @DeleteMapping("/categories/{categoryId}/items/{itemId}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteItem(@PathVariable (value = "categoryId") Long categoryId,
                                           @PathVariable (value = "itemId") Long itemId) {
        return itemRepository.findByIdAndCategoryId(itemId, categoryId).map(item -> {
            itemRepository.delete(item);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Item not found with id " + itemId + " and categoryId " + categoryId));
    }
}
