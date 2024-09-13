import './Input.css';
function Input(props){
    return (
        <>
            <label className="InputLabel" name="Input">Nombre de Tarea</label>
            <textarea 
                className="Input" 
                type="text" 
                placeholder="Ingrese su Tarea" 
                name="Input"
                onChange={e=>props.setNuevaTarea(e.target.value)}
            />
        </>
    )
}

export {Input};