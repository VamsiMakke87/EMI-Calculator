package com.emi.calculator.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.emi.calculator.controller.entity.Users;
import com.emi.calculator.controller.service.UsersService;


@CrossOrigin
@RestController
public class UsersController {
	
	
	@Autowired
	UsersService service;
	
	@PostMapping("/save")
	public Users save(@RequestBody Users u) {
		if(userAlreadyExists(u.getEmail()))return new Users();
		return service.save(u);
		
	}

	@GetMapping("/exists")
	public boolean userAlreadyExists(@RequestParam String email) {
		return service.userAlreadyExist(email);
	}
	
	@PostMapping("/valid")
	public boolean validCredentials(@RequestBody Users u) {
		return service.validCredentials(u.getEmail(), u.getPassword());
	}
	
	@PostMapping("/forgotpassword")
	public Users forgotPassword(@RequestBody Users u) {
		return service.editPassword(u.getEmail(), u.getPassword());
	}
	
}
