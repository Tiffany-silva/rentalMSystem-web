package com.EEA.App.controllers;

import com.EEA.App.exceptions.ResourceNotFoundException;
import com.EEA.App.models.Category;
import com.EEA.App.models.Item;
import com.EEA.App.models.User;
import com.EEA.App.payload.request.ItemRequest;
import com.EEA.App.repository.CategoryRepository;
import com.EEA.App.repository.ItemRepository;
import com.EEA.App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
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
//    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public List<Item> getAllItemsByCategory(@PathVariable (value = "categoryId") Long categoryId) {
        return itemRepository.findByCategoryId(categoryId);
    }

    @GetMapping("users/{userId}/categories/{categoryId}/items")
//    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public List<Item> getAllItemsByCategoryAndUserId(@PathVariable (value = "categoryId") Long categoryId,@PathVariable(value="userId") Long userId) {
        return itemRepository.findByUserIdAndCategoryId(userId, categoryId);
    }

    @GetMapping("/users/{userId}/items")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN')")
    public List<Item> getAllItemsByUserId(@PathVariable (value = "userId") Long userId) {
        return itemRepository.findByUserId(userId);
    }

    @GetMapping("/items/itemName{itemName}")
    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public List<Item> getAllByItemName(@PathVariable (value = "itemName") String itemName) {
        return itemRepository.findByItemName(itemName);
    }

    @GetMapping("/items")
//    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public List<Item> getAllItems() {
         return itemRepository.findAll();
    }

    @GetMapping("/items/itemId/{itemId}")
//    @PreAuthorize("hasRole('ROLE_LESSOR') or hasRole('ROLE_ADMIN') or hasRole('ROLE_LESSEE')")
    public Item getItembyId(@PathVariable (value = "itemId") Long itemId) {
        return itemRepository.getOne(itemId);
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

    @PutMapping("/categories/{categoryId}/items/{itemId}/update")
    @PreAuthorize("hasRole('ROLE_LESSOR')")
    public Item updateItem(@PathVariable(value = "categoryId") Long categoryId,
                                   @PathVariable (value = "itemId") Long itemId,
                                   @Valid @RequestBody ItemRequest itemRequest) {
        if(!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("CategoryId " + categoryId + " not found");
        }

        return itemRepository.findById(itemId).map(item -> {
            item.setQuantity(itemRequest.getQuantity());
            item.setPrice(itemRequest.getPrice());
            item.setDescription(itemRequest.getDescription());
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
        Optional<Item> itemOp= itemRepository.findById(itemId);
        Item item=itemOp.get();
        itemRepository.delete(item);
            return ResponseEntity.ok().build();
    }
}
