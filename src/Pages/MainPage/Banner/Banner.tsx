import React from "react";
import './Banner.css';
import {BorderedButton} from "../../../BorderedButton";

export function Banner() {
    return (
        <div className='Banner'>
            <h1>Check last<br/>elections</h1>
            <BorderedButton text={'View results'}/>
        </div>
    );
}