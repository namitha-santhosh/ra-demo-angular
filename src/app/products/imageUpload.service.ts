import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor() {}

  // This method simulates uploading an image to a local folder and returns the image URL.
  uploadImage(file: File): Observable<string> {
    // Generate a unique file name to prevent overwriting existing files.
    const fileName = `image_${Date.now()}_${file.name}`;

    // Create a URL pointing to the local 'uploads' folder.
    const imageUrl = `/uploads/${fileName}`;

    // Simulate saving the image to the local 'uploads' folder.
    this.saveImageLocally(file, fileName);

    return of(imageUrl);
  }

  private saveImageLocally(file: File, fileName: string) {
    // Simulate saving the image to the 'uploads' folder.
    // In a real server, you would write the file to a local folder using a file system API.
    // Here, we simulate it by logging the file name.
    console.log(`Saved image '${file.name}' as '${fileName}' in 'uploads' folder.`);
  }
}
