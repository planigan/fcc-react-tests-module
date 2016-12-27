/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Manage State Locally First`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Here we will finish creating our DisplayMessages component.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>First, in the <code>render()</code> method, have the
component render an <code>input</code> element, <code>button</code> element, and <code>ul</code> element. The <code>input</code> element
should update changes to a <code>handleChange()</code> method and render the value of <code>input</code> in the component's state.
The button should trigger a <code>submitMessage()</code> method when clicked.<br><br>

Second, write these two methods. The <code>handleChange()</code> method simply needs to update the <code>input</code> with what the user is
typing and the <code>submitMessage()</code> method should concatenate the current message stored in <code>state</code>
to the <code>messages</code> array in local state, and clear the value of the <code>input</code>.<br><br>

Finally, use the <code>ul</code> to map over the array of <code>messages</code> and render it to the screen as a list of <code>li</code> elements.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      input: '',
      messages: []
    }
	}
  // add handleChange() and submitMessage() methods here

  // change code above this line
  render() {
    return (
    	<div>
        <h2>Type in a new Message:</h2>
        { /* render an input, button, and ul here */ }

        { /* change code above this line */ }
    	</div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      input: '',
      messages: []
    }
	}
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
	submitMessage = () => {
		const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
    	<div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
    		<button onClick={this.submitMessage}>Submit</button>
    		<ul>
		    	{this.state.messages.map( (message, idx) => {
		    			return (
		    			 	<li key={idx}>{message}</li>
		    			)
		    		})
	    		}
	    	</ul>
    	</div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The DisplayMessages component is initialzed with a state equal to {input: \'\', messages: []}';
	const error_2 = 'The DisplayMessages component renders a div containing an h2 element, button element, and ul element.';
	const error_3 = 'The input element renders the value of input in local state.';
	const error_4 = 'Calling the method handleChange updates the input value in state to the user\'s input.';
	const error_5 = 'Calling the method submitMessage adds the user\'s input to the messages array in state.';
	const error_6 = 'Calling the method submitMessage clears the user\'s input.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: error_0
		},
		{
			test: 1,
			status: false,
			condition: error_1
		},
		{
			test: 2,
			status: false,
			condition: error_2
		},
		{
			test: 3,
			status: false,
			condition: error_3
		},
		{
			test: 4,
			status: false,
			condition: error_4
		},
		{
			test: 5,
			status: false,
			condition: error_5
		},
		{
			test: 6,
			status: false,
			condition: error_6
		}
	];

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	
	const exportScript = '\n export default DisplayMessages'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		const initialState = mockedComponent.state();
		assert(
			typeof initialState === 'object' &&
			initialState.input === '' &&
			initialState.messages.length === 0,
			error_3
		);

		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {

		mockedComponent.setState({messages: ['__TEST__MESSAGE']});
		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('h2').length === 1 &&
			mockedComponent.find('button').length === 1 &&
			mockedComponent.find('ul').length === 1 &&
			mockedComponent.find('li').length === 1,
			error_2
		);

		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {

		mockedComponent.instance().handleChange({target: {value: '__TEST__EVENT__INPUT'}});
		const finalValue = mockedComponent.find('input').node.value;

		assert.strictEqual(finalValue, '__TEST__EVENT__INPUT', error_3);

		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;		
	}	

	// test 4:
	try {

		const initialState = mockedComponent.state();
		mockedComponent.instance().handleChange({target: {value: '__TEST__EVENT__MESSAGE'}});
		const afterInput = mockedComponent.state();

		assert(
			initialState.input === '__TEST__EVENT__INPUT' &&
			afterInput.input === '__TEST__EVENT__MESSAGE',
			error_4
		);

		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	let beforeSubmit, afterSubmit

	// test 5:
	try {

		beforeSubmit = mockedComponent.state();
		mockedComponent.instance().submitMessage();
		afterSubmit = mockedComponent.state();

		assert(
			beforeSubmit.messages.length === 1 &&
			afterSubmit.messages.length === 2 &&
			afterSubmit.messages[1] === '__TEST__EVENT__MESSAGE',
			error_5
		);

		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	// test 6:
	try {

		assert(
			beforeSubmit.input === '__TEST__EVENT__MESSAGE' &&
			afterSubmit.input === '',
			error_6
		);

		testResults[6].status = true;
	} catch (err) {
		passed = false;
		testResults[6].status = false;
	}	

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default DisplayMessages'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}
