const form = document.querySelector('.form');

form.addEventListener('submit', async function (event) {

    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const resultado = document.getElementById('resultado');

    // Validar campos
    if (!data.nombre || !data.contacto || !data.password) {
        resultado.innerHTML = "Debe completar todos los campos";
        return;
    }

    // Validar términos y condiciones
    if (!data.termscondition) {
        resultado.innerHTML = "Debe aceptar los términos y condiciones";
        return;
    }

    const nuevoCliente = {
        nombre: data.nombre,
        contacto: data.contacto,
        password: data.password
    };

    try {

        const response = await fetch(
            'http://localhost:8080/api/addCliente',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoCliente)
            }
        );

        const respuesta = await response.json();

        if (respuesta.response === "OK") {

            alert("Usuario registrado correctamente");

            window.location.href = "loginClient.html";

        } else {

            resultado.innerHTML = respuesta.message;

        }

    } catch (error) {

        console.error(error);

        resultado.innerHTML = "Error al conectar con el servidor";

    }

});