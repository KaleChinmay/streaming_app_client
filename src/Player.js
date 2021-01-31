import React, { Component } from 'react'
import ReactPlayer from "react-player"
export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {}
        };
    }
    async componentDidMount() {
        try {
            const res = await fetch(`http://localhost:4000/video/${this.state.videoId}/data`);
            const data = await res.json();
            this.setState({ videoData: data });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ReactPlayer url={`http://localhost:4000/video/${this.state.videoId}`} type="video/mp4" controls muted autoPlay height="70%" width="70%">
                    </ReactPlayer>
                    <h1>{ this.state.videoData.name }</h1>
                </header>
            </div>
        )
    }
}