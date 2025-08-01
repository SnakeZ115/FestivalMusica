import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import { src, dest, watch, series } from 'gulp'

const sass = gulpSass(dartSass); // compilar sass con gulpsass

export function js( done ) {
    src('src/js/app.js')
        .pipe(dest('build/js')) // hace una copia del archivo y la lleva al destino
    done()
}

export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('build/css',  {sourcemaps: true}) ) // sabe en que archivo scss esta algun elemento
    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css) // habilitar modo watch para reflejar cambios inmediatamente. el ** indica que busque todos los archivos con extencion .scss
    watch('src/js/**/*.js', js) // lo mismo para javascript
}

export const build = series(js, css); // agregar task de build para gulp, para poder publicar desde netlify

export default series( js, css, dev ) // ejectua varias funciones, finaliza una serie antes de ejecutar otra, parallel es todas al mismo tiempo

/*
// se crean funciones
// export te da la opcion de ejecutar la funcion en package.json
export function hola( done ) {
    console.log("hola desde gulp")
    done() // finaliza la funcion
}
*/