import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../img/ben-leeds-logo.png';
import styles from './MakeReadyPage.module.css';
import Button from '../../components/UI/ButtonCustom/Button';
import {
  buildingsEndpoint,
  currentUserEndpoint,
  reportsEndpoint,
  getReport,
  updateQuestion,
  roomsEndpoint
} from '../../services/http';

class MakeReadyPage extends Component {
  state = {};
  async componentDidMount() {
    const token = localStorage.getItem('token');

    const { data: resRooms } = await axios.get(roomsEndpoint + '?sort=name', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    this.setState({ rooms: resRooms.data });
    console.log(resRooms);
  }
  handleLinks = name => {
    console.log(name);
    this.props.history.push(`/room/${this.props.match.params.id}/${name}`);
  };
  handleBackButton = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/new`);
  };
  handleForwardButton = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/${id}/workorder`);
  };
  render() {
    return (
      <div className={styles.Profile}>
        <img src={logo}></img>
        <div className={styles.NavigationButtons}>
          {' '}
          <Button click={this.handleBackButton} color='warning m-1'>
            Back
          </Button>{' '}
          <Button click={this.handleForwardButton} color='primary m-1'>
            Forward
          </Button>{' '}
        </div>
        <div className='row'>
          {this.state.rooms
            ? this.state.rooms.map(room => (
                <div key={room._id} className='col-4 p-3'>
                  <div className='card mb-3 text-center'>
                    <Link
                      className='links'
                      onClick={() => this.handleLinks(room.name)}
                      // to="null"
                    >
                      <img
                        className={styles.Card}
                        src={
                          process.env.REACT_APP_API_URL +
                          '/uploads/' +
                          room.photo
                        }
                        alt='Card image cap'
                      />
                      <div className='card-footer text-center'>
                        {room.properName}
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
export default MakeReadyPage;
