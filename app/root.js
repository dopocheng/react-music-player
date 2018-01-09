import React from 'react';
import Header from './components/header';
import Progress from './components/Progress';
import 'jplayer';

let duration = null;
class Root extends React.Component{
	constructor() {
	    super();
	    this.state = {
	      progress: '-'
	    };
    }
	// getInitialState() {
	// 	return {
	// 		progress: '-'
	// 	}
	// }
	
	componentDidMount() {
		console.log("componentDidMount");
		$('#player').jPlayer({
			ready: function () {
				$('#player').jPlayer('setMedia', {
					mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play');
			},
			supplied: 'mp3',
			wmode: 'window'
		});
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;				
			this.setState({
				//获取播放时间
				//progress: Math.round(e.jPlayer.status.currentTime)
				//获取播放进度条
				progress: e.jPlayer.status.currentPercentAbsolute
			});
		});
		console.log("11111111");
	}
	componentWillUnmount() {
		$('#player').unbind($.jPlayer.event.timeupdate)
	}
	progressChangeHandle (progress) {
		$('#player').jPlayer('play', duration * progress);
	}
	render() {
		return (
			<div>
				<Header />
				<Progress progress={this.state.progress} 
						  onProgressChange={this.progressChangeHandle}
				>
				</Progress>
			</div>	
		);
	}
};

export default Root;