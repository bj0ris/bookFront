import React, { Component } from 'react';

const viewPortHeight = window.innerHeight;
export default class SearchForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            style :{
                top: -viewPortHeight/5,
            },
            lastAutocompleteObject: {},
            autocompleteArray:[],
            submitValue:""
        }
        this.mountStyle = this.mountStyle.bind(this);
        this.unMountStyle = this.unMountStyle.bind(this);
        this.checkAutocompleteArray = this.checkAutocompleteArray.bind(this);
        this.makeAutocompleteJSX = this.makeAutocompleteJSX.bind(this);
        this.clicked = this.clicked.bind(this);
        this.textEnter = this.textEnter.bind(this);
    }

    componentDidMount(){
        console.log("Mounting Form");
        setTimeout(this.mountStyle, 10) // call the into animation
    }

    shouldComponentUpdate(){
        return true;
    }

    componentWillReceiveProps(newProps) { // check for the mounted props
        if(!newProps.mounted){
            this.unMountStyle() // call outro animation when mounted prop is false
        }
        if(newProps.autocompleteObject !== this.state.lastAutocompleteObject && newProps.autocompleteObject!== undefined){
            this.checkAutocompleteArray(newProps.autocompleteObject);
        }
    }

    checkAutocompleteArray(autocompleteObject){
        //BUG I need to keep immutability of state
        console.log(autocompleteObject);
        var autocompleteArray = this.state.autocompleteArray
        var included = false;
        for(var i =0; i<autocompleteArray.length;i++){
            if(autocompleteArray[i].id === autocompleteObject.id){
                included = true;
            }
        }
        if(!included){
            if(autocompleteArray.length<5){
                //add normal
                autocompleteArray.unshift(autocompleteObject);
            }
            else{
                //
                autocompleteArray.pop();
                autocompleteArray.unshift(autocompleteObject);
            }
        }
        console.log(autocompleteArray[0].id);
        this.setState({
            autocompleteArray:autocompleteArray
        })
    }

    makeAutocompleteJSX () {
        const that = this;
        var autoJSXArray = this.state.autocompleteArray.map( function(data){
            console.log(data.id);
            return <li
                        key={data.id}
                        onClick={that.clicked}
                        id={data.id}
                        style={{border: '1px solid gray'}}
                        >
                        {data.name}
                    </li>
        });
        return (<ul style={ulStyle}>{autoJSXArray}</ul>);
    }
    textEnter(event){
        this.props.autocomplete(event);
        if(event.target.value.keyCode === 13){
            //enter has been pressed
            console.log("Send: "+this.state.submitValue);
        }
        this.setState({
            submitValue:event.target.value
        })
    }

    clicked(event){
        this.setState({
            submitValue:event.target.textContent
        })
    }

    mountStyle() {
        this.setState({
            style: {
                top: viewPortHeight/2,
                transition: 'top 0.3s ease',
            }
        });
    }
    unMountStyle(){
        console.log("unmounting form");
        this.setState({
            style: {
                top: -viewPortHeight/5,
                transition: 'top 0.3s ease',
            }
        })
    }

    render(){
      return (
          <div
            style={{...this.state.style,...divStyle}}>
              <form>
                  <label>
                      Author:
                      <input type="text" name="searchField" autoComplete="off"
                        value={this.state.submitValue}
                        onChange={this.textEnter}
                        />
                  </label>
                  <input type="submit" value="Submit" onClick={this.props.submit} />
              </form>
              {this.makeAutocompleteJSX()}
          </div>
      );
    }
}

const divStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto'
};
const ulStyle = {
    textDecoration: 'none',
    listStyleType: 'none',
    boder: '1 solid gray',
    /*
    border-width: 1px;
    border-color: gray;
    border-style: solid;
    */
    margin: 'auto',
    fontSize: '0.75em',
    width: 130,
    textAlign: 'left',
    padding: 0
}

const liStyle = {
    border: '1 solid gray',
}
