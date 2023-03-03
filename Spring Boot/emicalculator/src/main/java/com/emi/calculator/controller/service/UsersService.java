package com.emi.calculator.controller.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emi.calculator.controller.entity.Users;
import com.emi.calculator.controller.repo.UsersRepo;
import com.emi.calculator.crypto.Hash;

@Service
public class UsersService {
	
	@Autowired
	UsersRepo repo;
	
	Hash h=new Hash();

	public Users save(Users u) {
		if(userAlreadyExist(u.getEmail()))return null;
		u.setPassword(h.encrypt(u.getPassword()));
		return repo.save(u);
	}
	
	public Users editPassword(String email,String password) {
		Users u=findUser(email);
		u.setPassword(h.encrypt(password));
		return edit(u);
	}
	
	public Users edit(Users u) {
		return repo.save(u);
	}
	
	public Users findUser(String email) {
		
		 Optional<Users> user = repo.findById(email);
		 return user.isPresent()?user.get():null;
	}
	
	public boolean userAlreadyExist(String email) {
		return findUser(email)!=null;
	}
	
	public boolean validCredentials(String email,String password) {
		password=h.encrypt(password);
		Optional<Users> user = repo.findByEmailAndPassword(email,password);
		 return user.isPresent();
	}
	
	

}
