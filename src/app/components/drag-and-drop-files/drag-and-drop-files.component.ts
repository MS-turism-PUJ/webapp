import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-and-drop-files',
  standalone: true,
  templateUrl: './drag-and-drop-files.component.html',
  styleUrls: ['./drag-and-drop-files.component.css'],
  imports: [CommonModule]
})
export class DragAndDropFilesComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropArea') dropArea!: ElementRef<HTMLDivElement>;

  dragText = 'Drag & Drop to Upload File';
  @Output() file?: File;
  previewUrl?: string;
  @Output() getFile = new EventEmitter<File>();

  constructor() { }

  // Cuando se hace clic en el botón "Browse File"
  onButtonClick() {
    this.fileInput.nativeElement.click();
  }

  // Cuando el archivo cambia al seleccionar desde el explorador de archivos
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.getFile.emit(this.file)
      this.showFile();
      this.dropArea.nativeElement.classList.add('active');
    }
  }

  // Cuando el usuario arrastra un archivo sobre el área de arrastre
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dropArea.nativeElement.classList.add('active');
    this.dragText = 'Release to Upload File';
  }

  // Cuando el usuario sale del área de arrastre
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dropArea.nativeElement.classList.remove('active');
    this.dragText = 'Drag & Drop to Upload File';
  }

  // Cuando el usuario suelta el archivo en el área de arrastre
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dropArea.nativeElement.classList.remove('active');
    this.dragText = 'Drag & Drop to Upload File';

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.file = event.dataTransfer.files[0];
      this.showFile();
    }
  }

  // Mostrar el archivo en el área de arrastre
  showFile() {
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if (this.file && validExtensions.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        // Al tener 'previewUrl', se mostrará la imagen en el template
      };
      reader.readAsDataURL(this.file);
    } else {
      alert('This is not an Image File!');
      this.reset();
    }
  }

  // Reiniciar el área de arrastre
  reset() {
    this.file = undefined;
    this.previewUrl = undefined;
    this.dragText = 'Drag & Drop to Upload File';
    this.dropArea.nativeElement.classList.remove('active');
  }
}
