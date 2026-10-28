const form = document.querySelector('.form');

form.addEventListener('submit', async function (event) {

    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const resultado = document.getElementById('resultado');

    // Validar que todos los campos estén completos
    if (!data.nombre || !data.contacto || !data.password || !data.password2) {

        resultado.style.color = "red";
        resultado.innerHTML = "Debe completar todos los campos";

        return;
    }

    // Validar que ambas contraseñas coincidan
    if (data.password !== data.password2) {

        resultado.style.color = "red";
        resultado.innerHTML = "Las contraseñas no coinciden";

        return;
    }

    // Validar términos y condiciones
    if (!data.termscondition) {

        resultado.style.color = "red";
        resultado.innerHTML = "Debe aceptar los términos y condiciones";

        return;
    }

    // Se envía una sola contraseña al backend.
    // password2 solamente se utiliza para validar en el frontend.
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

            resultado.style.color = "green";
            resultado.innerHTML = "Usuario registrado correctamente";

        } else {

            resultado.style.color = "red";
            resultado.innerHTML = respuesta.message;

        }

    } catch (error) {

        console.error(error);

        resultado.style.color = "red";
        resultado.innerHTML = "Error al conectar con el servidor";

    }

});