import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'app-image-upload',
  template: `
    <div class="drop-container" ngFileDrop (uploadOutput)="onUploadOutput($event)" [uploadInput]="uploadInput" [ngClass]="{ 'is-drop-over': dragOver }">
      <h1>Drop images here</h1>

      <span class="text-center">or</span>

      <div>
        <input type="file"
          ngFileSelect
          (uploadOutput)="onUploadOutput($event)"
          [uploadInput]="uploadInput"
          class="input-file"
          id="file"
          multiple>

        <label for="file" class="file-label">
          <span class="icon"><i class="fa fa-upload" aria-hidden="true"></i></span>
          <span class="text">Choose files..</span>
        </label>
      </div>

      <div *ngIf="imagePreview.length" class="image-preview-list">
        <h3 class="text-subtitle">Queued images</h3>
        <img [src]="preview.image" *ngFor="let preview of imagePreview" class="thumb-xl image-preview" alt="Preview"/>
      </div>
    </div>

    <button type="button" class="btn btn-success" (click)="startUpload()" *ngIf="files.length">
      Start Upload
    </button>
  `,
  styles: [`
    .drop-container {
      border: 2px dashed #ccc;
      padding: 10px;
      margin: 20px 0;
      text-align: center;
    }
    .drop-container h1 {
      text-align: center;
    }
    .drop-container h1,
    .drop-container h3 {
      border: none !important;
    }
    .image-preview-list {
      text-align: left;
    }
    .image-preview {
      display: inline-block;
      margin: 10px;
      border: #ccc 1px solid;
      padding: 5px;
    }
    .input-file {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
    .file-label {
      font-size: 1.25rem;
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      display: inline-block !important;
      overflow: hidden;
      color: #d3394c;
      text-align: center;
    }
    .file-label .icon {
      color: #fff;
      background-color: #d3394c;
      display: inline-block;
      padding: 30px;
      display: inline-block;
      border-radius: 50%;
    }
    .file-label .icon > i {
      font-size: 48px;
    }
    .file-label:focus .icon,
    .file-label:hover .icon {
      background-color: #722040;
    }
    .file-label:focus .text,
    .file-label:hover .text {
      color: #722040;
    }
    .file-label .text {
      display: block;
    }
  `],
})
export class ImageUploadComponent {
  @Output() uploadComplete: EventEmitter<any> = new EventEmitter();
  backendUrl: string = 'http://localhost:9000/api/image-upload';
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  imagePreview: any[] = [];

  constructor() {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue') {
      this.previewImage(output.file.nativeFile).then(response => {
        this.imagePreview.push({
          id: output.file.id,
          image: response,
        });
        this.files.push(output.file);
      });
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    } else if (output.type === 'done') {
      this.uploadComplete.emit(output.file.response.data);
      this.files = this.files.filter((file => file.id !== output.file.id));
      this.imagePreview = this.imagePreview.filter(image => image.id !== output.file.id);
    }
  }

  startUpload(): void {  // manually start uploading
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.backendUrl,
      method: 'POST',
      data: {},
      concurrency: 1 // set sequential uploading of files with concurrency 1
    }

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  previewImage(file: any) {
    const fileReader = new FileReader();
    return new Promise(resolve => {
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e: any) {
        resolve(e.target.result);
      }
    });
  }
}
