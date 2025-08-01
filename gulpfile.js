import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import { src, dest, watch } from 'gulp'

const sass = gulpSass(dartSass); // compilar sass con gulpsass

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('build/css',  {sourcemaps: true}) ) // sabe en que archivo scss esta algun elemento
    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css) // habilitar modo watch para reflejar cambios inmediatamente. el ** indica que busque todos los archivos con extencion .scss
}

/*
// se crean funciones
// export te da la opcion de ejecutar la funcion en package.json
export function hola( done ) {
    console.log("hola desde gulp")
    done() // finaliza la funcion
}
*/