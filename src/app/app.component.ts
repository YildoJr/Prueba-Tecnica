import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  publicationObj: Publicacion = new Publicacion();
  publicationList: Publicacion[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("prueba-tecnica");
    if(localData != null){
      this.publicationList = JSON.parse(localData);
    }
  }

  opModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = 'block';

    }
  }

  clModal() {
    this.publicationObj = new Publicacion();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  svPublicacion(){
    debugger;
    const isLocalPresent = localStorage.getItem("prueba-tecnica");
    if(isLocalPresent != null){
      const oldArray = JSON.parse(isLocalPresent);
      this.publicationObj.id = oldArray.length + 1;
      oldArray.push(this.publicationObj);
      this.publicationList = oldArray;
      localStorage.setItem('prueba-tecnica', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.publicationObj);
      this.publicationObj.id = 1;
      this.publicationList = newArr;
      localStorage.setItem('prueba-tecnica', JSON.stringify(newArr));
    }
    this.clModal();
  }

  upPublicacion(){
    const currentRecord = this.publicationList.find(m=> m.id === this.publicationObj.id);
    if(currentRecord != undefined){
      currentRecord.titulo = this.publicationObj.titulo;
      currentRecord.contenido = this.publicationObj.contenido;
    };
    localStorage.setItem('prueba-tecnica', JSON.stringify(this.publicationList));
    this.clModal();
  }

  onDelete(item: Publicacion) {
    const isDelet = confirm("¿Estás seguro de que deseas eliminar esta publicación?");
    if(isDelet){
      const currentRecord = this.publicationList.findIndex(m=> m.id === this.publicationObj.id);
      this.publicationList.splice(currentRecord, 1);
      localStorage.setItem("prueba-tecnica", JSON.stringify(this.publicationList));

    }
  }

  onEdit(item: Publicacion){
    this.publicationObj = item;
    this.opModal();

  }
}

export class Publicacion {
  id: number;
  titulo: string;
  contenido: string;
  //fecha: Date;

  constructor(){
    this.id = 0;
    this.titulo = '';
    this.contenido = '';
    //this.fecha = ' ';
  }
}
