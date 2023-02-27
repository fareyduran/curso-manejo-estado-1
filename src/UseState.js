import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  console.log(state);

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false
    });
  }

  const onWrite = (newValue) => {
    setState({...state, value: newValue})
  }

  const onCheck = () => setState({...state, loading: true})

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    })
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: ''
    })
  }

  React.useEffect(() => {
    console.log('Empezando el efecto');
    if(state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validacion');
        if (state.value === SECURITY_CODE) {
          onConfirm();
          console.log("ON ERROR", state)
        } else {
          onError();
        }
        console.log('Terminando la validacion');
      }, 2000);
    }
    console.log('Terminando el efecto');
  }, [state.loading]);

  if(!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar { name }</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {(state.error && !state.loading) && (
          <p>Error: el código es incorrecto</p>
        )}
        {state.loading && (
          <p>cargando...</p>
        )}
        <input 
          value={state.value} 
          onChange={(event) => onWrite(event.target.value)}
          placeholder="Código de seguridad"/>
        <button
          onClick={() => onCheck()}
        >Comprobar</button>
      </div>
    );
  } else if(state.confirmed && !state.deleted) {
    return(
      <React.Fragment>
        <p>¿Estas seguro de eliminar?</p>
        <button onClick={() => { onDelete() }}>Si, eliminar</button>
        <button onClick={() => { onReset() }}>No</button>
      </React.Fragment>
    );
  } else {
    return(
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button onClick={() => { onReset() }}>Volver atras</button>
      </React.Fragment>
    );
  }
}

export { UseState }