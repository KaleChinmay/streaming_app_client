import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player"
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            serverVideos: [],
            youtubeVideos: ["https://www.youtube.com/watch?v=yeUpnIKt6k4",
                            "https://www.youtube.com/watch?v=oZ67d9XSjFs",
                            "https://www.youtube.com/watch?v=LHTYpWI3S6Q"]
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch('https://anime-stream-app.herokuapp.com:4000/videos');
            const data = await response.json();
            this.setState({ serverVideos: [...data] });
        } catch (error) {
            console.log(error);
        }
    }
    
    render() {
        return (
            <div className="App App-header">
                <div className="container">
                    <div className="banner">
                        <h1>
                            Anime Stream
                        </h1>
                        <p>
                            This is my first react app.
                        </p>
                    </div>
                    <div className="server_video_section">
                        <h3>
                            Videos on this server
                        </h3>
                        <div className="row">
                            {this.state.serverVideos.map(video =>
                            <div className="col-md-4" key={video.id}>
                                <Link to={`/player/${video.id}`}>
                                    <div className="card border-0">
                                        <img src={`https://anime-stream-app.herokuapp.com:4000${video.poster}`} alt={video.name} />
                                        <div className="card-body">
                                            <p>{video.name}</p>
                                            <p>{video.duration}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="external_video_section">
                        <h3>
                            YouTube Trailers
                        </h3>
                        <div className="row">
                            {this.state.youtubeVideos.map(video =>
                                <div className="col-md-4">
                                    <ReactPlayer url={video} height="auto" width="auto">
                                    </ReactPlayer>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}