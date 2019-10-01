import React from 'react';
import './CalculatorButton.css';

class CalculatorButton extends React.Component {
    render() {
        return ( 
            <button onClick={() => this.props.onButtonClick(this.props.name)} className="calculator-button">{this.props.name}</button>               
        )
    }
}

export default CalculatorButton;