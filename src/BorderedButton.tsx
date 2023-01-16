import React, {MouseEventHandler} from "react";
import './BorderedButton.css';

interface BorderedButtonProps {
    text: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export function BorderedButton({text, className='', type='button', onClick=void 0}: BorderedButtonProps) {
    return (
        <button className={'BorderedButton ' + className} onClick={onClick} type={type}>
            <span>{text}</span>
        </button>
    );
}