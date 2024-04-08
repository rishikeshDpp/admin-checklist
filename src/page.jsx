import { Suspense, useEffect, useRef, useState } from 'react';
import DataTable from './DataTable';
import SearchBar from "./SearchBar";
import PlaceHolderTable from './loading'

export default function Home() {

    const [originalList, setOriginalList] = useState(originalArr)
    const [displayList, setDisplayList] = useState(originalArr)
    
    const [searchQuery, setSearchQuery] = useState('')

    const selectedIds = useRef([])

    useEffect(() => {
        filterFunction(searchQuery)
    },[searchQuery])

    function searchQueryHandler(text) {
        setSearchQuery(text)
    }

    /** Search filter parameters */
    function filterFunction(text) {
        const filteredItems = originalList.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) 
        || user.email.toLowerCase().includes(text.toLowerCase())
        || user.role.toLowerCase().includes(text.toLowerCase())
        );
        setDisplayList(filteredItems)
    }

    /** Update array containing selected rows */
    function updateSelectedIds(id, arr) {
        if(arr.current.includes(id)){
            const temp = arr.current.filter(value => value !== id)
            arr.current = []
            arr.current = temp
        }
        else if(!arr.current.includes(id) || arr.length === 0 ) {
            arr.current.push(id)
        }
    }

    /** Update array containing selected rows with multiple records */
    function updateMultipleSelectedIds(records, arr, isPageChecked) {
        if(!isPageChecked) {
            records.forEach(record => {
                if(arr.current.includes(record.id)) return;
                else if(!arr.current.includes(record.id) || arr.length === 0 ) {
                    arr.current.push(record.id)
                }
            })
        }
        else if(isPageChecked) {
            records.forEach(record => {
                if(arr.current.includes(record.id)) {
                    const temp = arr.current.filter(value => value !== record.id)
                    arr.current = []
                    arr.current = temp
                }
            })
        }
    }

    /** Update specific row */
    function updateRowInformation(user) {
        let tempDisplayIndex = displayList.findIndex(record => record.id === user.current.id)
        const tempDisplayList = displayList.map((record, index) => {
            if(index === tempDisplayIndex) return user.current
            else return record
        })
        setDisplayList(tempDisplayList)

        let tempOriginalIndex = originalList.findIndex(record => record.id === user.current.id)
        const tempOriginalList = originalList.map((record, index) => {
            if(index === tempOriginalIndex) return user.current
            else return record
        })
        setOriginalList(tempOriginalList)
    }

    /** Deletes selected rows */
    function deleteSelectedRows() {
        if(selectedIds.current.length == 0) alert('No records have been selected')
        else {
            let tempDisplayList = displayList
            selectedIds.current.forEach(id => tempDisplayList = tempDisplayList.filter(user => user.id !== id))
            setDisplayList(tempDisplayList)

            let tempOriginalList = originalList
            selectedIds.current.forEach(id => tempOriginalList = tempOriginalList.filter(user => user.id !== id))
            setOriginalList(tempOriginalList)
            
            selectedIds.current = []
        }
    }

    /** Deletes row from row actions */
    function deleteRow(id) {
        let tempOriginalList = originalList.filter(user => user.id !== id)
        setOriginalList(tempOriginalList)

        let tempDisplayList = displayList.filter(user => user.id !== id)
        setDisplayList(tempDisplayList)
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 lg:px-24">
      <div className="flex flex-col w-[80%]">
        <SearchBar searchQueryHandler={searchQueryHandler}/>
        <Suspense fallback={<PlaceHolderTable />}>
            <DataTable 
                originalList = {originalList}
                displayList={displayList}
                updateSelectedIds={updateSelectedIds}
                updateMultipleSelectedIds={updateMultipleSelectedIds}
                selectedIds={selectedIds}
                deleteSelectedRows={deleteSelectedRows}
                deleteRow={deleteRow}
                updateRowInformation={updateRowInformation}
            />
        </Suspense>
      </div>
    </main>
  );
}


