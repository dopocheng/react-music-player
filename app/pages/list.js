import React from 'react';
import MusiListItem from '../components/musiclistitem';
import { MUSIC_LIST } from '../config/musiclist';

let listEle;

class Musiclist extends React.Component{

	ListMap(){
		// console.error("list 接受rootmusicList ListMap " + this.props.musicList)

		listEle = this.props.musicList.map((item) => {
			//console.error(item.title);

			return (
				<MusiListItem
					key={item.id}
					musicItem={item}
					focus={this.props.currentMusicItem === item}
				>
					{item.title} 
				</MusiListItem>
			);
		});

		//console.error("listEle hahhahah")
	}

	render() {
		this.ListMap();
//		console.error("render**** listEle"+listEle)

		return (
			<ul>
				{ listEle }
			</ul>
		)
	}
}

export default Musiclist;

