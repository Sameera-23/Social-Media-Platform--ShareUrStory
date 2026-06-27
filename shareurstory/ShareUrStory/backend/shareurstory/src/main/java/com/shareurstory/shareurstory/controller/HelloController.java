package com.shareurstory.shareurstory.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shareurstory.shareurstory.model.User;
import com.shareurstory.shareurstory.service.UserService;

@CrossOrigin(origins = "*")
@RestController
public class HelloController {
private final UserService userService;

public HelloController(UserService userService) {
    this.userService = userService;
}

@GetMapping("/hello")
public String hello() {
    return "Welcome to ShareUrStory Backend 🚀";
}

@PostMapping("/register")
public String register(@RequestBody User user) {
    return userService.registerUser(user);
}

@GetMapping("/users")
public List<User> getUsers() {
    return userService.getAllUsers();
}
}