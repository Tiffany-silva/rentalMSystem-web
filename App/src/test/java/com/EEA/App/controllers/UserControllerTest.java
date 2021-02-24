package com.EEA.App.controllers;

import com.EEA.App.models.User;
import com.EEA.App.repository.UserRepository;
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

public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserRepository userRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetUserById() {
        List <User> u = new ArrayList<User>();
        when(userRepository.findAll()).thenReturn(u);

        List<User> user = userController.getAllUsers();

        verify(userRepository).findAll();

        assertThat(user, is(u));
    }

}
