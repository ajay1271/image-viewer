import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import TopBar from './TopBar';
import ImageSection from './ImageSection';
import axios from 'axios';
import EditName from './EditName';
import './profile.css';
import { timingSafeEqual } from 'crypto';
import { ImageModal } from './ImageModal';

export class Profile extends Component{
    state ={
        username:'',
        fullname:'',
        profile:'',
        media:'',
        folows:'',
        follwed_by:'',
        recent:[]
    }
    componentDidMount(){
        sessionStorage.setItem('access-token', '11222840801.f3fe1ea.54bee85b35d045aabcc9580f743c0dc2 ');
        this.fetch()
    }

    fetch = () =>{
        const access_token="11222840801.f3fe1ea.54bee85b35d045aabcc9580f743c0dc2 ";
        // const requestOptions = { method: 'GET', headers: { sessionStorage } };
        axios.get(`https://api.instagram.com/v1/users/self/?access_token=${access_token}`)
        .then((response)=>{
            this.setState({username:response.data.data.username,
            fullname:response.data.data.full_name,
            profile:response.data.data.profile_picture,
            media:response.data.data.counts.media,
            follows:response.data.data.counts.follows,
            followed_by:response.data.data.counts.followed_by
            })
        })
        
        axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${access_token}`)
        .then((response)=>{
            this.setState({recent:response.data.data})
            console.log("rec",this.state.recent)
        })
    }
    render(){   
        const {fullname,recent,username,media,follows,followed_by,profile} = this.state;
        return(
            <div>
            <Grid container spacing={24}>
                {/* <Grid item xs={12}> */}
                    <Paper className="paper">
                        <Grid container spacing={24}>
                            <Grid className="profilepic" item xs={3}>
                                <Avatar alt="Profile" src={profile} className="bigAvatar" />
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container spacing={16}>
                                    <Grid style={{textAlign: 'left'}} className="username" item xs={12}>
                                        {username}
                                    </Grid>
                                    <Grid style={{textAlign: 'left'}} item xs={4}>
                                        Posts: {media}
                                    </Grid>
                                    <Grid style={{textAlign: 'left'}} item xs={4}>
                                        Follows: {follows}
                                    </Grid>
                                    <Grid style={{textAlign: 'left'}} item xs={4}>
                                        Followed By: {followed_by}
                                    </Grid>            
                                    <Grid className="fullname" item xs={4}>
                                        {fullname}<EditName/>                                        
                                    </Grid>
                                </Grid>
                            </Grid>        
                        </Grid>
                    </Paper>
                {/* </Grid>                 */}
            </Grid>
            <Grid container spacing={24}>
                {recent.map(d=>(
                <Grid className="post-grid" key={d.id} item xs={4}>
                    <ImageSection data={d}/>
                </Grid>
                ))}
                <ImageModal/>
            </Grid>
            </div>
        );
    }
}
