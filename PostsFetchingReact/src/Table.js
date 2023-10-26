import Row from './Row';
const Table = ({items})=>{
  return(
    <table>
      <div className="table-container">
        <table>
          <tbody>
            {items.map(item=>(
              <Row Key={item.id} item={item}/>
            ))}
          </tbody>
        </table>
      </div>
    </table>
  )
} 
export default Table;