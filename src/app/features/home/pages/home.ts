import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntityCardComponent} from '@shared/ui/entity-card/entity-card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EntityCardComponent, RouterLink],
  templateUrl: './home.html',
})
export class HomeComponent {}
