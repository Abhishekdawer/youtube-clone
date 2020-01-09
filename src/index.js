import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchkey: 'reactjs',
      videoslist: [],
      loadstatus12: null ,
      currentVIdeoUrl12: '',
      comment: '',
      commentsList: [],
      statusLike: 'Like',
      isLoadError: false
    };
  }
setSearchValue = (event) => {

this.setState({
  searchkey: event.target.value
})
console.log(this.state.searchkey)
}
searchVideo = async () => {
    this.setState({
    loadstatus12: "LOADING",
    isLoadError: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchkey}&type=video&videoDefinition=high&key=	
AIzaSyB65fHj34s3Ga-Ow9XtFyTol9gW5cY4HoA`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    isLoadError: true
  })
}
this.setState({
  videoslist: myJson.items
})
console.log(this.state.videoslist)
  this.setState({
    loadstatus12: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadstatus12: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyB65fHj34s3Ga-Ow9XtFyTol9gW5cY4HoA`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  videoslist: myJson.items,
  loadstatus12: "LOADED"
})
console.log(this.state.videoslist)
this.setState({
  currentVIdeoUrl12: this.state.videoslist[0].id.videoId
})
console.log("currentVIdeoUrl12" , this.state.currentVIdeoUrl12)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("videoslist" , this.state.videoslist)
}
setCurrentUrl = (id) => {

  this.setState({
    currentVIdeoUrl12: id
  })
}
setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
addComment = () => {
  this.setState({
    commentsList: [...this.state.commentsList, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.statusLike == "Like"){
  this.setState({
    statusLike: 'Liked'
  })
  } else {
      this.setState({
    statusLike: 'Like'
  })
  }

}
  render() {
    let videos = this.state.videoslist.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '300px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"450px",width:"430px"}} placeholder="Search here..." onChange={this.setSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.isLoadError ? (<h1>No search found</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.currentVIdeoUrl12}`} style={{height: '350px', width: '850px', float : 'left'}}/>
)}


      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '300px', float : 'right'}}>
        {this.state.loadstatus12 == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "790px" ,backgroundColor:" red",padding:'12px'}}onClick={this.likeButton}>{this.state.statusLike}</button>
{this.state.commentsList.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> comments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'300px'}} onChange={this.setComment} placeholder= "Upgrad" value={this.state.comment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"45px", width:'300px'}}onChange={this.setComment} placeholder="Your Comment" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'580px', width:'120px'}}onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"20px" ,width:'120px'}}> cancel</button>
    
    


      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));