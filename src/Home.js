import React, { Component } from 'react';
import Header from './Header';
import QualifyingCalculator from './QualifyingCalculator';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col offset-lg-2 col-lg-8">
              <QualifyingCalculator />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;