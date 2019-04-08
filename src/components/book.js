import React from 'react';
import ReactDOM from 'react-dom';

import BookExpanded from './bookExpanded'
import BbStatus from './bbstatus';

const viewPortWidth = window.innerWidth;

export default class Book extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expanded:false,
            mountExtended:true,
        }
        this.bookRef = React.createRef();
        this.expandRetract = this.expandRetract.bind(this);
        this.findTitle = this.findTitle.bind(this);
    }

    componentDidMount(){

    }


    expandRetract(){
        const newExpandBool = this.state.expanded ? false : true;
        if(newExpandBool){
            this.setState({
                expanded:true
            })
        }
        else{
            this.setState({
                mountExtended:false
            });
            setTimeout(() => {
                this.setState({
                    expanded:false
                })
            }, 2000);
        }

    }
    findTitle(){
        const fullTitle = this.props.title;
        if(fullTitle.length >14){
            return fullTitle.substring(0,14)+"..."
        }
        else{
            return fullTitle
        }
    }


    render(){

        if(this.state.expanded){
            console.log(this.props.leftMost)
            return(
                <div
                    style={bookStyleHolder}
                    onClick={this.expandRetract}
                    >
                    <BookExpanded
                        top = {ReactDOM.findDOMNode(this).offsetTop-window.pageYOffset}
                        left = {ReactDOM.findDOMNode(this).offsetLeft+viewPortWidth/4}
                        leftMost = {this.props.leftMost}
                        mounted = {this.state.mountExtended}
                        title = {this.props.title}
                        rating = {this.props.rating}
                        bbStatus = {"bb status"}
                        imageUrl = {this.props.imageUrl}
                    />
                </div>
            );
            }
            else{
                return(
                <div
                    style={bookStyleRetracted}
                    onClick={this.expandRetract}
                    className="book"
                    >
                    <div className="leftBook"
                        style={leftBook}
                        >
                        <img src={this.props.imageUrl} alt= "" style={coverStyle} />
                    </div>
                    <div className="rightBook"
                        style={rightBook}
                        >
                        <p>{this.findTitle()}</p>
                        <p>Rating {this.props.rating}</p>
                        <BbStatus
                            bbBookArray={this.props.bbBookArray}
                            title={this.props.title}
                            />
                    </div>
                </div>
                )
            }
    }
}

const bookStyleRetracted = {
    width:350,
    height:200,
    backgroundColor:'rgb(72, 79, 94)',
    margin: '1%',
    overflow:'hidden',
    display:'flex',
    borderStyle:'groove',
    borderColor:  'rgb(97, 218, 251)',
    borderWidth: 4,
    borderRadius: 20
}


const bookStyleHolder = {
    width:350,
    height:200,
    margin: '1%',
    backgroundColor:'#282c34',
}

const leftBook = {
    flex:1,
    display:'flex',
}
const rightBook = {
    flex:1
}

const coverStyle = {
    maxWidth: '80%',
    margin: 'auto',
}
