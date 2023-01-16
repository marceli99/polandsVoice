const PartiesData = () => {
    return {
        'LEW': {seats: 49, color: '#AC145A'},
        'KO': {seats: 134, color: '#FCA241'},
        'MN': {seats: 1, color: '#0780C4'},
        'PSL': {seats: 30, color: '#1BB100'},
        'KONF': {seats: 11, color: '#122948'},
        'PIS': {seats: 235, color: '#073A76'},
    }
}

const PartiesColors: { [Identifier: string]: string } = {
    'LEW': '#AC145A',
    'KO': '#FCA241',
    'MN': '#0780C4',
    'PSL': '#1BB100',
    'KONF': '#122948',
    'P2050': '#E4A80A',
    'PIS': '#073A76',
    'Unknown': '#9f9f9f'
};

const PartyDisplayOrder = ['PIS', 'KONF', 'K15', 'AU', 'P', 'PSL', 'P2050', 'KO', 'LEW'];

export {PartiesData, PartiesColors, PartyDisplayOrder};
