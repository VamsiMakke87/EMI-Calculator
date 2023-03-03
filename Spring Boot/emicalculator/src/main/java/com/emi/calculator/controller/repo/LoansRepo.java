package com.emi.calculator.controller.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.emi.calculator.controller.entity.Loans;

public interface LoansRepo extends CrudRepository<Loans, Long> {
	
	public Loans save(Loans loan);
	
	public List<Loans> findByEmail(String email);
	
	public void deleteById(long id);
	
	public Optional<Loans> findByEmailAndLoanTitle(String email,String loanTitle);

}
