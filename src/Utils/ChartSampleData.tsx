export class ChartSampleData {
    getDataByIndex = (values: Array<number>) => {
        return values.map((value, index) => {
            return [index, value];
        });
    };

    pieData = {
        options: {
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            }
        },
        series: [Math.random() * 45, Math.random() * 40, Math.random() * 30, Math.random() * 25, Math.random() * 15]
    };

    barData = {
        series: [
            {
                name: 'A',
                data: this.getDataByIndex(Array.from({length: 10}, () => Math.random()))
            },
            {
                name: 'B',
                data: this.getDataByIndex(Array.from({length: 10}, () => Math.random()))
            },
            {
                name: 'C',
                data: this.getDataByIndex(Array.from({length: 10}, () => Math.random()))
            }
        ],
        options: {
            chart: {
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                axisTicks: {
                    show: false
                },
                labels: {
                    show: false
                }
            },
            yaxis: {
                show: false
            },
            grid: {
                show: false,
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            }
        }
    }

    areaData = {
        series: [
            {
                name: 'A',
                data: this.getDataByIndex(Array.from({length: 10}, () => Math.random()))
            },
            {
                name: 'B',
                data: this.getDataByIndex(Array.from({length: 10}, () => Math.random()))
            },
            {
                name: 'C',
                data: this.getDataByIndex(Array.from({length: 10}, () => Math.random()))
            }
        ],
        options: {
            xaxis: {
                labels: {
                    show: false
                }
            },
            yaxis: {
                show: false
            },
            grid: {
                show: false
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            chart: {
                toolbar: {
                    show: false
                }
            },
            fill: {
                type: 'solid',
                opacity: 0,
            }
        }
    }
}