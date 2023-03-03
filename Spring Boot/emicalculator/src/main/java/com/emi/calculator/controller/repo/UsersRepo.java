package com.emi.calculator.controller.repo;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.emi.calculator.controller.entity.Users;

public interface UsersRepo extends CrudRepository<Users, String> {

	public Users save(Users u);
	
	public Optional<Users> findById(String email);
	
	public Optional<Users> findByEmailAndPassword(String email,String password);
}
