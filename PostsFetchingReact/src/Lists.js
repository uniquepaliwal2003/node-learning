import ListItem from "./ListItem";
const Lists = ({items})=>{
  return (
    <ul>
      {
        items.map( item=>(
        <ListItem item={item} key={item.id}/>
        ))
      }
    </ul>
  )
}
export default Lists;