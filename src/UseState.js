import React from 'react';

function UseState({ name }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log('Empezando el efecto');
    if(loading) {
      setTimeout(() => {
        console.log('Haciendo la validacion');
        setLoading(false);
        console.log('Terminando la validacion');
      }, 2000);
    }
    console.log('Terminando el efecto');
  }, [loading]);

  return (
    <div>
      <h2>Eliminar { name }</h2>
      <p>Por favor, escribe el código de seguridad.</p>
      {error && (
        <p>Error: el código es incorrecto</p>
      )}
      {loading && (
        <p>cargando...</p>
      )}
      <input placeholder="Código de seguridad"/>
      <button
        onClick={() => setLoading(true)}
      >Comprobar</button>
    </div>
  );
}

export { UseState }