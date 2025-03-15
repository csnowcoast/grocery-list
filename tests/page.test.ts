import {describe, expect, test} from "@jest/globals";
import { validateText, validatePrice} from "../src/app/utils";

describe('text validation - invalid', () => {
  test('clears text if longer than 50 characters', () => {
    const longString = "a".repeat(51);
    expect(validateText(longString)).toBe("");
  });
});

describe('text validation - valid', () => {
    test('clears text if longer than 50 characters', () => {
      const longString = "a".repeat(49);
      expect(validateText(longString)).toBe("a".repeat(49));
    });
});

describe('price validation - invalid', () => {
    test('sets price to 0 if invalid', () => {
      const notANumber = "not a price";
      expect(validatePrice(notANumber)).toBe(0);
    });
});

describe('price validation - valid', () => {
    test('sets price to 0 if invalid', () => {
      const number = "45.20";
      expect(validatePrice(number)).toBe(45.20);
    });
});