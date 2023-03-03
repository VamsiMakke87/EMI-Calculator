package com.emi.calculator.controller.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Loans {

	@Id
	private long id;
	private String email;
	private String loanTitle;
	private String loanType;
	private double loanAmount;
	private double loanInterest;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLoanTitle() {
		return loanTitle;
	}

	public void setLoanTitle(String loanTitle) {
		this.loanTitle = loanTitle;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	public double getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(double loanAmount) {
		this.loanAmount = loanAmount;
	}

	public double getLoanInterest() {
		return loanInterest;
	}

	public void setLoanInterest(double loanInterest) {
		this.loanInterest = loanInterest;
	}

	@Override
	public String toString() {
		return "Loans [id=" + id + ", email=" + email + ", loanTitle=" + loanTitle + ", loanType=" + loanType
				+ ", loanAmount=" + loanAmount + ", loanInterest=" + loanInterest + "]";
	}

}
