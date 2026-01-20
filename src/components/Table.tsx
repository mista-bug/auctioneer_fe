import { Ellipsis } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type PaginationState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

interface ITable {
    data: any[];
    columns: ColumnDef<any>[];
    isLoading?: boolean; // Accept loading state from parent
}

const Table: React.FC<ITable> = ({ data, columns, isLoading: externalLoading }) => {
    
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 7,
    });

    const [internalLoading, setInternalLoading] = useState(true);
    const isLoading = externalLoading ?? internalLoading;
    
    const table = useReactTable({
        columns,
        data, 
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setInternalLoading(false);
        }, 2000);
    
        return () => clearTimeout(timer);
    }, []);


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 p-8 w-full h-full">
                <div className="w-20 h-20 border-4 border-neutral-600 border-t-neutral-300 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 p-8 w-full h-full">
                <p className="text-neutral-400 text-lg">No data available</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg p-5 w-full h-full flex flex-col justify-between items-center">
            <table className="w-full rounded-lg bg-background-quaternary">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr className="border-b border-neutral-600" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none text-neutral-400'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            {{
                                                asc: ' ^',
                                                desc: ' v',
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr
                                className="p-3 text-center "
                                key={row.id}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td className="overflow-hidden text-ellipsis text-neutral-50 p-3" key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="h-2 flex" />
            <div className="flex items-center justify-center gap-2">
                <Button variant="tertiary" onClick={() => { table.firstPage() }} isDisabled={!table.getCanPreviousPage()}> {'<<'} </Button>
                <Button variant="tertiary" onClick={() => { table.previousPage() }} isDisabled={!table.getCanPreviousPage()}> {'<'} </Button>
                <Button variant="tertiary" onClick={() => { table.nextPage() }} isDisabled={!table.getCanNextPage()}> {'>'} </Button>
                <Button variant="tertiary" onClick={() => { table.lastPage() }} isDisabled={!table.getCanNextPage()}> {'>>'} </Button>
        
                <span className="flex items-center gap-1">
                    <p className="text-white">
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </p>
                </span>
            </div>
        </div>
    );
}

export default Table;