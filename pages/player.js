import React from 'react';
import Progress from '../app/components/Progress';
import  './player.less';

let duration = null;
class Player extends React.Component {
	constructor() {
	    super();
	    this.state = {
	      progress: '-'
	    };
    }
	componentDidMount () {
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
				
				<Progress progress={this.state.progress} 
						  onProgressChange={this.progressChangeHandle}
				>
				</Progress>
			</div>	
		);
	}
}

export default Player;