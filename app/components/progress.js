import React from "react";
import './progress.less';

class Progress extends React.Component{
	// constructor(props){
 //    	super(props);
 //    	this.onChange = this.onChange.bind(this);
 //  	}
 /*getDefaultProps(es5)方法es6语法不支持,
 	1.用static get defaultProps(){}；注意写法
 	2.用static defaultProps需要es7语法，要去loader里设置stage-0;*/
	static get defaultProps(){
		return {
			// cuprogress: '#2f9842'
			cuprogress: 'red'
		}
		
	}
	// static defaultProps={
	// 	cuprogress: '#2f9842'
	// }
	changeProgress(e) {
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		console.log("progress.js****点击事件" + progress);
		this.props.onProgressChange && this.props.onProgressChange(progress);
	} 	
	render() {
		console.log("0000000");
		return(

			<div className="components-progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
				<div className="progress" 
					 style={{
					 			width: `${this.props.progress}%`, 
					 			background: this.props.cuprogress}}>
				</div>
			</div>
			);
	}
} ;

export default Progress;