import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileEvent } from './file.event';

@Component({
  selector: 'app-pdfpage',
  templateUrl: './pdfpage.component.html',
  styleUrls: ['./pdfpage.component.css'],
})
export class PdfpageComponent implements OnInit {
  id?: string;

  fileName: any;

  file: File | null = null;

  @Output() deleted = new EventEmitter<PdfpageComponent>();

  @Output() fileSelected = new EventEmitter<FileEvent>();

  constructor() {}

  ngOnInit(): void {}

  onDelete() {
    this.deleted.emit(this);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];

    if (this.file) {
      this.fileName = this.file.name;
    }

    const fileEvent: FileEvent = {
      componentId: this.id!,
      file: this.file,
    };

    this.fileSelected.emit(fileEvent);
  }
}
