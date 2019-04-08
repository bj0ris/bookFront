import React, { Component } from 'react';
import AuthorAside from './authorAside';
import BookContainer from './bookContainer';

//Use theese to decide wether mobile or pc/pad
const viewPortHeight = window.innerHeight;
const viewPortWidth = window.innerWidth;

export default class authorSelectedContainer extends React.Component {



    componentWillReceiveProps(nextProps){
        //SOMETHING??
    }

    render(){

        //if pc...
        return (
            <div
                className="authorSContainer"
                style={authorSContainer}
                >
                <AuthorAside
                    authorJson = {this.props.authorJson}
                    mounted = {this.props.mounted}
                    cancelAuthor = {this.props.cancelAuthor}
                />
                <BookContainer
                    books = {this.props.authorJson.booksArray}
                    mounted = {this.props.mounted}
                    bbBookArray = {this.props.bbBookArray}
                />
            </div>
        );
    }
}


const authorSContainer = {
    display:'flex',
    width:'100%',
    minHeight:'100vh',
    overflow:'hidden'
}
