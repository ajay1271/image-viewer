import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import tileData from './tileData';

import './profile.css'
import { ImageModal } from './ImageModal';

export default class ImageSection extends Component{
state={
  open: false
}
handleModalOpen = () =>{
  this.setState({open:true})
}
handleModalClose = () =>{
  this.setState({open:false})
}
    render(){
        const styles = theme => ({
            root: {
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
              backgroundColor: theme.palette.background.paper,
            },
            gridList: {
              width: 500,
              height: 450,
            },
          });
          return (
            <div className={styles.root}>
              <GridList cellHeight={160} className={styles.gridList} rowws={300} cols={3}>
                  <GridListTile key={this.props.data.id} cols={3 || 1}>
                    <img src={this.props.data.images.standard_resolution.url}
                     height={this.props.data.images.height} 
                     width={this.props.data.images.width} 
                     alt={"test"} 
                     onClick={this.handleModalOpen}/>
                  </GridListTile>
              
              </GridList>
              <ImageModal data={this.props.data} open={this.state.open} handleClose={this.handleModalClose}/>
            </div>
          );
    }
}
