import React from 'react';
import ReactDOM from 'react-dom';

import Book from './book';

const viewPortWidth = window.innerWidth;
const viewPortHeight = window.innerHeight;

export default class BookContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:true,
            bookContainerLeft:{
                left:viewPortWidth/4,
                top: viewPortHeight, // Also add scrollY off
                transition: 'top 0.3s ease'
            },
            leftOffset:0
        }
        this.mountStyle = this.mountStyle.bind(this);
        this.unMountStyle = this.unMountStyle.bind(this);


    }
    componentWillUpdate(){

    }

    componentWillReceiveProps(newProps) { // check for the mounted props
        if(!newProps.mounted){
            this.unMountStyle() // call outro animation when mounted prop is false
        }
    }

    componentDidMount(){
        const leftOffset = ReactDOM.findDOMNode(this).offsetLeft + viewPortWidth*0.10
        this.setState({
            leftOffset:leftOffset
        })
        setTimeout(this.mountStyle,100);
    }

    mountStyle(){
        this.setState({
            bookContainerLeft:{
                left:viewPortWidth/4,
                top: 0, // Also add scrollY off
                transition: 'top 0.3s ease'
            }
        })
    }

    unMountStyle(){
        console.log("unmounting bookContainer");
        this.setState({
            bookContainerLeft:{
                left:viewPortWidth/4,
                top: viewPortHeight,
                transition: 'top 0.3s ease'
            }
        })
    }

    createBooks(){
        const that = this;
        var bookJSXArray = this.props.books.map(function(data,index) {
            return <Book
                        title = {data.title[0]}
                        rating = {data.average_rating}
                        key = {data.title[0]}
                        imageUrl = {data.image_url}
                        leftMost = {that.state.leftOffset}
                        index = {index}
                        bbBookArray = {that.props.bbBookArray}
                        />
        });
        return bookJSXArray;
    }


    render(){
        //if pc...
        return (
            <div
                style = {{...this.state.bookContainerLeft,...containerStyle}}
                className="bookContainer"
                >
                <div style={innerContainer}>
                    {this.createBooks()}
                </div>
            </div>
        );
    }
}
const containerStyle = {
    width:'75%',
    position:'relative',
    height:'100%',
    display:'flex',
    justifyContent:'center'
}

const innerContainer = {
    width: '90%',
    alignItems:'center',
    justifyContent: 'space-around',
    display: 'flex',
    flexWrap: 'wrap'
}
