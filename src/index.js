import React from "react";
import ReactDOM from "react-dom";
import './styles.scss';

let memory = [];

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: 0,
            output: 0,
            memory: []
        }
        this.clear = this.clear.bind(this);
        this.input = this.input.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.compute = this.compute.bind(this);
    }

    clear() {
        memory = [];
        this.setState({
            input: 0,
            output: 0
        });
    }

    updateDisplay() {
        this.setState({
            input: memory.join("")
        });
    }

    input(i) {
        if (!isNaN(i) && memory.length !== 0 && !isNaN(memory[memory.length - 1])) {
            let j = memory.pop();
            memory.push("" + j + i);
        } else {
            memory.push(i);
        }
        this.updateDisplay();
    }

    compute() {
        for (let i = 0; i < memory.length; i++) {
            if(isNaN(memory[i])) {
                switch(memory[i]) {
                    case "+":
                        this.setState({
                            input: parseInt(memory[i - 1]) + parseInt(memory[i + 1])
                        });
                        break;
                    case "-":
                        this.setState({
                            input: parseInt(memory[i - 1]) - parseInt(memory[i + 1])
                        });
                        break;
                    case "*":
                        this.setState({
                            input: parseInt(memory[i - 1]) * parseInt(memory[i + 1])
                        });
                        break;
                    case "/":
                        this.setState({
                            input: parseInt(memory[i - 1]) / parseInt(memory[i + 1])
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    }

    render() {
        return (
            <div id="calculator">
                <div id="display">
                    <p>{this.state.input}</p>
                </div>
                    <button id="equals" onClick={this.compute}>=</button>

                    <button id="zero" onClick={() => {this.input(0)}}>0</button>
                    <button id="one" onClick={() => {this.input(1)}}>1</button>
                    <button id="two" onClick={() => {this.input(2)}}>2</button>
                    <button id="three" onClick={() => {this.input(3)}}>3</button>
                    <button id="four" onClick={() => {this.input(4)}}>4</button>
                    <button id="five" onClick={() => {this.input(5)}}>5</button>
                    <button id="six" onClick={() => {this.input(6)}}>6</button>
                    <button id="seven" onClick={() => {this.input(7)}}>7</button>
                    <button id="eight" onClick={() => {this.input(8)}}>8</button>
                    <button id="nine" onClick={() => {this.input(9)}}>9</button>

                    <button id="add" onClick={() => {this.input("+")}}>+</button>
                    <button id="subtract" onClick={() => {this.input("-")}}>-</button>
                    <button id="multiply" onClick={() => {this.input("*")}}>*</button>
                    <button id="divide" onClick={() => {this.input("/")}}>/</button>

                    <button id="decimal" onClick={() => {this.input(".")}}>.</button>
                    
                    <button id="clear" onClick={this.clear}>C</button>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="App">
                <Calculator />
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById("root")
)