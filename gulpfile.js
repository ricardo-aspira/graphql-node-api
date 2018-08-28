// Código estilo Node.JS, não ES6
const gulp  = require('gulp');
const clean = require('gulp-clean');
const debug = require('gulp-debug');
const ts    = require('gulp-typescript');

// Cria a definição do projeto com base no arquivo de configurações do typescript
const tsProject = ts.createProject('tsconfig.json');

/*
 * Definição da tarefa "scripts".
 * Para iniciar, precisa que a tarefa "static" tenha sido concluída.
 */ 
gulp.task('scripts', ['static'], () => {
    // Sobre o src, realiza o build
    const tsResult = tsProject.src()
        .pipe(debug())
        .pipe(tsProject());

    // Sobre o resultado do build, copiar o mesmo para o destino desejado
    return tsResult.js
        .pipe(gulp.dest('dist'));
});

/*
 * Definição da tarefa "static".
 * Para iniciar, precisa que a tarefa "clean" tenha sido concluída.
 */
gulp.task('static', ['clean'], () => {
    // Sobre o fonte, copia todos os arquivos *.json para a pasta "dist"
    return gulp
        .src(["src/**/*.json"])
        .pipe(gulp.dest('dist'));
});

/*
 * Definição da tarefa "clean".
 */
gulp.task('clean', () => {
    // Limpar a pasta "dist"
    return gulp
        .src('dist')
        .pipe(clean());
});

/*
 * Tarefa de build executará essas tarefas, porém
 * a execução é em paralelo, para não termos erros,
 * devemos colocar dependências entre tarefas.
 */
gulp.task('build', ['clean', 'static', 'scripts']);

/*
 * Definição da tarefa "watch".
 * Para iniciar, precisa que a tarefa "build" tenha sido concluída.
 */
gulp.task('watch', ['build'], () => {
    // Sempre que houver uma alteração nos arquivos "*.ts" e
    // "*.json", o gulp executará a tarefa "build"
    return gulp.watch(["src/**/*.ts", "src/**/*.json"], ['build']);
});

// Define que a tarefa default é a "watch".
gulp.task('default', ['watch']);