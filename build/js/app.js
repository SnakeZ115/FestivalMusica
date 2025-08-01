document.addEventListener('DOMContentLoaded', () => {
    navegacionFija();
    resaltarEnlace();
    crearGaleria();
    scrollNav();
});

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', () => {
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    const imagenes = 16;
    for (let index = 1; index <= imagenes; index++) {
        const img = document.createElement('IMG');
        img.src = `src/img/gallery/full/${index}.jpg`;
        img.alt = "imagen galeria";

        //Event handler, detectar y responder a un evento del usuaruo
        img.onclick = () => {
            mostrarImagen(index)
        }

        galeria.appendChild(img);
    }
}

function mostrarImagen(index) {

    const img = document.createElement('IMG');
    img.src = `src/img/gallery/full/${index}.jpg`;
    img.alt = "imagen galeria";


    //Generar modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');

    modal.onclick = cerrarModal;

    // boton cerrar imagen
    const botonCerrar = document.createElement('BUTTON');
    botonCerrar.textContent = "X";
    botonCerrar.classList.add('btn-cerrar');

    botonCerrar.onclick = cerrarModal;

    modal.appendChild(img);
    modal.appendChild(botonCerrar);

    //agregar al HTML
    const body = document.querySelector('body');
    body.appendChild(modal);
    body.classList.add('overflow-hidden');
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(()=>{
        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');        
        modal.remove();        
    }, 500)
}

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');
        let actual = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop; // que tan lejos entre el section con el elemento padre (body en este caso)
            const sectionHeight = section.clientHeight; // lo que mide un elemento
            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + actual ){
                link.classList.add('active');
            }
        })
    });
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionScroll = event.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: 'smooth'});
        });
    });
}