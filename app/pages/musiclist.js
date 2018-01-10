import React from 'react';
import MusiListItem from '../components/musiclistitem';

class Musiclist extends React.Component{
	render() {
		let listEle = null;
		listEle=this.props.musicList.map((Item) => {
			return (
				<MusiListItem
					focus={Item === this.props.currentMusicItem}
					key={Item.id}
					musicItem={Item}
				>
					{Item.title} 
				</MusiListItem>
			);
		});

		return (
			<ul>
				{ listEle }
			</ul>
			)
	}
}

export default Musiclist;

