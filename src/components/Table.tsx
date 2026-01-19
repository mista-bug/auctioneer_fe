import { Button } from "@heroui/react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type PaginationState } from "@tanstack/react-table";
import React from "react";

interface ITable {
    data: any[];
    columns: ColumnDef<any>[];
}

const Table: React.FC<ITable> = ({ data, columns }) => {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 7,
    });
    
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

    return (
        <div className="rounded-lg p-5 w-full h-full flex flex-col justify-between items-center">
            {data.length === 0 ? (
                //spin
                <div className="flex flex-col items-center justify-center gap-3 p-8 w-full h-full">
                    <div className="w-20 h-20 border-4 border-neutral-600 border-t-neutral-300 rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
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
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
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
                        <Button variant="ghost" onClick={() => { table.firstPage() }} isDisabled={!table.getCanPreviousPage()}> {'<<'} </Button>
                        <Button variant="ghost" onClick={() => { table.previousPage() }} isDisabled={!table.getCanPreviousPage()}> {'<'} </Button>
                        <Button variant="ghost" onClick={() => { table.nextPage() }} isDisabled={!table.getCanNextPage()}> {'>'} </Button>
                        <Button variant="ghost" onClick={() => { table.lastPage() }} isDisabled={!table.getCanNextPage()}> {'>>'} </Button>
                
                        <span className="flex items-center gap-1">
                            <p className="text-white">
                                {table.getState().pagination.pageIndex + 1} of{' '}
                                {table.getPageCount().toLocaleString()}
                            </p>
                        </span>
                    </div>
                </>
            )}
        </div>
    )
}

export default Table;