package com.EEA.App.controllers;

import com.EEA.App.repository.RentalRepository;
import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class RentalControllerTest {
    @InjectMocks
    private RentalController rentalController;

    @Mock
    private RentalRepository rentalRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

}
