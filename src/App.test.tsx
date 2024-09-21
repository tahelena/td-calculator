import "@testing-library/jest-dom";
import { termDepositCalculator } from "./lib/calculator";
import { FormData } from "./components/CalculatorForm";

describe("calculateFinalBalance", () => {
  let formData: FormData;
  it("should calculate the correct balance with interest paid at maturity", () => {
    formData = {
      deposit: 10000,
      interestRate: 1.1,
      investmentTerm: 3,
      interestPaid: "at maturity",
    };
    const result = termDepositCalculator(formData);

    expect(result).toBe(10330);
  });

  it("should calculate the correct balance with monthly compounding", () => {
    formData = {
      deposit: 10000,
      interestRate: 1.1,
      investmentTerm: 3,
      interestPaid: "monthly",
    };

    const result = termDepositCalculator(formData);

    expect(result).toBe(10335);
  });

  it("should calculate the correct balance with quarterly compounding", () => {
    formData = {
      deposit: 10000,
      interestRate: 1.1,
      investmentTerm: 3,
      interestPaid: "quarterly",
    };

    const result = termDepositCalculator(formData);

    expect(result).toBe(10335);
  });

  it("should calculate the correct balance with annually compounding", () => {
    formData = {
      deposit: 10000,
      interestRate: 1.1,
      investmentTerm: 3,
      interestPaid: "annually",
    };

    const result = termDepositCalculator(formData);

    expect(result).toBe(10334);
  });
});
