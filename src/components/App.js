import React from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorField from './CalculatorField';

class App extends React.Component {
    
    state = {
        inputState: 'waiting',
        currentInput: 0,
        equation: '',
        lastInput: 0,
        isSemi: false,
        semiColumnNo: 0
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
        if(buttonName === ',') {
            this.setSemiFlag();
        }

        if(buttonName in ['1','2','3','4','5','6','7','8','9','0']) {
            this.addNumberToInput(buttonName);
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
                    });
                }
                break;
            case 'inProgress':
                if(buttonName === '=') {
                    this.equalPress();
                }

                if(['x','/','-','+'].includes(buttonName)) {
                    this.inProgressEquationPress();
                }
            default: return;
        }
    }

    addNumberToInput = numberString => {
        let numberToAdd = Number.parseInt(numberString);
        if(this.state.isSemi) {
            numberToAdd = this.state.currentInput + numberToAdd / (Math.pow(10,this.state.semiColumnNo));
        } else {
            numberToAdd = this.state.currentInput * 10 + numberToAdd;
        }
        if(this.state.isSemi) {
            this.setState({
                currentInput: numberToAdd,
                semiColumnNo: this.state.semiColumnNo + 1
            });
        } else {
            this.setState({
                currentInput: numberToAdd
            });
        }
        return;
    }

    equalPress = () => {
        let upcomingResult = 0;
        switch(this.state.equation) {
            case '+':
                upcomingResult = this.state.lastInput + this.state.currentInput;
                break;

            case '-':
                upcomingResult = this.state.lastInput - this.state.currentInput;
                break;

            case 'x':
                upcomingResult = this.state.lastInput * this.state.currentInput;
                break;

            case '/':
                upcomingResult = this.state.lastInput / this.state.currentInput;
                break;
        };
        
        this.setState({
            inputState: 'waiting',
            currentInput: upcomingResult,
            equation: '',
            lastInput: 0
        });
        return;
    }

    inProgressEquationPress = () => {
        let upcomingLastInput = 0;

        switch(this.state.equation) {
            case '+':
                upcomingLastInput = this.state.lastInput + this.state.currentInput;
                break;

            case '-':
                upcomingLastInput = this.state.lastInput - this.state.currentInput;
                break;

            case 'x':
                upcomingLastInput = this.state.lastInput * this.state.currentInput;
                break;

            case '/':
                upcomingLastInput = this.state.lastInput / this.state.currentInput;
                break;
        }

        this.setState({
            currentInput: 0,
            lastInput: upcomingLastInput
        })
        return;
    }

    setSemiFlag = () => {
        if(this.state.isSemi) {
            return;
        } else {
            this.setState({
                isSemi: true,
                semiColumnNo: 1
            });
        }
        return;
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