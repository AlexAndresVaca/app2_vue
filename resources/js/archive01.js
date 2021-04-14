const app = new Vue({
    el: '#app',
    data: {
        title_page: 'APP 2 VUE',
        tareas: [],
        nueva_tarea: '',
    },
    methods: {
        agregar_tarea() {
            if (this.nueva_tarea != '') {
                this.tareas.push({
                    nombre: this.nueva_tarea,
                    estado: false
                });
                // almacenar en el local storage
                localStorage.setItem('gym_local', JSON.stringify(this.tareas));
                // Notificar
                Swal.fire({
                    position: 'top-end',
                    toast: true,
                    icon: 'success',
                    title: 'Registro guardado',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#D1E7DD',
                    // width: '32em',
                });
                this.nueva_tarea = '';

            } else {
                Swal.fire({
                    icon: 'error',
                    title: '<h3 style="color:red;">Oops...</h3>',
                    text: 'Debes ingresar texto!',

                })

            }
            // console.log("Se agrego");
        },
        editar_tarea(index) {
            this.tareas[index].estado = true;
            // almacenar en el local storage
            localStorage.setItem('gym_local', JSON.stringify(this.tareas));
            console.log(this.tareas[index].estado);
        },
        eliminar_tarea(index) {
            Swal.fire({
                icon: 'warning',
                title: 'Quieres eliminar la tarea?',
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: `SI`,
                denyButtonText: `NO`,
                confirmButtonColor: '#dd6b55',
                denyButtonColor: '#3085d6',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.tareas.splice(index, 1);
                    localStorage.setItem('gym_local', JSON.stringify(this.tareas));
                    Swal.fire({
                        position: 'top-end',
                        toast: true,
                        icon: 'success',
                        title: 'Registro eliminado',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#F8D7DA',
                        iconColor: '#dd6b55',
                        // width: '32em',
                    });
                } else if (result.isDenied) {
                    // Swal.fire('Changes are not saved', '', 'info')
                }
            })
        },
    },
    created: function() {
        let datos_db = JSON.parse(localStorage.getItem('gym_local'));
        if (datos_db == null) {
            this.tareas = [];
        } else {
            this.tareas = datos_db;
        }
    },
    computed: {

    }
})