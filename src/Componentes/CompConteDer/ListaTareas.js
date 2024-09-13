import './ListaTareas.css'
function ListaTareas(props){
    return(
        <ul className="ListaTareas">

            {props.children}
        </ul>
    )
}


export {ListaTareas};