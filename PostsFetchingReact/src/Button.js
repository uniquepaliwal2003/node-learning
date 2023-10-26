const Button = ({buttonTexts , reqType , setReqType })=>{
  return(
    <button
      className={buttonTexts === reqType ?"selected":null }
      type="button"
      onClick={()=>setReqType(buttonTexts)}>
      {buttonTexts}
    </button>
  )
}
export default Button;