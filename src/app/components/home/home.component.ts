import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public page_title: string;

  constructor(){
    this.page_title= 'Inicio';
  }

  ngOnInit(): void {
    
  }

}
