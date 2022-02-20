import React from "react";
import ReactDOM from "react-dom";
import './styles.scss';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: 0,
            output: 1
        }
        this.clear = this.clear.bind(this);
    }

    clear() {
        this.setState({
            input: 0,
            output: 0
        });
    }

    render() {
        return (
            <div id="calculator">
                <div id="display">
                    <p>{this.state.output}</p>
                </div>
                    <button id="equals">=</button>

                    <button id="zero">0</button>
                    <button id="one">1</button>
                    <button id="two">2</button>
                    <button id="three">3</button>
                    <button id="four">4</button>
                    <button id="five">5</button>
                    <button id="six">6</button>
                    <button id="seven">7</button>
                    <button id="eight">8</button>
                    <button id="nine">9</button>

                    <button id="add">+</button>
                    <button id="subtract">-</button>
                    <button id="multiply">*</button>
                    <button id="divide">/</button>

                    <button id="decimal">.</button>
                    
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