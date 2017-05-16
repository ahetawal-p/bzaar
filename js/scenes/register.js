import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Header, Body, Content, Thumbnail, Toast, Form, Title, Item, Label, Left, Icon, Input, Text, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/register';

class Register extends Component {
  static navigationOptions = {
    header: null,
  }
  
  constructor(props){
    super(props);
    this.state = {
        email: '',
        name: '',
        password: '',
        surname: '',
        confirmPassword: '',
        pendingRequest: false,
        errorMessage: '',
        showToast: false
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      email: nextProps.email, name: nextProps.name, surname: nextProps.surname,
      password: nextProps.password, confirmPassword: nextProps.confirmPassword,
      pendingLoginRequest: nextProps.pendingLoginRequest, errorMessage: nextProps.errorMessage,
      showToast: nextProps.showToast})
  }

  _handleSubmit(email, name, surname, password, confirmPassword) {
    if (email === '' || password === '' || surname === '' || name === ''){
      Toast.show({
        text: 'Existe campos não preenchidos!',
        position: 'bottom',
        buttonText: 'Okay'
      });
      return;
    }
    if (password !== confirmPassword){
      Toast.show({
        text: 'As senhas não conferem!',
        position: 'bottom',
        buttonText: 'Okay'
      });
      return;
    }
    this.props.register(email, name, surname, password);
  }

  _showErrorMessage(message){
    if (message !== ''){
      Toast.show({
        text: message,
        type: 'warning',
        duration: 10000,
        position: 'bottom',
        buttonText: 'Okay'
      });
    }
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: 'white'}} androidStatusBarColor='black'>
          <Left style={{flexDirection: 'row'}}>
            <Button transparent onPress={() => this.props.returnPage()}>
              <Icon style={{color: 'black'}} name='arrow-back' />
            </Button>
            <Title style={{color: 'black', alignSelf: 'center'}}>Register</Title>
          </Left>
        </Header>
        <Content style={{backgroundColor: 'white'}} padder>
          <View>
          <Form>
            <Item>
              <Input
                value={this.state.email}
                placeholder="email"
                onChangeText={(email) => this.props.changingEmailValue(email)}
               />
            </Item>
            <Item>
              <Input
                value={this.state.name}
                placeholder="name"
                onChangeText={(name) => this.props.changingNameValue(name)}
               />
            </Item>
            <Item>
              <Input
                value={this.state.surname}
                placeholder="surname"
                onChangeText={(surname) => this.props.changingSurnameValue(surname)}
               />
            </Item>
            <Item>
              <Input secureTextEntry
                placeholder="Password"
                onChangeText={(password) => this.props.changingPasswordValue(password)}
               />
            </Item>
            <Item>
              <Input secureTextEntry
                placeholder="Confirm Password"
                onChangeText={(confirmPassword) => this.props.changingConfirmPasswordValue(confirmPassword)}
               />
            </Item>
            {this.state.pendingLoginRequest ? (<Spinner />) :
            <View>
              <Button block dark onPress={() => this._handleSubmit(this.state.email, this.state.name, this.state.surname, this.state.password, this.state.confirmPassword)}>
                <Text>Send</Text>
              </Button>
            </View>
            }
          </Form>
          </View>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return { 
    pendingRequest: state.register.pendingRequest,
    email: state.register.email,
    name: state.register.name,
    surname: state.register.surname,
    password: state.register.password,
    confirmPassword: state.register.confirmPassword,
    errorMessage: state.login.errorMessage,
    showToast: state.login.showToast,
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);