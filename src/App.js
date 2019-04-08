import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/searchForm.js';
import AuthorSelectedContainer from './components/authorSelectedContainer';
import LoadingWindow from './components/loadingWindow';

const APIURL = "";

class App extends Component {
    //TODO Add link-list for autocomplete suggestions
    constructor(props){
        super(props);
        this.state = {

            mountForm:true,  //This sets unmounting and mounting in the components
            autocompleteObject : {},
            authorSelected: false,
            mountAuthor:false,
            authorJson: {},
            waitingReply:false,
            bbBookArray: []
        };
        this.sendAutocompleteRequest = this.sendAutocompleteRequest.bind(this);
        this.sendBBBookRequest = this.sendBBBookRequest.bind(this);
        this.updateBBarray = this.updateBBarray.bind(this);
        this.submitClick = this.submitClick.bind(this);
        this.cancelSubmit = this.cancelSubmit.bind(this);
        this.unMountAuthor = this.unMountAuthor.bind(this);
        this.getNameIdObject = this.getNameIdObject.bind(this);
        this.updateAutoCompleteState = this.updateAutoCompleteState.bind(this);
    }

    sendAutocompleteRequest(event){
        var that = this;
        this.getNameIdObject( event.target.value, function(responseObject){
            console.log(responseObject);
            that.updateAutoCompleteState(responseObject);
        });
    }

    getNameIdObject(searchString,callback){
        var data = {string: searchString};
        fetch(APIURL+"searchString/", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
        }
        }).then(res => res.json())
            .then(response =>
                callback(response)
            )
            .catch(error => console.error('Error:', error));
    }

    sendBBBookRequest(){
        var name = this.state.authorJson.name;
        console.log(name);
        const data = {authorName:name}
        fetch(APIURL+"bergenBiblAuthor/", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
        }
        }).then(res => res.json())
            .then(response =>
                this.updateBBarray(response)
            )
            .catch(error => console.error('Error:', error));
    }

    updateBBarray(array) {
    console.log(array);
    setTimeout( () => {
            this.setState({
                bbBookArray:array
            });
        }, 1500);
    }

    updateAutoCompleteState(autoObject){
        console.log(autoObject);
        this.setState({
            autocompleteObject:autoObject
        })
    }

    //TODO get author ID
    submitClick(event){
        event.preventDefault();

        this.unMountForm();

        //send
        const that = this
        this.getNameIdObject( this.state.autocompleteObject.name, function(responseObject){
            console.log(responseObject);
            that.updateAutoCompleteState(responseObject);

            var data = {id:responseObject.id} //Need to find this programatically
            fetch(APIURL+"fullSearch/", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
            }
            }).then(res => res.json())
                .then(response =>
                    that.updateAuthorState(response)
                )
                .catch(error => console.error('Error:', error))
        });
    }

    updateAuthorState(authorJsonResponse){
        this.setState({
            authorJson:authorJsonResponse,
            waitingReply:false,
        });
        setTimeout(this.sendBBBookRequest,500)
    }

    unMountForm(){
        this.setState({
            mountForm:false
        });
        // "Synchronically" setting the other states to allow time for exit animation of form
        setTimeout( () =>{
            this.setState({
                mountAuthor:true,
                showForm:false,
                authorSelected:true,
                waitingReply:true
        }) },300);
    }

    unMountAuthor(){
        this.setState({
            mountAuthor: false,
        });

        setTimeout( () =>{
            this.setState({
                showForm:true,
                mountForm:true,
                authorSelected: false,
                autocomplete : "",
                authorJson: {},
            })
        },300);
    }

    cancelSubmit(){
        this.setState({
            waitingReply:false,
            authorSelected: false,
        })

        setTimeout( () =>{
            this.setState({
                showForm:true,
                mountForm:true,
                autocomplete : "",
                authorJson: {},
            })
        },300);
    }

    loadingCancelled(){

    }

    render() {
        if(!this.state.authorSelected){
            return (
                <div className="App">
                    <header className="App-header">
                        <SearchForm
                            autocomplete={this.sendAutocompleteRequest}
                            submit={this.submitClick}
                            autocompleteObject={this.state.autocompleteObject}
                            mounted={this.state.mountForm}
                        />

                    </header>
                </div>
                );
        }
        else{
            if(this.state.waitingReply){
                return(
                    <div className="App">
                        <header className="App-header">
                                <LoadingWindow clickedProp={this.cancelSubmit}/>
                        </header>
                    </div>
                )
            }
            else{
                return(
                    <div className="App">
                        <header className="App-header">
                            <AuthorSelectedContainer
                                cancelAuthor={this.unMountAuthor}
                                mounted = {this.state.mountAuthor}
                                authorJson={this.state.authorJson}
                                bbBookArray = {this.state.bbBookArray}
                            />
                        </header>
                    </div>
                    );
                }
            }
        }
    }

export default App;
