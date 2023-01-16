import React, {useEffect} from "react";
import {PartiesColors, PartiesData} from "../../PartiesData";
const d3 = require('d3');

export function SeatsBarChart({mandates}: { mandates: Record<string, any> }) {
    useEffect(() => {
        let parties;// = PartiesData();
        //KO: {seats: 134, color: '#FCA241'}

        if (mandates.size === 0) {
            parties = [{seats: 460, color: PartiesColors['Unknown']}];
        } else {
            parties = [...mandates.values()];
        }

        let height = 22, heightOffset = height - 2, percentage = 0;

        let seatsData = Object.values(parties).map(p => p.seats);
        let colorsData = Object.values(parties).map(p => p.color);

        let total = d3.sum(seatsData);

        const chart = d3.select('#bar_chart')
            .attr('width', '80%')
            .attr('height', height + heightOffset);

        if (chart.node().children.length > 0) {
            chart.node().replaceChildren();
        }

        const bar = chart.selectAll('g')
            .data(seatsData)
            .enter().append('g');

        bar.append('rect')
            .attr('width', (d: any) => ((d / total) * 100) + '%')
            .attr('x', (d: any) => {
                let prevPercentage = percentage;
                percentage = percentage + 100 * (d / total);
                return prevPercentage + '%';
            })
            .attr('y', heightOffset)
            .attr('height', height)
            .attr('fill', (d: any, i: number) => colorsData[i])
            .attr('index', (d: any, i: number) => i)
            .on('mouseenter', function () {
                // @ts-ignore
                d3.select(this).attr('fill', () => d3.rgb(colorsData[d3.select(this).attr('index')]).brighter(0.3));
            })
            .on('mouseleave', function () {
                // @ts-ignore
                d3.select(this).attr('fill', () => colorsData[d3.select(this).attr('index')]);
            });

        // Create vertical dividers
        chart.append('line')
            .style('stroke-dasharray', ('2,2'))
            .style('stroke', '#040404')
            .attr('x1', '50%')
            .attr('y1', heightOffset)
            .attr('x2', '50%')
            .attr('y2', height + heightOffset);

        chart.append('line')
            .style('stroke-dasharray', ('2,2'))
            .style('stroke', '#040404')
            .attr('x1', '60%')
            .attr('y1', heightOffset)
            .attr('x2', '60%')
            .attr('y2', height + heightOffset);

        chart.append('line')
            .style('stroke-dasharray', ('2,2'))
            .style('stroke', '#040404')
            .attr('x1', '66.7%')
            .attr('y1', heightOffset)
            .attr('x2', '66.7%')
            .attr('y2', height + heightOffset);

        chart.append('text')
            .attr('x', '50%')
            .attr('y', height - 4)
            .attr('font-size', 8)
            .text('230')
            .style("text-anchor", "middle");

        chart.append('text')
            .attr('x', '60%')
            .attr('y', height - 4)
            .attr('font-size', 8)
            .text('276')
            .style("text-anchor", "middle");

        chart.append('text')
            .attr('x', '66.7%')
            .attr('y', height - 4)
            .attr('font-size', 8)
            .text('307')
            .style("text-anchor", "middle");
    }, [mandates]);

    return <svg className='SeatsBarChart' id="bar_chart"/>;
}