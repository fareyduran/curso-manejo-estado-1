import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    console.log('Empezando el efecto');
    if(state.loading) {
      setTimeout(() => {
        console.log('Haciendo la validacion');
        if (state.value === SECURITY_CODE) {
          dispatch({
            type: 'CONFIRM'
          });
        } else {
          dispatch({
            type: 'ERROR'
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
          onChange={(event) => dispatch({ type: 'WRITE', payload: event.target.value})}
          placeholder="Código de seguridad"/>
        <button
          onClick={() => dispatch({ type: 'CHECK'})}
        >Comprobar</button>
      </div>
    );
  } else if(state.confirmed && !state.deleted) {
    return(
      <React.Fragment>
        <p>¿Estas seguro de eliminar?</p>
        <button onClick={() => { dispatch({ type: 'DELETE' }) }}>Si, eliminar</button>
        <button onClick={() => { dispatch({ type: 'RESET' }) }}>No</button>
      </React.Fragment>
    );
  } else {
    return(
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button onClick={() => { dispatch({ type: 'RESET' }) }}>Volver atras</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
}

const reducerObject = (state, payload) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false
  }, 
  'CHECK': {
    ...state,
    loading: true,
  },
  'DELETE': {
    ...state,
    deleted: true,
  }, 
  'RESET': {
    ...state,
    confirmed: false,
    deleted: false,
    value: ''
  },
  'WRITE': {
    ...state,
    value: payload
  },
  'CONFIRM': {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state
  }
}

export { UseReducer }