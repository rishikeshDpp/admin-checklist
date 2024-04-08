import TableRow from './TableRow'
import { useState, useMemo, useEffect } from 'react'
import Pagination from './pagination/pagination'

let PageSize = 10;

function DataTable(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [isPageChecked, setIsPageChecked] = useState(false);

    /** Calculates Pagination */
    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return props.displayList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, props.displayList, props.originalList]);

    function handleMultipleInputChecked() {
        props.updateMultipleSelectedIds(currentTableData, props.selectedIds, isPageChecked)
        setIsPageChecked(!isPageChecked)
    }

    function areAllRowsChecked() {
        let checked = currentTableData.every(record => (props.selectedIds.current.includes(record.id)) )
        setIsPageChecked(checked)
    }

    useEffect(()=>{
        areAllRowsChecked()
    },[currentPage])

    return (
    <div className='shadow-md rounded-lg overflow-clip'>
        <table className="w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={handleMultipleInputChecked}
                                checked={isPageChecked}
                            />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" className="w-[30%] overflow-x-clip py-3 px-6 text-xs font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Name
                    </th>
                    <th scope="col" className="w-[30%] overflow-x-clip py-3 px-6 text-xs font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Email
                    </th>
                    <th scope="col" className="w-[20%] overflow-x-clip py-3 px-6 text-xs font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Role
                    </th>
                    <th scope="col" className="w-[15%] overflow-x-clip py-3 px-6 text-xs font-bold tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {
                    currentTableData.map((user, index) => 
                    <TableRow 
                        user={user}
                        key={index}
                        updateSelectedIds={props.updateSelectedIds}
                        selectedIds={props.selectedIds}
                        deleteRow={props.deleteRow}
                        updateRowInformation={props.updateRowInformation}
                        isPageChecked={isPageChecked}
                    />)
                }
            </tbody>
        </table>
        
        <div className='flex justify-between items-center bg-white'>
            <button className='bg-blue-500 hover:bg-blue-400 transition-colors text-sm mx-4 my-2 rounded-md px-4 py-2 shadow-lg'
                onClick={props.deleteSelectedRows}
            >
                Delete&nbsp;Selected
            </button>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={props.displayList.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    </div>

  )
}

export default DataTable