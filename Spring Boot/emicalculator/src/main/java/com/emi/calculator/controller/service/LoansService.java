package com.emi.calculator.controller.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emi.calculator.controller.entity.Loans;
import com.emi.calculator.controller.repo.LoansRepo;

@Service
public class LoansService {

	@Autowired
	LoansRepo loansRepo;

	public Loans saveLoan(Loans loan) {
		return loansRepo.save(loan);
	}

	public List<Loans> getAllLoans(String email) {
		return loansRepo.findByEmail(email);
	}

	public void delete(long id) {
		loansRepo.deleteById(id);
	}

	public boolean exisitingTitle(String email, String loanTitle) {
		Optional<Loans> loan = loansRepo.findByEmailAndLoanTitle(email, loanTitle);
		return loan.isPresent();
	}

	public double[] calculateEmi(int months, double loanAmount, double loanInterest) {

		loanInterest = loanInterest / 12 / 100;
		double x = Math.pow(1 + loanInterest, months);
		double emi = (loanAmount * loanInterest * x) / (x - 1);

		emi = Math.round(emi * 100) / 100.0;
		double total=Math.round(emi *months* 100) / 100.0;

		return new double[] { emi, total};
	}

}
