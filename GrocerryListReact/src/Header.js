const Header = ({title , Ownername})=>{
    return(
        <header>
            <h1>{title} List of {Ownername}</h1>
        </header>
    )
}
Header.defaultProps ={
    title:"Default Title",
    Ownername:"Mr.JohnDoe"}         
export default Header;