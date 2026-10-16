const form = document.querySelector('.form');

form.addEventListener('submit', async function (event) {

    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const resultado = document.getElementById('resultado');

    // Verificar que todos los campos estén completos
    if (!data.contacto || !data.password || !data.password2) {
        resultado.innerHTML = "Debe completar todos los campos";
        return;
    }

    // Verificar que las dos contraseñas sean iguales
    if (data.password !== data.password2) {
        resultado.innerHTML = "Las contraseñas no coinciden";
        return;
    }

    const cambioPassword = {
        contacto: data.contacto,
        password: data.password
    };

    try {

        const response = await fetch(
            'http://localhost:8080/api/resetCliente',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cambioPassword)
            }
        );

        const respuesta = await response.json();

        if (respuesta.response === "OK") {

            alert("Contraseña actualizada correctamente");

            window.location.href = "loginClient.html";

        } else {

            resultado.innerHTML = respuesta.message;

        }

    } catch (error) {

        console.error(error);

        resultado.innerHTML = "Error al conectar con el servidor";

    }

});