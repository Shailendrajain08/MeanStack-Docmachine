import { Component, OnInit } from '@angular/core';
import Dropzone from 'dropzone';

@Component({
  selector: 'app-dropzone',
  standalone: false,
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.scss'
})
export class DropzoneComponent implements OnInit {


  ngOnInit(): void {
    this.initDropzone();
  }

  initDropzone(): void {
    const dropzoneConfig = {
      url: 'YOUR_UPLOAD_URL', // Replace with your upload URL
      maxFilesize: 5, // Maximum file size in MB
      acceptedFiles: 'image/*', // Accept only images
      addRemoveLinks: true,
    };

    const dropzone = new Dropzone('#myDropzone', dropzoneConfig);

    dropzone.on('success', (file, response) => {
      console.log('File successfully uploaded:', response);
    });

    dropzone.on('error', (file, errorMessage) => {
      console.log('Upload error:', errorMessage);
    });

    dropzone.on('removedfile', (file) => {
      console.log('File removed:', file);
    });
  }

}
