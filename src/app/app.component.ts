import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PdfEvent } from './pdfdoc/pdf.event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ocr-app';

  constructor(private http: HttpClient) {}

  onCreatePdf(event: PdfEvent) {
    const formData = new FormData();

    event.files.forEach((file) => formData.append('files', file));

    firstValueFrom(this.http.post('/api/thumbnail-upload', formData))
      .then((result: any) => {
        const blob = new Blob([result], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
