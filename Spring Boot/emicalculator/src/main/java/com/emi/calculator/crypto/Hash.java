package com.emi.calculator.crypto;

import java.util.Base64;

public class Hash {

	public String encrypt(String s) {

		return Base64.getEncoder().encodeToString(s.getBytes());
	}

	public String decrypt(String s) {

		byte[] actualByte = Base64.getDecoder().decode(s);

		return new String(actualByte);
	}
}
