package com.emi.calculator.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.emi.calculator.controller.entity.Loans;
import com.emi.calculator.controller.service.LoansService;

@CrossOrigin
@RestController
@RequestMapping("/loans")
public class LoansController {

	@Autowired
	LoansService loansService;

	@PostMapping("/save")
	public Loans saveLoan(@RequestBody Loans loan) {
		return loansService.saveLoan(loan);
	}

	@GetMapping("/getloans")
	public List<Loans> getAllLoans(@RequestParam String email) {
		return loansService.getAllLoans(email);
	}

	@GetMapping("/validtitle")
	public boolean exsistingTitle(@RequestParam String email, @RequestParam String loanTitle) {
		return loansService.exisitingTitle(email, loanTitle);
	}

	@DeleteMapping("/delete")
	public void delete(@RequestParam long id) {
		loansService.delete(id);
	}

	@GetMapping("/calculateemi")
	public double[] calculateEmi(@RequestParam int months, @RequestParam double loanAmount,
			@RequestParam double loanInterest) {
		return loansService.calculateEmi(months, loanAmount, loanInterest);
	}

}
