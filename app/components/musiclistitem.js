import React from 'react';
import './musiclistitem.less';
import Pubsub from 'Pubsub-js';

class MusicListItem extends React.Component{
	playerMusic(musicItem) {
		Pubsub.publish('PLAYER_MUSIC', musicItem);
	};

	deleteMusic(musicItem, e) {
		//阻止事件冒泡
		e.stopPropagation();
		Pubsub.publish('DELETE_MUSIC', musicItem)
	};

	render() {
		let musicItem = this.props.musicItem;
		return (
			<li onClick={this.playerMusic.bind(this, musicItem)} className={`components-listitem row${this.props.focus ? ' focus' : ''}`}>
				<p><strong>{musicItem.title} </strong> - {musicItem.artist} </p>
				<p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
			</li>
			)
	}
}

export default MusicListItem;