import React from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorField from './CalculatorField';

class App extends React.Component {
    
    state = {
        inputState: 'waiting',
        currentInput: 0,
        equation: '',
        lastInput: 0
    }

    onInputChange = newInput => {
        this.setState({
            currentInput: newInput
        })
    }

    renderCalculator = () => {
        return (
            <div>
                <CalculatorField value={this.state.currentInput} onInputChange={this.onInputChange}/>
                <CalculatorButton name="7" onButtonClick={this.onButtonClick} />
                <CalculatorButton name="8" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="9" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="/" onButtonClick={this.onButtonClick}  />
                <br />
                <CalculatorButton name="4" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="5" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="6" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="x" onButtonClick={this.onButtonClick}  />
                <br />
                <CalculatorButton name="1" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="2" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="3" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="-" onButtonClick={this.onButtonClick}  />
                <br />
                <CalculatorButton name="0" onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="," onButtonClick={this.onButtonClick}  />
                <CalculatorButton name="+" onButtonClick={this.onButtonClick} />
                <CalculatorButton name="=" onButtonClick={this.onButtonClick}  /> 
                
            </div>
        );
    }

    onButtonClick = buttonName => {
        if(buttonName in ['1','2','3','4','5','6','7','8','9','0']) {
            this.setState({
                currentInput: this.state.currentInput * 10 + Number.parseInt(buttonName)
            },() => console.log(this.state));
            return;
        }    
        switch(this.state.inputState) {
            case 'waiting':
                if(['x','/','-','+'].includes(buttonName)) {
                    this.setState({
                        inputState: 'inProgress',
                        equation: buttonName,
                        lastInput: this.state.currentInput,
                        currentInput: 0
                    },() => console.log(this.state))
                }
                break;
            case 'inProgress':
                if(buttonName === '=') {
                    switch(this.state.equation) {
                        case '+':
                            this.setState({
                                inputState: 'waiting',
                                currentInput: this.state.lastInput + this.state.currentInput,
                                equation: '',
                                lastInput: 0
                            })
                            break;
                        case '-':
                            this.setState({
                                inputState: 'waiting',
                                currentInput: this.state.lastInput - this.state.currentInput,
                                equation: '',
                                lastInput: 0
                            })
                            break;
                        case 'x':
                            this.setState({
                                inputState: 'waiting',
                                currentInput: this.state.lastInput * this.state.currentInput,
                                equation: '',
                                lastInput: 0
                            })
                            break;
                        case '/':
                            this.setState({
                                inputState: 'waiting',
                                currentInput: this.state.lastInput / this.state.currentInput,
                                equation: '',
                                lastInput: 0
                            })
                            break;
                    }
                }
                if(['x','/','-','+'].includes(buttonName)) {
                    switch(this.state.equation) {
                        case '+':
                            this.setState({
                                currentInput: 0,
                                lastInput: this.state.lastInput + this.state.currentInput
                            })
                            break;
                        case '-':
                            this.setState({
                                currentInput: 0,
                                lastInput: this.state.lastInput - this.state.currentInput
                            })
                            break;
                        case 'x':
                            this.setState({
                                currentInput: 0,
                                lastInput: this.state.lastInput * this.state.currentInput
                            })
                            break;
                        case '/':
                            this.setState({
                                currentInput: 0,
                                lastInput: this.state.lastInput / this.state.currentInput
                            })
                            break;
                    }
                }
            default: return;
        }
    }

    render() {
        return(
            <div>
                {this.renderCalculator()}
            </div>
        )
        
    }
}

export default App;