import React, { FC, useState } from "react";
import { termDepositCalculator } from "../lib/calculator";

type InterestPaid = "monthly" | "quarterly" | "annually" | "at maturity";

export interface FormData {
  deposit: number;
  interestRate: number;
  investmentTerm: number;
  interestPaid: InterestPaid;
}
const initalFormState: FormData = {
  deposit: 10000,
  interestRate: 0,
  investmentTerm: 0,
  interestPaid: "monthly",
};

export const CalculatorForm: FC = () => {
  const [formData, setFormData] = useState<FormData>(initalFormState);
  const [finalBalance, setFinalBalance] = useState<number>();
  const [inputChanged, setInputChanged] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputChanged(true);
    setError(false);
    setFormData({
      ...formData,
      [name]:
        name === "deposit" ||
        name === "interestRate" ||
        name === "investmentTerm" ||
        name === "at maturity"
          ? parseFloat(value)
          : (value as InterestPaid),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputChanged(false);
    if (formData.interestRate === 0 || formData.investmentTerm === 0) {
      setError(true);
      return;
    } else {
      let tempFinalBalance = termDepositCalculator(formData);
      tempFinalBalance && setFinalBalance(tempFinalBalance);
    }
  };
  const handleClear = (e: React.FormEvent) => {
    e.preventDefault();
    setInputChanged(false);
    setFormData(initalFormState);
  };

  return (
    <>
      {error && (
        <div id="error" className="warning">
          Please, Interest Rate and Investiment Term values need to be different
          from 0 (zero).
        </div>
      )}
      {inputChanged && (
        <div id="inputChanged" className="warning">
          Please, click on "Calculate" to updated result.
        </div>
      )}
      <form onSubmit={handleSubmit} onReset={handleClear}>
        <div>
          <label htmlFor="deposit">Start deposit amount: $</label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            title="Start deposit amount"
            value={formData.deposit}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="interestRate">Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            title="Interest Rate (%)"
            value={formData.interestRate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="investmentTerm">Investment Term (years):</label>
          <input
            type="number"
            id="investmentTerm"
            name="investmentTerm"
            title="Investment Term (years)"
            value={formData.investmentTerm}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="interestPaid">Interest Paid:</label>
          <select
            id="interestPaid"
            name="interestPaid"
            title="Interest Paid"
            value={formData.interestPaid}
            onChange={handleChange}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
            <option value="at maturity">At Maturity</option>
          </select>
        </div>
        <div className="buttons">
          <button
            className="button button-submit"
            type="submit"
            style={{ backgroundColor: "green" }}
          >
            Calculate
          </button>
          <button
            className="button button-reset"
            type="reset"
            style={{ backgroundColor: "orange" }}
          >
            Clear
          </button>
        </div>
      </form>

      {finalBalance && !error && (
        <h2 className="finalBalance">
          Final Balance of{" "}
          <span className="result">
            ${finalBalance.toLocaleString("en-AU")}
          </span>
        </h2>
      )}
    </>
  );
};
