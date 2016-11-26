import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, Input, Button, Spinner } from './common';
import { 
	emailChanged, 
	passwordChanged, 
	loginUser 
} from '../actions';

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;
		this.props.loginUser({ email, password });
	}

	renderButton() {
		if(this.props.loading) {
			return <Spinner />;
		}
		return <Button onPress={  this.onButtonPress.bind(this) }>Login</Button>;
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input 
						placeholder="Email Address"
						keyboardType="email-address"
						onChangeText={this.onEmailChange.bind(this)}
						value= { this.props.email }
					/>
				</CardSection>
				
				<CardSection>
					<Input 
						placeholder="password"
						secureTextEntry
						onChangeText={ this.onPasswordChange.bind(this) }
						value= { this.props.password }
					/>
				</CardSection>

				<Text style={{ fontSize: 20, alignSelf: 'center', color: 'red' }}> { this.props.error } </Text>

				<CardSection>
					{ this.renderButton() }
				</CardSection>

			</Card>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;
	return { email, password, error, loading };
};

export default connect(mapStateToProps, { 
	emailChanged, passwordChanged, loginUser 
})(LoginForm);
