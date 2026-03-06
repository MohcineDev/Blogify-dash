import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})

export class Nav implements OnInit {
  private localTheme = localStorage.getItem('theme');
  action_msg: string = ''
  loading = false
  hide_nav = true

  constructor(private router: Router) {
  }

  dialogConfig = {
    title: '',
    content: ''
  }


  ngOnInit() { 
    this.applyTheme() 
  }
 

  toggleDark() {
    this.localTheme = this.localTheme === "dark" ? 'light' : 'dark'
    localStorage.setItem("theme", this.localTheme);
    this.applyTheme()
  }

  applyTheme() {
    this.localTheme = localStorage.getItem('theme');
    if (this.localTheme == "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

  }
  
}
