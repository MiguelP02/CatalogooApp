import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: false,
  
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {

  public page_title: string;

  constructor() {
    this.page_title = "Página no encontrada.";
  }

  ngOnInit(): void {
    
  }
}
