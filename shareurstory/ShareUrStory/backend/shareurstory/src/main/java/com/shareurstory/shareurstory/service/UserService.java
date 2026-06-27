package com.shareurstory.shareurstory.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.shareurstory.shareurstory.model.User;
@Service
public class UserService {

    private List<User> users = new ArrayList<>();

    public String registerUser(User user) {

        users.add(user);

        return "User Registered: " + user.getName();
    }

    public List<User> getAllUsers() {

        return users;
    }
}