import './H1Der.css';
function H1Der(props){
    return(
        <>
        <h1>Tus tareas</h1>
        <h3>Has completado <span>{props.completas}</span> de <span>{props.total}</span> tareas</h3>
        </>
    )
}

export {H1Der};