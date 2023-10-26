import Table from './Table';
import Form from './Forms';
import Lists from './Lists';
const { useEffect , useState } = require('react');
function App() {
  const API_URL = 'https://jsonplaceholder.typicode.com/';
  const [items,setItems] = useState([]);
  const [reqType,setReqType] = useState('users');
  useEffect(()=>{
    const fetchItems = async()=>{
      try{
        const response = await fetch(`${API_URL}${reqType}`);
        if(!response.ok) throw new Error(`we got some problem with the response-${response}`);
        const data = await response.json();
        setItems(data);
      }catch( err ){
        console.log(`We got some problem ${err}`);
      }
    }
    fetchItems();
  },[reqType])
  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType}/>
      <Table items={items}/>
      {/* <Lists items={items}/> */}
    </div>
  );
}
export default App;
