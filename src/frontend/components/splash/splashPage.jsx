import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../nav/navbar';
import butler from "../../../images/Mintrello-Butler.gif";
import splashImageOne from '../../../images/splashfiller1.png';
import splashImageTwo from '../../../images/splashfiller2.png';
import butlerPocket from '../../../images/buter-pocket.jpg';


class SplashPage extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {

    return (
      <div className='splash-page-container'>
        <header><Navbar/></header>
        <img className ='butler-gif' src={butler} alt="The Butler is missing :O" />

        <div className='splash-page-main-words'>
          <h1>Mintrello</h1>
          <p>The sweet Kanban board for creating, tracking, and finishing tasks</p>
          <ul className='start-buttons-container'>
            <li><button>Recipe Tutorial</button></li>
            <li><button>Get Started</button></li>
          </ul>
        </div>
        <ul className='splash-page-body'>
          <li>
            <h1>Track
              <br />
              <p>dsfbkjlsghjshgjghjkdg</p>
            </h1>
            
            <img src={splashImageOne} alt="I'm missing :O" />
          </li>
          <li>
          <h1>Complete
            <br />
              <p>dsfbkjlsghjshgjghjkdg</p>
          </h1>
          <img src={splashImageTwo} alt="I'm missing :O" />


          </li>
          <li>
          <h1>Take anywhere
            <br />
              <p>With Mintrello you can </p>
          </h1>
          <img className='butler-pocket' src={butlerPocket} alt="I'm missing :O" />


          </li>
        </ul>
        {/* <div className='second-test-footer'>
          Whipped up by



        </div> */}




        <footer>
          Whipped up by: ADD NAMES HERE
        </footer>
      </div>
    )

  }


  

};


export default SplashPage;



