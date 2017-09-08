import React, { Component } from 'react';

class QualifyingCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyGrossIncome: 5000,
      multipliedByDTI: 44.9,
      housingAndDebts: 2245,
      minCarLoans: 0,
      minStudentLoans: 250,
      minCreditCardPayments: 9,
      minPitiPlusMi: 1905,
      principleAndInterest: 1333.50,
      interestRate: 3.625,
      term: 30,
      loanAmountDividedBy: 0,
      loanAmount: 0,
      percentDown: 10,
      maximumPurchasePrice: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  render() {
    return (
      <form>
        {this.renderIncome()}
        <p>Minus</p>
        {this.renderDebts()}
        {this.renderPiti()}
        <p>Multiplied by<span>70%</span></p>
        <hr />
        {this.renderCalculations()}
      </form>
    );
  }

  handleChange(event) {
    var num = parseFloat(event.target.value);
    if(isNaN(num))
      num = "";
    this.stateSetters[event.target.id](num);
    if(!isNaN(num))
      this.calculatePurchasePrice();
  }

  handleFocus(event) {
    var number = dollarsToNumber(event.target.value);
    if(number === 0) {
      event.target.value = null;
    }
  }

  handleBlur(event) {
    var number = dollarsToNumber(event.target.value);
    this.stateSetters[event.target.id](number);
  }

  renderInput(config) {
    return (
      <div className="form-group row">
      <label
        className="col-6 col-form-label">
        {config.name}
      </label>
      <div className="col-6">
        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
          <input
            className="form-control"
            type="text"
            value={config.value}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            id={config.id}
            disabled={config.isDisabled}
          />
        </div>
      </div>
    </div>
    );
  }

  renderDollarInput(config) {
    return (
      <div className="form-group row">
      <label
        className="col-6 col-form-label">
        {config.name}
      </label>
      <div className="col-6">
        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
          <div className="input-group-addon">$</div>
          <input
            className="form-control"
            type="text"
            value={config.value}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            id={config.id}
            disabled={config.isDisabled}
          />
        </div>
      </div>
    </div>
    );
  }

  renderPercentInput(config) {
    return (
      <div className="form-group row">
      <label className="col-6 col-form-label">
        {config.name}
      </label>
      <div className="col-6">
        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
          <input className="form-control"
            type="text"
            value={config.value}
            onChange={this.handleChange}
            id={config.id}
            disabled={config.isDisabled}
          />
          <div className="input-group-addon">%</div>
        </div>
      </div>
    </div>
    );
  }

  renderIncome() {
    return (
      <div>
        {this.renderDollarInput({ 
          name: 'Monthly Gross Income', 
          value: this.state.monthlyGrossIncome,
          id: 'monthlyGrossIncome',
        })}
        {this.renderPercentInput({ 
          name: 'Multiplied by DTI', 
          value: this.state.multipliedByDTI,
          id: 'multipliedByDTI',
        })}
        <hr />
        {this.renderDollarInput({ 
          name: 'Housing & Debts', 
          value: this.state.housingAndDebts,
          id: 'housingAndDebts',
          isDisabled: true,
        })}
      </div>
    );
  }

  renderDebts() {
    return (
      <div>
        {this.renderDollarInput({
          name: 'Min Car Loans',
          value: this.state.minCarLoans,
          id: 'minCarLoans',
        })}
        {this.renderDollarInput({
          name: 'Min Student Loans',
          value: this.state.minStudentLoans,
          id: 'minStudentLoans',
        })}
        {this.renderDollarInput({
          name: 'Min Credit Card Payments',
          value: this.state.minCreditCardPayments,
          id: 'minCreditCardPayments',
        })}
      </div>
    );
  }

  renderPiti() {
    return (
      <div>
        <hr />
        {this.renderDollarInput({ 
          name: 'Max PITI + MI', 
          value: this.state.minPitiPlusMi,
          id: 'minPitiPlusMi',
          isDisabled: true,
        })}
      </div>
    );
  }

  renderCalculations() {
    return (
      <div>
        {this.renderDollarInput({ 
          name: 'Principle & Interest', 
          value: this.state.principleAndInterest,
          id: 'principleAndInterest',
          isDisabled: true,
        })}
        {this.renderPercentInput({
          name: 'Interest Rate', 
          value: this.state.interestRate,
          id: 'interestRate',
        })}
        {this.renderInput({
          name: 'Term (Years)', 
          value: this.state.term,
          id: 'term',
        })}
        {this.renderDollarInput({
          name: 'Loan Amount divided by', 
          value: this.state.loanAmountDividedBy,
          id: 'loanAmountDividedBy',
          isDisabled: true,
        })}
        {this.renderPercentInput({
          name: 'Percent Down',
          value: this.state.percentDown,
          id: 'percentDown',
        })}
        <hr />
        {this.renderDollarInput({
          name: 'Maximum Purchase Price',
          value: this.state.maximumPurchasePrice,
          id: 'maximumPurchasePrice',
          isDisabled: true,
        })}
      </div>
    );
  }

  calculatePurchasePrice() {
    this.calculateHousingAndDebts();
  }

  calculateHousingAndDebts() {
    if(this.state.monthlyGrossIncome === 0)
      return false;
    if(this.state.multipliedByDTI === 0)
      return false;
  
    var housingAndDebts = 
      this.state.monthlyGrossIncome 
      * (.01 * this.state.multipliedByDTI);
    
    this.setState({
      housingAndDebts: housingAndDebts
    }, () => {
      this.calculateMaxPitiMi();
    });
  }
  
  calculateMaxPitiMi() {
    var debt = 
      this.state.minCarLoans
      + this.state.minStudentLoans
      + this.state.minCreditCardPayments;
    var minPitiPlusMi = 
      this.state.housingAndDebts 
      - debt;
    minPitiPlusMi = round(minPitiPlusMi);
    this.setState({
      minPitiPlusMi: minPitiPlusMi
    }, () => {
      this.calculatePrincipleAndInterest(this);
    });
  }
  
  calculatePrincipleAndInterest() {
    var principleAndInterest = this.state.minPitiPlusMi * .7;
    principleAndInterest = round(principleAndInterest);
    this.setState({
      principleAndInterest: principleAndInterest
    }, () => {
      this.calculateMaxPurchasePrice(this);
    });
  }
  
  calculateMaxPurchasePrice() {
    var pv = this.calculatePresentValue(this);
    pv = round(pv);
    this.setState({
      loanAmountDividedBy: pv
    }, () => {
      var ltv = (100 - this.state.percentDown) * .01;
      var maximumPurchasePrice = pv / ltv;
      maximumPurchasePrice = round(maximumPurchasePrice);
      this.setState({
        maximumPurchasePrice: maximumPurchasePrice
      });
    });
  }
  
  calculatePresentValue() {
    var r = (this.state.interestRate * .01) / 12;
    var n = this.state.term * 12;
    var c = 1 - ((1 + r)**(n * -1));
    var pv = this.state.principleAndInterest * (c / r);
    
    return pv;
  }

  stateSetters = {
    monthlyGrossIncome: (val) => {
      this.setState({
        monthlyGrossIncome: val
      });
    },
    multipliedByDTI: (val) => {
      this.setState({
        multipliedByDTI: val
      });
    },
    housingAndDebts: (val) => {
      this.setState({
        housingAndDebts: val
      });
    },
    minCarLoans: (val) => {
      this.setState({
        minCarLoans: val
      });
    },
    minStudentLoans: (val) => {
      this.setState({
        minStudentLoans: val
      });
    },
    minPitiPlusMi: (val) => {
      this.setState({
        minPitiPlusMi: val
      });
    },
    minCreditCardPayments: (val) => {
      this.setState({
        minCreditCardPayments: val
      });
    },
    principleAndInterest: (val) => {
      this.setState({
        principleAndInterest: val
      });
    },
    interestRate: (val) => {
      this.setState({
        interestRate: val
      });
    },
    term: (val) => {
      this.setState({
        term: val
      });
    },
    loanAmountDividedBy: (val) => {
      this.setState({
        loanAmountDividedBy: val
      });
    },
    loanAmount: (val) => {
      this.setState({
        loanAmount: val
      });
    },
    percentDown: (val) => {
      this.setState({
        percentDown: val
      });
    },
    maximumPurchasePrice: (val) => {
      this.setState({
        maximumPurchasePrice: val
      });
    },
  }
}

export default QualifyingCalculator;

function dollarsToNumber(dollars) {
  dollars = dollars.replace(/[^\w.]+/g, '');
  var number = parseFloat(dollars);
  return number;
}

function round(num) {
  num = num.toFixed(2);
  num = parseFloat(num);
  return num;
}
