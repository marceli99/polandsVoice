import React, {useMemo} from 'react';
import './PollsTable.css';
import {Cell, createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import pisLogo from '../../../assets/images/logo_pis.png';
import koLogo from '../../../assets/images/logo_ko.png';
import kpLogo from '../../../assets/images/logo_kp.png';
import lewLogo from '../../../assets/images/logo_lew.png';
import p2050Logo from '../../../assets/images/logo_2050.png';
import konfLogo from '../../../assets/images/logo_konf.png';
import {PartiesColors} from "../../../PartiesData";

const d3 = require('d3');

type Poll = {
    company: string,
    sample: string,
    method: string,
    date: string,
    PIS: number,
    KO: number,
    LEW: number,
    P2050: number,
    KONF: number,
    PSL: number,
    highest: string
}

export function PollsTable({data}: { data: Array<Poll> }) {
    const colors: any = PartiesColors;

    const columnHelper = createColumnHelper<any>();

    const isHighestValueCell = (cell: Cell<Poll, unknown>) => {
        return cell.row.original.highest === cell.column.id;
    }

    const columns = useMemo(() => [
        columnHelper.accessor('company', {
            cell: info => info.getValue(),
            header: '',
            id: 'company'
        }),
        columnHelper.accessor('sample', {
            cell: info => info.getValue(),
            header: '',
            id: 'sample'
        }),
        columnHelper.accessor('method', {
            cell: info => info.getValue(),
            header: '',
            id: 'method'
        }),
        columnHelper.accessor('date', {
            cell: info => info.getValue(),
            header: '',
            id: 'date'
        }),
        columnHelper.accessor('PIS', {
            header: () => <div className='PartyThread'>
                <img src={pisLogo} alt='PIS'/>
                <span style={{backgroundColor: colors['PIS']}}/>
            </div>,
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('KO', {
            header: () => <div className='PartyThread'>
                <img src={koLogo} alt='KO'/>
                <span style={{backgroundColor: colors['KO']}}/>
            </div>,
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('LEW', {
            header: () => <div className='PartyThread'>
                <img src={lewLogo} alt='Lew'/>
                <span style={{backgroundColor: colors['LEW']}}/>
            </div>,
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('P2050', {
            header: () => <div className='PartyThread'>
                <img src={p2050Logo} alt='P2050'/>
                <span style={{backgroundColor: colors['P2050']}}/>
            </div>,
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('KONF', {
            header: () => <div className='PartyThread'>
                <img src={konfLogo} alt='Konf'/>
                <span style={{backgroundColor: colors['KONF']}}/>
            </div>,
            cell: info => info.renderValue(),
        }),
        columnHelper.accessor('PSL', {
            header: () => <div className='PartyThread'>
                <img src={kpLogo} alt='KP'/>
                <span style={{backgroundColor: colors['PSL']}}/>
            </div>,
            cell: info => info.renderValue(),
        }),
    ], [colors, columnHelper]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className="PollsTable">
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}
                            style={{backgroundColor: isHighestValueCell(cell) ? d3.rgb(colors[cell.column.id.toUpperCase()]).brighter(1).copy({opacity: 0.2}) : ''}}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
            <tfoot>
            {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                    {footerGroup.headers.map(header => (
                        <th key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.footer,
                                    header.getContext()
                                )}
                        </th>
                    ))}
                </tr>
            ))}
            </tfoot>
        </table>
    );
}