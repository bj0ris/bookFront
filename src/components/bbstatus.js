import React from 'react';
import ReactLoading from 'react-loading';

const APIURL = ""

export default class BbStatus extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loc:'N/A', // 'utlånt' eller (f.eks) '82 U'
            waitingReply:true
        }
        this.titleInArray = this.titleInArray.bind(this);
        this.sendBookDetailsRequest = this.sendBookDetailsRequest.bind(this);
        this.updateLoc = this.updateLoc.bind(this);
    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.bbBookArray.length>=1){
            this.titleInArray(nextProps.bbBookArray);
        }
    }

    titleInArray (bookArray){
        var bookStringArray = [];
        for( var i = 0 ; i < bookArray.length ;i++){

            //lowercasing, and removing special characters (including spaces) from titleString
            var tempTitle = bookArray[i].title.replace(/[^a-zA-Z]/g, "").toLowerCase();
            bookStringArray.push(tempTitle);
        }

        var tempThisTitle = this.props.title.replace(/[^a-zA-Z]/g, "").toLowerCase();

        var indexMatch = bookStringArray.indexOf(tempThisTitle);
        if(indexMatch>-1){
            console.log("BOOK INCLUDED!!"+ tempThisTitle);
            if(bookArray[indexMatch].isAvailable){
                const url = bookArray[indexMatch].bookUrl;
                this.sendBookDetailsRequest(url);
            }
            else{
                console.log("book is not available");
            }
        }
        else{
            this.setState({
                waitingReply:false
            })
        }


    }

    sendBookDetailsRequest(bookUrl){

        const data = {url:bookUrl}
        fetch(APIURL+"bergenBiblBook/", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response =>
                this.updateLoc(response.location)
            )
            .catch(error => console.error('Error:', error));
    }

    updateLoc(locString){
        this.setState({
            loc:locString,
            waitingReply:false,
        })
    }


    //Change react loading classname in css and loadingWindow, and here obviously
    render(){
        return(
            <div className="bbstatus" style={outerStyle}>
                <p>Loc</p>
                {this.state.waitingReply ?
                <ReactLoading className={"spinner"} color={'rgb(97, 218, 251)'} height={'30%'} width={'30%'} />:
                <p>{this.state.loc}</p>
                }

            </div>
        );
    }
}


const outerStyle = {
    display:'flex'
}
