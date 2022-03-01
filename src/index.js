import React from "react";
import ReactDOM from "react-dom";
import './styles.scss';

let memory = [];

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: 0,
            ans: null,
        }
        this.keyPressToButton = this.keyPressToButton.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.clear = this.clear.bind(this);
        this.input = this.input.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.updateAns = this.updateAns.bind(this);
        this.compute = this.compute.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    keyPressToButton(key) {
        document.getElementById(key).click();
    }

    /* Danish Keyboard support including numpad */
    handleKeyPress(event) {
        switch (event.keyCode) {
            case 13: 
                event.preventDefault();
                this.keyPressToButton("equals");
                break;

            case 48: 
                event.preventDefault();
                this.keyPressToButton("zero");
                break;

            case 96: 
                event.preventDefault();
                this.keyPressToButton("zero");
                break;

            case 49: 
                event.preventDefault();
                this.keyPressToButton("one");
                break;
            
            case 97: 
                event.preventDefault();
                this.keyPressToButton("one");
                break;

            case 50:
                event.preventDefault();
                this.keyPressToButton("two");
                break;

            case 98:
                event.preventDefault();
                this.keyPressToButton("two");
                break;

            case 51:
                event.preventDefault();
                this.keyPressToButton("three");
                break;

            case 99:
                event.preventDefault();
                this.keyPressToButton("three");
                break;

            case 52:
                event.preventDefault();
                this.keyPressToButton("four");
                break;

            case 100:
                event.preventDefault();
                this.keyPressToButton("four");
                break;

            case 53:
                event.preventDefault();
                this.keyPressToButton("five");
                break;

            case 101:
                event.preventDefault();
                this.keyPressToButton("five");
                break;
    
            case 54:
                event.preventDefault();
                this.keyPressToButton("six");
                break;

            case 102:
                event.preventDefault();
                this.keyPressToButton("six");
                break;

            case 55:
                event.preventDefault();
                this.keyPressToButton("seven");
                break;

            case 103:
                event.preventDefault();
                this.keyPressToButton("seven");
                break;

            case 56:
                event.preventDefault();
                this.keyPressToButton("eight");
                break;

            case 104:
                event.preventDefault();
                this.keyPressToButton("eight");
                break;

            case 57:
                event.preventDefault();
                this.keyPressToButton("nine");
                break;

            case 105:
                event.preventDefault();
                this.keyPressToButton("nine");
                break;
                
            case 107:
                event.preventDefault();
                this.keyPressToButton("add");
                break;

            case 171:
                event.preventDefault();
                this.keyPressToButton("add");
                break;

            case 173:
                event.preventDefault();
                this.keyPressToButton("subtract");
                break;

            case 109:
                event.preventDefault();
                this.keyPressToButton("subtract");
                break;

            case 106:
                event.preventDefault();
                this.keyPressToButton("multiply");
                break;

            case 222:
                event.preventDefault();
                this.keyPressToButton("multiply");
                break;

            case 111:
                event.preventDefault();
                this.keyPressToButton("divide");
                break;

            case 110:
                event.preventDefault();
                this.keyPressToButton("decimal");
                break;

            case 190:
                event.preventDefault();
                this.keyPressToButton("decimal");
                break;

            case 8:
                event.preventDefault();
                this.keyPressToButton("clear");
                break;

            case 46:
                event.preventDefault();
                this.keyPressToButton("clear");
                break;

            default:
                break;
        }
    }

    /* Resets the calculator */
    clear() {
        memory = [];
        this.setState({
            input: 0,
            ans: null
        });
    }

    /* Updates the state of the React component to display calculations */
    updateDisplay() {
        this.setState({
            input: memory.join("")
        });
    }
    /* Updates the number above the main display which shows the last operation performed */
    updateAns() {
        this.setState({
            ans: memory.join("")
        });
    }

    /* Takes input from all the buttons */
    input(i) {
        /* Handles input if we are inserting digits. Concatenates with previous integer, if any */
        if (!isNaN(i) && memory.length !== 0 && !isNaN(memory[memory.length - 1])) {
            let j = memory.pop();
            if (j + i != '00') {
                memory.push(("" + j + i));
            }
        }
        /* Handles decimal symbol input; failsafes in place to avoid syntax errors */
        else if (i == '.') {
            let repeated = false;
            if (memory.length === 0) {
                memory.push(0);
            }
            for (let j = 0; j < memory[memory.length - 1].length; j++) {
                if (memory[memory.length - 1].toString().charAt(j) === i) {
                    repeated = true;
                }
            }
            if (!repeated && !isNaN(memory[memory.length - 1])) {
                let j = memory.pop();
                memory.push(("" + j + i));
            }
        }
        /* Handles everything else, mostly operators */
        else {
            if(i != ".") {
                if(!(memory[memory.length - 1] == 0 && i == 0)) {
            memory.push(i);
                }
            }
        }
        this.updateDisplay();
    }

    /*
    Monstrosity of a function that computes the values stored in the array "memory".
    The main loop cycles until there is only a single value in memory.
    It tries to operate between two numbers in the switch statement.
    If multiple operators clash, it only takes into account the one next to the second number.
    Not my personal choice, user stories dictate how this should work, personally I would have
    made illegal operators to return "Syntax Error".
    Subtraction operators behave differently because they can be used for negative numbers.
    */
    compute() {
        this.updateAns();
        let k = 0;
        while (memory.length > 1) {
            for (let i = 0; i < memory.length; i++) {
                if (!isNaN(memory[i + 1])) {
                switch(memory[i]) {
                    case "+":
                        while (true) {
                            if (memory[i - 1] !== undefined) {
                                k = parseFloat((memory[i - 1])) + parseFloat((memory[i + 1]));
                                break;
                            }
                            else {
                                memory.unshift(0);
                                i += 1;
                            }
                        }
                        memory.splice(i - 1, 3, k);
                        k = 0;
                        this.updateDisplay();
                        i = 0;
                        break;
                    case "-":
                        while (true) {
                            if (memory[i - 1] !== undefined) {
                                k = parseFloat((memory[i - 1])) - parseFloat((memory[i + 1]));
                                break;
                            }
                            else {
                                memory.unshift(0);
                                i += 1;
                            }
                        }
                        memory.splice(i - 1, 3, k);
                        k = 0;
                        this.updateDisplay();
                        i = 0
                        break;
                    case "*":
                        while (true) {
                            if (memory[i - 1] !== undefined) {
                                k = ((parseFloat((memory[i - 1])) * 10) * (parseFloat((memory[i + 1])) * 10)) / 100;
                                break;
                            }
                            else {
                                memory.unshift(0);
                                i += 1;
                            }
                        }
                        memory.splice(i - 1, 3, k);
                        k = 0;
                        this.updateDisplay();
                        i = 0;
                        break;
                    case "/":
                        while (true) {
                            if (memory[i - 1] !== undefined) {
                                k = parseFloat((memory[i - 1])) / parseFloat((memory[i + 1]));
                                break;
                            }
                            else {
                                memory.unshift(0);
                                i += 1;
                            }
                        }
                        memory.splice(i - 1, 3, k);
                        k = 0;
                        this.updateDisplay();
                        i = 0;
                        break;
                    default:
                        break;
                    }
                }
                else if (isNaN(memory[i]) && isNaN(memory[i + 1])) {
                    if (!isNaN(memory[i + 2]) && memory[i + 1] == '-') {
                        memory[i + 2] = -Math.abs(memory[i + 2]);
                        memory.splice(i + 1, 1);
                    }
                    else {
                    memory.splice(i, 1);
                    }
                    i = 0;
                }
            }
        }
    }

    render() {
        return (
            <div id="calculator">
                <div id="ans">
                    <p>{this.state.ans}</p>
                </div>
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
                    <button id="multiply" onClick={() => {this.input("*")}}>x</button>
                    <button id="divide" onClick={() => {this.input("/")}}>&#247;</button>
                    <button id="decimal" onClick={() => {this.input(".")}}>.</button>
                    <button id="clear" onClick={this.clear}>AC</button>
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