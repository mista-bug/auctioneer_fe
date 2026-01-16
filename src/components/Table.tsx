import { Button } from "@heroui/react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type PaginationState } from "@tanstack/react-table";
import React from "react";

interface ITable {
    data:any[],
    columns:ColumnDef<any>[];
}

const Table:React.FC<ITable> = ({data,columns}) => {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
      });
    
      const table = useReactTable({
        columns,
        data, 
        debugTable:true,
        getCoreRowModel:getCoreRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        onPaginationChange:setPagination,
        state:{
          pagination,
        },
      });

      return (
        <div className="silly_card_inner border border-neutral-700 rounded-lg p-5 w-full h-full">
          <table className=" w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none text-white font-semibold'
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
                          {/* {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null} */}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row,index) => {
              
                return (
                  <tr
                    className={`p-3 text-center border-b border-b-neutral-700`}
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
            <Button onClick={() => { table.firstPage() }} isDisabled={!table.getCanPreviousPage()} value="<<" />
            <Button onClick={() => { table.previousPage() }} isDisabled={!table.getCanPreviousPage()} value="<" />
            <Button onClick={() => { table.nextPage() }} isDisabled={!table.getCanNextPage()} value=">" />
            <Button onClick={() => { table.lastPage() }} isDisabled={!table.getCanNextPage()} value=">>" />
    
            <span className="flex items-center gap-1">
              {/* <div>Page</div> */}
              <p className="text-white">
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
              </p>
            </span>
            {/* <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span> */}
            {/* <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select> */}
          </div>
          {/* <div>
            Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
            {table.getRowCount().toLocaleString()} Rows
          </div> */}
          {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
        </div>
      )
}

export default Table;

// export default function SillyArtTable({data,columns} : {data:any[], columns:ColumnDef<any>[]}) {
//   const [pagination, setPagination] = React.useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 5,
//   });

//   const table = useReactTable({
//     columns,
//     data, 
//     debugTable:true,
//     getCoreRowModel:getCoreRowModel(),
//     getSortedRowModel:getSortedRowModel(),
//     getFilteredRowModel:getFilteredRowModel(),
//     getPaginationRowModel:getPaginationRowModel(),
//     onPaginationChange:setPagination,
//     state:{
//       pagination,
//     },
//   });

  

// }