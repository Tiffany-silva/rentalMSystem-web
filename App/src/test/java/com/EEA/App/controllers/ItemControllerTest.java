package com.EEA.App.controllers;

import com.EEA.App.models.Item;
import com.EEA.App.repository.ItemRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class ItemControllerTest {
    @InjectMocks
    private ItemController itemController;

    @Mock
    private ItemRepository itemRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getAllItems() {
        List<Item> i = new ArrayList<Item>();
        when(itemRepository.findAll()).thenReturn(i);

        List<Item> item = itemController.getAllItems();

        verify(itemRepository).findAll();

        assertThat(item, is(i));
    }
    @Test
    public void getAllItemsByCategory() {
        List<Item> i = new ArrayList<Item>();
        when(itemRepository.findByCategoryId(1L)).thenReturn(i);

        List<Item> item = itemController.getAllItemsByCategory(1L);

        verify(itemRepository).findByCategoryId(1L);

        assertThat(item, is(i));
    }

    @Test
    public void getAllItemsByUserId() {
        List<Item> i = new ArrayList<Item>();
        when(itemRepository.findByUserId(1L)).thenReturn(i);

        List<Item> item = itemController.getAllItemsByUserId(1L);

        verify(itemRepository).findByUserId(1L);

        assertThat(item, is(i));
    }



}
