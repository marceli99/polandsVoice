import React, {useEffect} from "react";
import {PartiesColors} from "../../PartiesData";

const d3ParliamentChart = require('../../vendor/d3-parliament-chart');
const d3 = require('d3');

export function ParliamentChart({mandates}: { mandates: Record<string, any> }) {
    const loadParliamentSeats = () => {
        let data;
        if (mandates.size === 0) {
            data = [{seats: 460, color: PartiesColors['Unknown']}];
        } else {
            data = [...mandates.values()];
        }

        if (d3.select("#parliament_seats").node().children[0] !== undefined) {
            d3.select("#parliament_seats").node().children[0].remove();
        }

        d3.select("#parliament_seats").append('g').call(
            d3ParliamentChart.default()
                .width(1500)
                .aggregatedData(data)
                .sections(1)
                .sectionGap(0)
                .seatRadius(12)
                .rowHeight(60)
                .debug(false)
        );

        let parliamentParties = document.querySelectorAll('.parliament-party');
        let parliamentChartText = document.getElementById('parliament-chart-text');
        parliamentParties.forEach(item => {
            item.addEventListener('mouseover', event => {
                parliamentParties.forEach(e => {
                    e.classList.add('transparency');
                });

                item.classList.remove('transparency');
                item.classList.add('hover');

                if (parliamentChartText) {
                    let count = item.getAttribute('count');
                    if (count) parliamentChartText.textContent = count;
                }
            });

            item.addEventListener('mouseout', event => {
                parliamentParties.forEach(e => {
                    e.classList.remove('transparency');
                });

                item.classList.remove('hover');
                if (parliamentChartText) {
                    parliamentChartText.textContent = '460';
                }
            });
        });
    };

    useEffect(() => {
        loadParliamentSeats();
    }, [loadParliamentSeats]);

    return (
        <svg id='parliament_seats' className='ParliamentChart' viewBox="0 0 1500 750"
             preserveAspectRatio="xMinYMin slice"/>
    );
}
