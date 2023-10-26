const Footer= ({length})=>{
    let today = new Date();
    return(
        <footer>
            <p>{length} List {length===1?"item":"items"}</p>
            <p>Copyrigth &copy; {today.getFullYear()}</p>
        </footer>
    )
}
export default Footer;