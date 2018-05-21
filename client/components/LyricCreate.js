import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { content: ''}
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("submitted")

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        }).then(() => {
            console.log("submitted success")
        })
    }

    render() {
        console.log(this.props)
        console.log(this.state.content)

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>Add a lyric</label>
                <input
                    content= { this.state.content }
                    onChange={event => this.setState({ content:event.target.value })}/>
            </form>
        )
    }
}

const mutation = gql`
   mutation AddLylicToSong($content:String, $songId: ID){
       addLyricToSong(content:$content, songId: $songId) {
          id
          lyrics {
            id
            content 
            likes
          }
       }
   }  
`

export default graphql(mutation)(LyricCreate);