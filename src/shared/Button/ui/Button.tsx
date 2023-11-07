import React from 'react';
import cls from './Button.module.css'

type ButtonProps = {
	children: string
	onClick: () => void
}

const Button = ({children, onClick}: ButtonProps) => {
	return (
		<div className={cls.button} onClick={onClick}>
			{children}
		</div>
	);
};

export default Button;