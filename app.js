require('colors');
const fs = require('fs');
const readline = require('readline');
const datosArchivos = require('./datos.json');

 const main = async () => {
   console.clear();
   console.log('**********');
   console.log('*  PROYECTO CLASES   *')
    console.log('*********\n')
 
   class Producto {
     #codigoProducto;
     #nombreProducto;
     #inventarioProducto;
     #precioProducto;
     
     constructor() {
       this.#codigoProducto = '';
       this.#nombreProducto = '';
       this.#inventarioProducto = 0;
       this.#precioProducto = 0;

     }

     set setCodigoProducto(value){
      this.#codigoProducto = value;
     }

    get getCodigoProducto(){
      return this.#codigoProducto;
    }

    set setNombreProducto(value){
      this.#nombreProducto = value;
    }

    get getNombreProducto(){
      return this.#nombreProducto;
    }

    set setInventarioProducto(value){
      this.#inventarioProducto = value;
    }

    get getInventarioProducto(){
      return this.#inventarioProducto;
    }

    set setPrecioProducto(value){
      this.#precioProducto = value;
    }

    get getPrecioProducto(){
      return this.#precioProducto;
    }
   }

class ProductosTienda{
  #listaProductos;

  constructor(){
    this.#listaProductos = [];
  }

  get getListaProductos(){
    return this.#listaProductos;
  }

  cargaArchivoProductos(){
    let contador = 0;
    if(datosArchivos.length >0){
      datosArchivos.forEach(objeto =>{
      contador++;
      let producto = new Producto;
      producto.setCodigoProducto = objeto.codigoProducto;
      producto.setNombreProducto = objeto.nombreProducto;
      producto.setPrecioProducto = objeto.precioProducto;
      producto.setInventarioProducto = objeto.inventarioProducto;
      this.#listaProductos.push(producto);
    });
  }else{
    console.log(`Error, el archivo datos.json no contiene lo requerido\n`.bgRed);
  }
  console.log(`Total de productos cargados ==>`.bgBlue + `${contador}`.bgCyan);
}

grabarArchivoProductos(){
  const instanciaClaseAObjetos = this.getListaProductos.map(producto =>{
    return {
      codigoProducto: producto.getCodigoProducto,
      nombreProducto: producto.getNombreProducto,
      inventarioProducto: producto.getInventarioProducto,
      precioProducto: producto.getPrecioProducto
    };
  });

  const cadenaJson = JSON.stringify(instanciaClaseAObjetos,null,2);

  const nombreArchivo = 'datos.json';

  fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');

  console.log(`Datos guardados en ${nombreArchivo}`.bgGreen);
}

mostrarProductos(){
  this.getListaProductos.forEach(producto =>{
    console.log(`|    ` + producto.getCodigoProducto + `    |` +
                `|    ` + producto.getNombreProducto + `    |` +
                `|    ` + producto.getInventarioProducto + `    |` + 
                `|    ` + producto.getPrecioProducto + `    |`);
  });
 }
}


let productosTienda = new ProductosTienda;

productosTienda.cargaArchivoProductos();

console.log(`DATOS APERTURA TIENDA`.bgcyan);

productosTienda.mostrarProductos();

productosTienda.getListaProductos.forEach(producto =>{
  producto.setInventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
});

console.log(`Datos cierre tienda`.bgGreen);
productosTienda.mostrarProductos();

productosTienda.grabarArchivoProductos();

productosTienda.agregarNuevoProducto();

}

main()