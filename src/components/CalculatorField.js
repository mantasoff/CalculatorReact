import React from 'react';
import "./CalculatorField.css";

class CalculatorField extends React.Component {
    render() {
        return (
            <div>
                <input className="calculator-field" value={this.props.value} onChange={(e) => this.props.onInputChange(e.target.value)} />
            </div>
        )
    }
}

export default CalculatorField;