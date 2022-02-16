import {Button, Modal} from "react-bootstrap";
import React from 'react';

export const InstallKaikas = () => {
	return (
		<Modal style={{ color: '#3A2A17', padding: '30px 30px', fontSize: '15px', backgroundColor: '#FFFDD0' }}>
			<div>
				<p> Haven't installed Kaikas wallet yet? </p>
				<p> Install Kaikas first to join dutch auction. </p>
			</div>
		</Modal>
	);
};