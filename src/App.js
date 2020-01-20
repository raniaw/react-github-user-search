import React, { Component } from 'react';
import './App.css';

//API users from github
const API ="https://api.github.com/users";

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      username:"facebook",
      name:"",
      avatar:"",
      location:"",
      repos:"",
      "followers":"",
      "following":"",
      "homeUrl":"",
      "notFound":""
    }
  }

  fetchProfile(username){
    let url = API+'/'+username;
    fetch(url)
    .then((result)=>{
      return result.json() 
    })
    .then((data)=>{
      console.log(data);
      
      this.setState({
        username:data.login,
        name:data.name,
        avatar:data.avatar_url,
        location:data.location,
        repos:data.public_repos,
        followers:data.followers,
        following:data.following,
        homeUrl:data.html_url,
        notFound:data.message
      })
    })
    .catch((err)=>{
      console.log("Ups... there is a problem! ",err);
    })
  }
  
  componentDidMount() {
    console.log("did mount");
    this.fetchProfile(this.state.username);
  }
  

  render() {
    return (
      <div className="App">
      <section id="card">
        <SearchProfile fetchProfile ={this.fetchProfile.bind(this)}/>
        <Profile data={this.state} />
      </section>
      </div>
    )
  }
}


export class SearchProfile extends Component {
  render() {
    return (
      <div className="search--box">
        <form onSubmit={this.handleForm.bind(this)}>
          <label>
            <input type="search" ref={(ref)=>this.search=ref}
            placeholder="Please type a username and Enter(example \'facebook\')"/>
          </label>
        </form>
      </div>
    )
  }
  handleForm(e){
    e.preventDefault();
    let username=this.search.value;
    this.props.fetchProfile(username);
    this.search.value="";
  }
}

export class Profile extends Component {
  render() {
    let data=this.props.data;
    let followers=`${data.homeUrl}/followers`;
    let following=`${data.homeUrl}/following`;
    let repositories = `${data.homeUrl}?tab=repositories`;
    if (data.notFound==='Not Found'){
      return (
        <div className="notfound">
          <h4>Ups..!</h4>
          <p> the component that you are looking for is not found, please try again</p>
        </div>
      )
    }else{
      console.log()
    }
    return (
      <section className="github--profile">
        <div className="github--profile__info">
          <a href={data.homeUrl} target='_blank' title={data.name}>
            <img src={data.avatar}/>
          </a>
          <h2>
            <a href={data.homeUrl} target='_blank'></a>{data.name}
          </h2>
          <h3>
            {data.location || 'I live In My Mind'}
          </h3>
        </div>
        <div className="github--profile__state">
          <ul>
            <li>
              <a href={followers} target='_blank' title="Number of Followers"><i>{data.followers}</i><span> Followers</span></a>
            </li>
            <li>
              <a href={repositories} target='_blank' title="Number of repositories"><i>{data.repos}</i><span> Repositories</span></a>
            </li>
            <li>
              <a href={following} target='_blank' title="Number of Following"><i>{data.following}</i><span> Following</span></a>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}

