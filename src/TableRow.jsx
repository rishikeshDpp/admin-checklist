import { useEffect, useRef, useState } from 'react'
import TrashIcon from '../public/icons/trash-icon'
import EditIcon from '../public/icons/edit-icon'
import SaveIcon from '../public/icons/save-icon'

export default function TableRow({ user, updateSelectedIds, selectedIds, deleteRow, updateRowInformation, isPageChecked }) {

  const [isChecked, setIsChecked] = useState(false)
  const [editable, setEditable] = useState(false)

  const tempUser = useRef({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  })

  useEffect(()=>{
    if(selectedIds.current.includes(user.id)) setIsChecked(true)
    else setIsChecked(false)
  },[user.id])

  useEffect(()=>{
    if(isPageChecked) setIsChecked(true)
    if(!isPageChecked) setIsChecked(false)
  },[isPageChecked])

  function handleInputChecked(eventId) {
    updateSelectedIds(eventId, selectedIds)
    setIsChecked(!isChecked)
  }
  
  function handleNameChange(eventInput) {
    if(eventInput === '') tempUser.current.name = user.name
    else tempUser.current.name = eventInput
  }

  function handleEmailChange(eventInput) {
    if(eventInput === '') tempUser.current.email = user.email
    else tempUser.current.email = eventInput
  }

  function handleRoleChange(eventInput) {
    if(eventInput === '') tempUser.current.role = user.role
    else tempUser.current.role = eventInput
  }

  function deleteRowLocal() {
    deleteRow(user.id)
  }

  function editRow() {
    setEditable(true)
  }

  function saveRow() {
    if(tempUser.current.name === user.name && tempUser.current.email === user.email && tempUser.current.role === user.role) setEditable(false);
    else {
      updateRowInformation(tempUser)
      setEditable(false)
    }
  }

  return (
    <tr className={isChecked ? 'bg-gray-900' : ''}>
        <td className="p-4 w-4">
          <div className="flex items-center">
              <input id={user.id} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => handleInputChecked(e.target.id)}
                checked={isChecked}
              />
              <label htmlFor={user.id} className="sr-only">checkbox</label>
          </div>
        </td>

        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white overflow-x-clip">
          {
            editable ? 
            <input placeholder={user.name} onChange={(e)=>handleNameChange(e.target.value)} className='w-max px-1 rounded-sm overflow-clip' type="text" />
            :
            user.name
          }
        </td>

        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white overflow-x-clip">
          {
            editable ? 
            <input placeholder={user.email} onChange={(e)=>handleEmailChange(e.target.value)} className='w-max px-1 rounded-sm overflow-clip' type="text" />
            :
            user.email
          }
        </td>

        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white overflow-x-clip">
          {
            editable ? 
            <input placeholder={user.role} onChange={(e)=>handleRoleChange(e.target.value)} className='w-20 px-1 rounded-sm overflow-clip' type="text" />
            :
            user.role
          }
        </td>

        <td className="py-4 px-6 text-sm font-medium whitespace-nowrap flex justify-start items-center overflow-x-clip">
          {
            editable ?
            <button onClick={saveRow} className="text-blue-600 dark:text-blue-500 hover:underline mr-5 save">
              <SaveIcon styles={'w-4 fill-white hover:fill-blue-400 transition-colors'} />
            </button>
            :
            <button onClick={editRow} className="text-blue-600 dark:text-blue-500 hover:underline mr-4 edit">
              <EditIcon styles={'w-5 fill-white hover:fill-blue-400 transition-colors'} />
            </button>
          }
          <button onClick={deleteRowLocal} className="text-blue-600 dark:text-blue-500 hover:underline delete">
            <TrashIcon styles={'w-5 fill-white hover:fill-blue-400 transition-colors'} />
          </button>
        </td>
    </tr>
  )
}