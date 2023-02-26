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

  React.useEffect(() => {
    console.log('Empezando el efecto');
    if(state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validacion');
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          });
          console.log("ON ERROR", state)
        } else {
          setState({
            ...state,
            error: true,
            loading: false
          });
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
          onChange={(event) => setState({...state, value: event.target.value})}
          placeholder="Código de seguridad"/>
        <button
          onClick={() => setState({...state, loading: true})}
        >Comprobar</button>
      </div>
    );
  } else if(state.confirmed && !state.deleted) {
    return(
      <React.Fragment>
        <p>¿Estas seguro de eliminar?</p>
        <button onClick={() => {
          setState({
            ...state,
            deleted: true,
          })
        }}>Si, eliminar</button>
        <button onClick={() => {
          setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: ''
          })
        }}>No</button>
      </React.Fragment>
    );
  } else {
    return(
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button onClick={() => {
          setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
          })
        }}>Volver atras</button>
      </React.Fragment>
    );
  }
}

export { UseState }