import { FormData } from "../components/CalculatorForm";
export function termDepositCalculator({
  deposit,
  interestRate,
  investmentTerm,
  interestPaid,
}: FormData): number {
  const decimalInterestRate = interestRate / 100;
  let finalBalance: number;
  let compoundInterest: number;

  if (interestPaid === "at maturity") {
    finalBalance = deposit * (1 + decimalInterestRate * investmentTerm);
    return finalBalance;
  } else {
    switch (interestPaid) {
      case "monthly":
        compoundInterest = 12;
        break;
      case "quarterly":
        compoundInterest = 4;
        break;
      case "annually":
        compoundInterest = 1;
        break;
    }
    finalBalance =
      deposit *
      Math.pow(
        1 + decimalInterestRate / compoundInterest,
        compoundInterest * investmentTerm
      );

    return Math.round(finalBalance);
  }
}