export const originalArr = [
  {
      "id": "1",
      "name": "Aaron Miles",
      "email": "aaron@mailinator.com",
      "role": "member"
  },
  {
      "id": "2",
      "name": "Aishwarya Naik",
      "email": "aishwarya@mailinator.com",
      "role": "member"
  },
  {
      "id": "3",
      "name": "Arvind Kumar",
      "email": "arvind@mailinator.com",
      "role": "admin"
  },
  {
      "id": "4",
      "name": "Caterina Binotto",
      "email": "caterina@mailinator.com",
      "role": "member"
  },
  {
      "id": "5",
      "name": "Chetan Kumar",
      "email": "chetan@mailinator.com",
      "role": "member"
  },
  {
      "id": "6",
      "name": "Jim McClain",
      "email": "jim@mailinator.com",
      "role": "member"
  },
  {
      "id": "7",
      "name": "Mahaveer Singh",
      "email": "mahaveer@mailinator.com",
      "role": "member"
  },
  {
      "id": "8",
      "name": "Rahul Jain",
      "email": "rahul@mailinator.com",
      "role": "admin"
  },
  {
      "id": "9",
      "name": "Rizan Khan",
      "email": "rizan@mailinator.com",
      "role": "member"
  },
  {
      "id": "10",
      "name": "Sarah Potter",
      "email": "sarah@mailinator.com",
      "role": "admin"
  },
  {
      "id": "11",
      "name": "Keshav Muddaiah",
      "email": "keshav@mailinator.com",
      "role": "member"
  },
  {
      "id": "12",
      "name": "Nita Ramesh",
      "email": "nita@mailinator.com",
      "role": "member"
  },
  {
      "id": "13",
      "name": "Julia Hunstman",
      "email": "julia@mailinator.com",
      "role": "member"
  },
  {
      "id": "14",
      "name": "Juan Alonso",
      "email": "juan@mailinator.com",
      "role": "admin"
  },
  {
      "id": "15",
      "name": "Gabriel Montoya",
      "email": "gabriel@mailinator.com",
      "role": "admin"
  },
  {
      "id": "16",
      "name": "Beatrice Iglesias",
      "email": "beatrice@mailinator.com",
      "role": "admin"
  },
  {
      "id": "17",
      "name": "Sarah Symms",
      "email": "sarah.s@mailinator.com",
      "role": "admin"
  },
  {
      "id": "18",
      "name": "Patrick Pinheiro",
      "email": "patrick@mailinator.com",
      "role": "admin"
  },
  {
      "id": "19",
      "name": "Anand Patel",
      "email": "anand@mailinator.com",
      "role": "member"
  },
  {
      "id": "20",
      "name": "Kishore Kalburgi",
      "email": "kishore@mailinator.com",
      "role": "member"
  },
  {
      "id": "21",
      "name": "Rebecca Norris",
      "email": "rebecca@mailinator.com",
      "role": "member"
  },
  {
      "id": "22",
      "name": "Özgür Başak",
      "email": "ozgur@mailinator.com",
      "role": "member"
  },
  {
      "id": "23",
      "name": "Robin Andersen",
      "email": "robin@mailinator.com",
      "role": "member"
  },
  {
      "id": "24",
      "name": "Nandini Kumar",
      "email": "nandini@mailinator.com",
      "role": "member"
  },
  {
      "id": "25",
      "name": "Nikita Smith",
      "email": "nikita@mailinator.com",
      "role": "member"
  },
  {
      "id": "26",
      "name": "Colton Doe",
      "email": "colton@mailinator.com",
      "role": "member"
  },
  {
      "id": "27",
      "name": "Alain Senna",
      "email": "alain@mailinator.com",
      "role": "member"
  },
  {
      "id": "28",
      "name": "Ashwin Jain",
      "email": "ashwin@mailinator.com",
      "role": "member"
  },
  {
      "id": "29",
      "name": "Seema Bhatt",
      "email": "seema@mailinator.com",
      "role": "member"
  },
  {
      "id": "30",
      "name": "Kayla Scarpinski",
      "email": "kayla@mailinator.com",
      "role": "member"
  },
  {
      "id": "31",
      "name": "Ajay Ghosh",
      "email": "ajay@mailinator.com",
      "role": "member"
  },
  {
      "id": "32",
      "name": "Chris Lindberg",
      "email": "chris@mailinator.com",
      "role": "member"
  },
  {
      "id": "33",
      "name": "Christina Mourujärvi",
      "email": "christina@mailinator.com",
      "role": "member"
  },
  {
      "id": "34",
      "name": "Mikhail Bill",
      "email": "mikhail@mailinator.com",
      "role": "member"
  },
  {
      "id": "35",
      "name": "Eino Göregen",
      "email": "eino@mailinator.com",
      "role": "member"
  },
  {
      "id": "36",
      "name": "Zachariah Johansson",
      "email": "zacharaiah@mailinator.com",
      "role": "member"
  },
  {
      "id": "37",
      "name": "Aimaan Mohammed",
      "email": "aimaan@mailinator.com",
      "role": "admin"
  },
  {
      "id": "38",
      "name": "Aika Tsunoda",
      "email": "aika@mailinator.com",
      "role": "member"
  },
  {
      "id": "39",
      "name": "Kimiko Minamoto",
      "email": "kimiko@mailinator.com",
      "role": "member"
  },
  {
      "id": "40",
      "name": "Alyona Baginskaite",
      "email": "alyona@mailinator.com",
      "role": "member"
  },
  {
      "id": "41",
      "name": "Anirudh Mukherjee",
      "email": "anirudh@mailinator.com",
      "role": "member"
  },
  {
      "id": "42",
      "name": "Alyona Gov",
      "email": "alyonagov@mailinator.com",
      "role": "member"
  },
  {
      "id": "43",
      "name": "Robin Singh",
      "email": "robin@mailinator.com",
      "role": "member"
  },
  {
      "id": "44",
      "name": "Vijay Vasudevan",
      "email": "vijayv@mailinator.com",
      "role": "member"
  },
  {
      "id": "45",
      "name": "Steve Smith",
      "email": "steve@mailinator.com",
      "role": "member"
  },
  {
      "id": "46",
      "name": "Anirudh Banerjee",
      "email": "anirudhb@mailinator.com",
      "role": "member"
  }
  ]

