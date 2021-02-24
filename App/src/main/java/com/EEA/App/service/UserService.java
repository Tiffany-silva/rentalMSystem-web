package com.EEA.App.service;

import com.EEA.App.payload.request.SignupRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class UserService {
    public SignupRequest user2json(String user){
        SignupRequest user2json=new SignupRequest();
        try{
            ObjectMapper objectMapper=new ObjectMapper();
            user2json=objectMapper.readValue(user, SignupRequest.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return user2json;
    }
}
