import Cell from "./Cell";
const Row = ({key,item})=>{
  return(
    <tr>
      {
        Object.entries(item).map(([key,value])=>{
          return(
            <Cell key={key} cellData={JSON.stringify(value)}/>
          )
        }) 
      }
    </tr>
  )
}
export default Row;
