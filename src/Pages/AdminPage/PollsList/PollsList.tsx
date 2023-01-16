import React, {useMemo} from 'react';
import EditIcon from '../../../assets/icons/edit-3.svg';
import DeleteIcon from '../../../assets/icons/trash-2.svg';
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import './PollsList.css';
import axios from "axios";

type Poll = {
    id: number,
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

export function PollsList({data, fetchData}: { data: Array<Poll>, fetchData: Function}) {
    const columnHelper = createColumnHelper<any>();

    const deletePost = (id: any) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Are you sure you want to delete this poll?')) {
            return;
        }

        axios.delete(`http://localhost:3001/poll/${id}`).then(() => {
            window.location.reload();
        });
    }

    const columns = useMemo(() => [
        columnHelper.accessor('company', {
            cell: info => info.getValue(),
            header: 'Company name',
            id: 'company'
        }),
        columnHelper.accessor('sample', {
            cell: info => info.getValue(),
            header: 'Sample',
            id: 'sample'
        }),
        columnHelper.accessor('method', {
            cell: info => info.getValue(),
            header: 'Poll methodology',
            id: 'method'
        }),
        columnHelper.accessor('date', {
            cell: info => info.getValue(),
            header: 'Date',
            id: 'date'
        }),
        columnHelper.accessor('popularity', {
            cell: info => info.getValue(),
            header: 'Results',
            id: 'popularity'
        }),
        columnHelper.display({
           cell: props =>
               <div className='Actions'>
                   <a className='Action' href={`/edit_poll/${props.row.original.id}`}>
                       <img src={EditIcon} alt=''/>
                       Edit
                   </a>
                   <a className='Action' href='#' onClick={() => deletePost(props.row.original.id)}>
                       <img src={DeleteIcon} alt=''/>
                       Delete
                   </a>
               </div>,
           header: 'Actions',
           id: 'actions'
        }),
    ], [columnHelper]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className="PollsList">
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
                        <td key={cell.id}>
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
