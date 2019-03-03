import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Input } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const _ = require('lodash');


export class ImageModal extends React.Component {
  state = {
    data: {},
    comments:{},
  };

  handleClose = () => {
    this.props.handleClose()
  };

  fetchComments = (id) =>{
    console.log("state",id)
    const access_token="11222840801.f3fe1ea.54bee85b35d045aabcc9580f743c0dc2 ";
    // const requestOptions = { method: 'GET', headers: { sessionStorage } };
    const url = `https://api.instagram.com/v1/media/${id}/comments?access_token=${access_token}`;
    console.log("url",url)
    axios.get(url)
    .then((response)=>{
        this.setState({comments:response.data.data})
    })
}
componentDidMount(){
    if(this.props.data){
        this.setState({data:this.props.data})
        // const id = _.get(this.props.data,'id',null)
        this.fetchComments(this.props.data.id)
    }
        
}

  render() {
      console.log("modal_data",this.state.comments)
      const styles = theme => ({
        root: {
          ...theme.mixins.gutters(),
          paddingTop: theme.spacing.unit * 2,
          paddingBottom: theme.spacing.unit * 2,
        },
        paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
          gridList: {
            width: 500,
            height: 450,
          },
      });

      function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 0 + rand();
  const left = 60 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translateY(100%)`,
  };
}

const{data, comments} = this.state;
    return (
      <div>
        <Modal
          open={this.props.open}
          onClose={this.handleClose}
        >
        <div style={getModalStyle()} className={styles.paper}>
            <Paper className={styles.root} elevation={1}>
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <div className={styles.paper}>
                            <GridList cellHeight={160} className={styles.gridList} cols={3}>
                                <GridListTile cols={3 || 1}>
                                    <img src={_.get(data,'images.standard_resolution.url','')} alt={"test"} />
                                </GridListTile>
                            </GridList>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={8}>
                            <Grid item xs={2}>
                            <Avatar alt="username" src={_.get(data,'user.profile_picture','')} styles={{margin:10}} />
                            </Grid>
                            <Grid item xs={10}>
                            <Typography>
                            {_.get(data,'user.username','')}
                            </Typography>
                            </Grid>
                        </Grid>
                        <Divider light/>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <Typography>
                                    {_.get(data,'caption','NO Captions')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    {_.get(data,'tags','#No tags')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <List component="nav">
                                {/* {_.map(comments,"text",(text)=>{<ListItem children={text}/>})}  */}
                                </List>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                {_.get(data,'likes.count','NO Captions')+" likes"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Input type="text" placeholder="Add to comments" />
                                <Button variant="contained" color="primary">Add</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

        </div>
        </Modal>
      </div>
    );
  }
}