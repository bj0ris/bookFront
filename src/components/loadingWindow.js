import React, { Component } from 'react';
import ReactLoading from 'react-loading';

export default class LoadingWindow extends React.Component {

    render(){
        return(
                <div style={loadingWindow} onClick={this.props.clickedProp}>
                    <div className="top" style={top}>
                        <p style={xStyle}>X</p>
                        <p style={pStyle}>Loading Author Data</p>
                    </div>
                    <ReactLoading className={"spinner"} type={'spin'} color={'rgb(97, 218, 251)'} height={'30%'} width={'30%'} />


                </div>
        );
    }
}

const loadingWindow = {
    width: 200,
    height:200,
    borderRadius:20,
    backgroundColor:'rgb(72, 79, 94)',

}

const top = {
    display: 'flex',
    flexDirection: 'column'
}

const xStyle = {
    marginTop: 10,
    marginLeft: 160
}

const pStyle = {
    fontSize: '0.75em'
}

const spinnerStyle = {
    margin: 'auto'
}
