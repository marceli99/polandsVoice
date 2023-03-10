import getParliamentPoints from './chart-helpers';
import debugGuides from './debug';

/**
 *  ___ ____    ___          _ _                    _       ___ _             _
 * |   \__ /   | _ \__ _ _ _| (_)__ _ _ __  ___ _ _| |_    / __| |_  __ _ _ _| |_
 * | |) |_ \   |  _/ _` | '_| | / _` | '  \/ -_) ' \  _|  | (__| ' \/ _` | '_|  _|
 * |___/___/   |_| \__,_|_| |_|_\__,_|_|_|_\___|_||_\__|   \___|_||_\__,_|_|  \__|
 *
 * A d3 plugin for making semi-circle parliament charts.
 *
 * MIT License
 *
 * Copyright (c) 2021 Daniel Kao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

export default (data = [], width = 0) => {
    // Dimensions of the graphic
    let graphicWidth = parseFloat(width);

    // clean out any x and y values provided in data objects.
    let rawData = data.map(({ x, y, ...restProps }) => restProps);

    let partiesData = [];

    // visual options
    const options = {
        sections: 4,         // Number of sections to divide the half circle into
        sectionGap: 60,      // The gap of the aisle between sections
        seatRadius: 12,      // The radius of each seat
        rowHeight: 42,       // The height of each row
    };

    // Whether we should draw the debug lines or not
    let debug = false;

    // //////////////////////////////////////////////////////////////////////////
    // Selection call
    //
    // This function gets called on instances such as:
    //    d3.select('g').call(parliamentChart())
    const parliamentChart = (selection) => {
        if (graphicWidth === 0) {
            // Sets the graphicWidth based on our selected container
            graphicWidth = selection.node().getBoundingClientRect().width;
        }

        // Get the processed data (filter for entries that have x and y locations)
        const processedData = parliamentChart.data().filter((r) => r.x && r.y);

        // Remove existing chart
        selection.select('g.parliament-chart').remove();

        // Add new chart
        const innerSelection = selection
            .append('g')
            .attr('class', 'parliament-chart');

        // First remove any existing debug lines
        innerSelection.select('g.debug').remove();

        // Append debug lines
        // if (debug) debugGuides(innerSelection, graphicWidth, options, processedData.length);

        let groups = [];
        let index = 0;
        for (let party of partiesData) {
            groups.push(rawData.slice(index, index + party.seats));
            index = index + party.seats;
        }

        for (let group of groups) {
            const groupSelection = innerSelection
                .append('g')
                .attr('class', 'parliament-party')
                .attr('count', group.length);

            groupSelection
                .selectAll('circle')
                .data(group)
                .enter()
                .insert('circle')
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y)
                .attr('r', options.seatRadius)
                .attr('fill', (d) => d.color || '#AAA');
        }

        innerSelection.append("text")
            .attr('id', 'parliament-chart-text')
            .attr('x', '50%')
            .attr('y', '100%')
            .attr('text-anchor', 'middle')
            .text('460');

        return innerSelection;
    };

    // //////////////////////////////////////////////////////////////////////////
    // Getters and Setters

    // Sets the width and the height of the graphic
    parliamentChart.width = (w) => {
        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(w)) {
            // parse the width
            graphicWidth = parseFloat(w);
        }
        return parliamentChart;
    };

    // Create getters and setters for sections, sectionGap, seatRadius, and rowHeight
    Object.keys(options)
        .forEach((attr) => {
            parliamentChart[attr] = (s) => {
                // eslint-disable-next-line no-restricted-globals
                if (!isNaN(s)) {
                    options[attr] = parseInt(s, 10);
                    return parliamentChart;
                }
                return options[attr];
            };
        });

    // enable / disable debug mode
    parliamentChart.debug = (b) => {
        debug = !!b;
        return parliamentChart;
    };

    // //////////////////////////////////////////////////////////////////////////
    // Data Processing
    //
    // Gets the data processed data with x and y coordinates or sets
    // the raw data.
    parliamentChart.data = (d) => {
        // If an argument with new data is provided
        if (d) {
            // clean out any x and y values provided in data objects.
            rawData = d.map(({ x, y, ...restProps }) => restProps);
            return parliamentChart;
        }

        // If width is not set, don't calculate this instance
        if (graphicWidth <= 0 || rawData.length <= 0) return rawData;

        // Check if we have already run this instance
        if (rawData.every((r) => r.x && r.y)) return rawData;

        // The number of points we need to fit
        const totalPoints = rawData.length;

        // The locations of all the points
        const locations = getParliamentPoints(totalPoints, options, graphicWidth);

        // Add locations to the rawData object
        locations.forEach((coords, i) => rawData[i] = ({ ...rawData[i], ...coords }));

        // return the data
        return rawData;
    };

    // Instead of passing in an array of every single point, we pass in an array of objects
    // that each have a key `seats` that specifies the number of seats. This function can only
    // set, not get.
    parliamentChart.aggregatedData = (d) => {
        partiesData = d;

        rawData = d.reduce((acc, val) => {
            const { seats = 0, x, y, ...restProps } = val;
            return [...acc, ...Array(seats).fill(restProps)];
        }, []);

        return parliamentChart;
    };

    return parliamentChart;
}
