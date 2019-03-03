import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import './profile.css';
import EditName from './EditName';


export default class TopBar extends Component{
    state = {
        open: false,
        userName:'shubham',
        fullname:'shubham wadhwa',
        profile:'',
        media:'',
        folows:'',
        follwed_by:''

      };
      updateValues = ()=>{
        this.setState({
            // userName:this.props.user.data.username
        })
      }

      componentDidMount(){
          this.updateValues();
      }
    
    render(){
        const {open,fullname} = this.state;
        console.log("props",this.props.user.data)
        return(
            <Paper className="paper">
                <Grid container spacing={24}>
                 <Grid className="profilepic" item xs={3}>
                    <Avatar alt="Profile" src="" className="bigAvatar" />
                 </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={12}>
                        <Grid style={{textAlign: 'left'}} item xs={12}>
                                username
                        </Grid>
                        <Grid style={{textAlign: 'left'}} item xs={4}>
                            Posts: 6
                        </Grid>
                        <Grid style={{textAlign: 'left'}} item xs={4}>
                            Follows: 5
                        </Grid>
                        <Grid style={{textAlign: 'left'}} item xs={4}>
                            Followed By: 12
                        </Grid>            
                        <Grid className="fullname" item xs={12}>
                            {fullname}
                            <EditName/>
                        </Grid>
                        </Grid>
                    </Grid>        
            </Grid>
            
            </Paper>
        );
    }
}
