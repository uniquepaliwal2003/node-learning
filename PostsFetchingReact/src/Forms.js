import Button from './Button';
const Forms = ({reqType,setReqType})=>{
  return(
    <form onSubmit={(e)=>e.preventDefault()}>
      <Button 
        buttonTexts="users"
        reqType={reqType}
        setReqType={setReqType}/>
      <Button 
        buttonTexts="posts"
        reqType={reqType}
        setReqType={setReqType}/>
      <Button 
        buttonTexts="comments"
        reqType={reqType}
        setReqType={setReqType}/>
    </form>
  )
}
export default Forms;