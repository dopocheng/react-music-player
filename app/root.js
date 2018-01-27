import React from 'react';
import { BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import { MUSIC_LIST } from './config/musiclist';
import { randomRange } from './utils/util';
import Pubsub from 'Pubsub-js';
import 'jplayer';

import Header from './components/header';
import Progress from './components/progress';
import Player from './pages/player';
import Musiclist from './pages/list';

let musiclist = require('./config/musiclist');

// class App extends React.Component{
// 	constructor(props) {
// 	    super(props);
// 	    this.state = {
// 	    	musicList: MUSIC_LIST,
// 	      currentMusicItem: MUSIC_LIST[3],
// 	      repeatType: 'cycle',
// 	    };
//     }
// }
	
class Root extends React.Component{

	constructor(props) {
	    super(props);
	    this.state = {
		    musicList: MUSIC_LIST,
		    currentMusicItem:MUSIC_LIST[0],
		    repeatType: 'cycle',
	    };
	    // this.playMusic = this.playMusic
    }

	playMusic(musicItem){				
		$('#player').jPlayer('setMedia', {
			mp3: musicItem.file
		}).jPlayer('play');		
		this.setState({
			currentMusicItem: musicItem
		})

	};
//播放上一曲
	playPrev() {
		playNext();
	}

//播放下一曲
	playNext(type = 'next') {
		console.error("****playNext*********"+ type);
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null;
		let musicListLength = this.state.musicList.length; 
		if(type === 'next') {
			newIndex = (index + 1) % musicListLength;
		}else{
			newIndex = (index - 1 + musicListLength) % musicListLength;
		}

		this.playMusic(this.state.musicList[newIndex]);
	};

//歌曲循环方式
	playWhenEnd () {
		if (this.state.repeatType === 'random') {
			let index = this.findMusicIndex(this.state.currentMusicItem);
			let indexRand = randomRange(0, this.state.musicList.length - 1);
			while(indexRand === index) {
				indexRand = randomRange(0, this.state.musicList.length - 1);
			}
			this.playMusic(this.state.musicList[indexRand]);
		}else if (this.state.repeatType === 'once') {
			this.playMusic(this.state.currentMusicItem);
		}else {
			this.playNext();
		}
	};

//当前播放歌曲文件下标
	findMusicIndex(musicItem) {
		return this.state.musicList.indexOf(musicItem);
	};

	componentDidMount() {
		console.log("root  componentDidMount");
		$('#player').jPlayer({
			supplied: 'mp3',
			wmode: 'window'
		});

		this.playMusic(this.state.currentMusicItem);

		//播放下一曲
		$('#player').bind($.jPlayer.event.ended, (e) => {
			this.playWhenEnd();
		});
//切换循环方式
		// changeRepeat() {

		// };

		Pubsub.subscribe('PLAYER_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem);
		});

		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter(item => {
					return item !== musicItem;
				})
			})
		});

		Pubsub.subscribe('PLAYER_PREV', (msg, musicItem) => {
			this.playNext('PREV');
		});

		Pubsub.subscribe('PLAYER_NEXT', (msg, musicItem) => {
			this.playNext();
		});

		let repeatList = [
			'cycle',
			'once',
			'random'
		];

		Pubsub.subscribe('CHANAGE_REPEAT', () => {
			let index = repeatList.indexOf(this.state.repeatType);
			index = (index + 1) % repeatList.length;
			this.setState({
				repeatType: repeatList[index]
			});		
		});
	};

	componentWillUnMount(){
		Pubsub.unsubscribe('PLAYER_MUSIC');
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAYER_PREV');
		Pubsub.unsubscribe('PLAYER_NEXT');
		$('player').unbind($.jPlayer.event.ended)
	};
 
	render() {
		let This = this;
		
		const Home = () => (
      		<Player currentMusicItem={This.state.currentMusicItem} repeatType={This.state.repeatType} isPlay={This.state.playState}/>
    	);
//console.error("&&&&&&root&&&&& " +This.state.repeatType)
		const List = () => (
	      	<Musiclist
		        currentMusicItem={This.state.currentMusicItem} musicList={This.state.musicList}/>
	    );
		
		return (
			<Router>
				<section>
					<Header />
					<Route exact path="/" component={Home} />
					<Route path="/list" component={List} />
				</section>
			</Router>
		);
	}
}

export default Root;