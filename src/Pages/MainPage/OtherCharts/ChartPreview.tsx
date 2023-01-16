import externalLink from '../../../assets/icons/external-link.svg';
import './ChartPreview.css';
import React, {ReactElement} from "react";

export function ChartPreview({title, chart}: { title: string, chart: ReactElement }) {
    return (
        <div className="ChartPreview">
            <h5>{title}</h5>
            {chart}
            <div className='Info'>
                <span>By Kantar Public</span>
                <span>13.03.2021</span>
            </div>
            <a className='ExternalLink' href="#">
                <img src={externalLink}/>
            </a>
        </div>
    );
}