import React from 'react';
import Progress from '../components/Progress';
import  './player.less';

let duration = null;
class Player extends React.Component {
	constructor() {
	    super();
	    this.state = {
	      progress: '0',
	      volume: '0',
	      isPlay: false
	    };
    }
	componentDidMount () {
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;				
			this.setState({
				//获取播放时间
				//progress: Math.round(e.jPlayer.status.currentTime)
				//获取播放进度条
				progress: e.jPlayer.status.currentPercentAbsolute,
				volume: e.jPlayer.options.volume * 100
			});
		});
		console.log("11111111");
	}
	componentWillUnmount() {
		$('#player').unbind($.jPlayer.event.timeupdate)
	}
	progressChangeHandle (progress) {
		$('#player').jPlayer('play', duration * progress);
		this.setState({
			isPlay: true
		})
	}
	changeVolumHander (progress) {
		$('#player').jPlayer('volume', progress);
	}
	//播放方法
	play() {
		if (this.state.isPlay) {
			console.log("****play****"+this.state.isPlay);
			$('#player').jPlayer('pause');
		}else{
			$('#player').jPlayer('play');
		}
		this.setState ({
			isPlay: !this.state.isPlay
		})
	}
 	render() {
		return (
            <div className="player-page">
                <h1 className="caption">我的私人音乐坊 &gt;</h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-2:00</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					                <Progress
					                	progress={this.state.volume}
					                	onProgressChange={this.changeVolumHander}
					                	cuprogress="green"
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
			                <Progress
								progress={this.state.progress}
								onProgressChange={this.progressChangeHandle.bind(this)}
			                >
			                </Progress>
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev"></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play.bind(this)}></i>
	                			<i className="icon next ml20"></i>
                			</div>
                			<div className="-col-auto">
                				<i className={`icon repeat-${this.props.repeatType}`}></i>
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                	</div>
                </div>
            </div>
        );
	}
}

export default Player;