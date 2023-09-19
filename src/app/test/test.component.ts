import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'pm-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  actors:any[] = [];
  errorMessage = '';

  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getActors().subscribe(
      (response) => {
        console.log('Actor Data:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


}
