/** Vamos a hacer una lista de usuarios, así que primero generamos una clase de usuarios con distintos atributos*/
class User extends Persona implements Hablador{
    private id: number;
    private nombre: string;
    private email: string;
    /** Debo agregar la declaración de idioma porque está en hablador.ts */
    public idioma: string;

    /** En el constructor, pedimos que cualquiera que use un objeto de User que sí o sí cargue esos 3 parámetros y se guarde en las 3 variables id, nombre y email */
    constructor(id: number, nombre: string, email: string, dni: number){
        super(dni);
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }

    /** Creamos una función que no recibe ni devuelve parámetros, solamente va a escribir en la consola los parámetros de la persona 
     * Como no le pongo nivel de visibilidad (public/private), va a ser pública
    */
    mostrar(): void{
        super.mostrar()
        console.log("id=" + this.id + " nombre=" + this.nombre + " email="+this.email)
    }

    /** Al agregar el implements Hablador, tengo que crear las funciones hablar() y cantar() que están en hablador.ts */
    hablar(): void{

    }

    cantar(i: number): void{

    }
}