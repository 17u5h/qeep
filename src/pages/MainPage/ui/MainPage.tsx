import React from 'react';
import cls from './MainPage.module.css'
import {DragNDropTable} from "../../../widgets/DragNDropTable";

const MainPage = () => {
	return (
		<div className={cls.pageWrapper}>
			<div className={cls.pageContainer}>
				<DragNDropTable/>
			</div>
		</div>
	);
};

export default MainPage;