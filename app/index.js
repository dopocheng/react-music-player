import React from 'react';
import {render} from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';

render(
	<AppContainer>	
 		<Root />
  	</AppContainer>,
	document.getElementById('root')
);

//热更新
if (module.hot) {
	module.hot.accept('./root', () =>{
		const NewHello = require('./root').default;
		render(
			<AppContainer>	
				<Root />
	 		</AppContainer>,
	 		document.getElementById('root'),
		);
	});
}
//热更新
// if (module.hot) {  
//     module.hot.accept()  
// } 
