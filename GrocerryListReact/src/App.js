import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import SearchItem from './SearchItem';
import { useState , useEffect } from 'react';
import AddItem from './AddItem';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [ items , setitems ] = useState([]);
  const [newItem,setNewItem] = useState('');
  const [search,setSearch]=useState('');
  const [fetchError, setFetchError]=useState(null);
  const [isLoading , setIsLoading]=useState(true);

  useEffect(()=>{
    const fetchItems = async()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok)throw Error('did not received required data from the api');
        const listItems = await response.json();
        console.log(listItems);
        setitems(listItems);
        setFetchError(null);
      }catch(err){
        setFetchError(err);
      }finally{
        setIsLoading(false);
      }
    }
    // now we still have to call this above function
    setTimeout(() => {
      fetchItems() 
    }, 2000);
  },[])

const addItem = async(item)=>{
  const id = items.length?items[items.length-1].id+1:1;
  const myNewItem = {id , checked:false , item};
  const listItems = [...items,myNewItem];
  setitems(listItems);
  const postOptions = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(myNewItem)
  }
  const result = await apiRequest(API_URL,postOptions);
  if(result) setFetchError(result);
}

const handleCheck = async(id)=>{
  const listItems = items.map((item)=>item.id === id ? {...item , checked:!item.checked }: item )
  setitems(listItems);
  const myItem = listItems.filter((item)=> item.id === id );
  const updateOptions = {
    method: 'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({ checked : myItem[0].checked})
  };
  const reqUrl = `${API_URL}/${id}`;
  const result = await apiRequest(reqUrl,updateOptions);
  if(result) setFetchError(result);
}

const handleDelete = async(id)=>{
  const listItems = items.filter((item)=>item.id !== id );
  setitems( listItems );
  const deleteOptions = {
    method:'DELETE'
  };
  const reqUrl = `${API_URL}/${id}`;
  const result = await apiRequest(reqUrl , deleteOptions);
  if(result) setFetchError(result);
}

const handleSubmit = (e)=>{
  e.preventDefault();
  addItem(newItem)
  setNewItem('');
}

  return (
    <div className="App">
      <Header title="Groceries" />
      <AddItem handleSubmit={handleSubmit} newItem={newItem} setNewItem={setNewItem}/>
      <SearchItem search={search} setSearch={setSearch}/>
      <main>
        {isLoading && <p>Loading Items .... </p>}
        {fetchError && !isLoading &&<p style={{color:"red"}}>{`${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete}/>}
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
