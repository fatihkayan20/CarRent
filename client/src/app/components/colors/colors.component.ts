import { RoutingService } from './../../services/routing.service';
import { Color } from './../../models/color';
import { ColorService } from './../../services/color.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
})
export class ColorsComponent implements OnInit {
  colors: Color[] = [];

  constructor(
    private colorService: ColorService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((res) => {
      this.colors = res.data;
    });
  }

  setCurrentColor(color: Color) {
    this.routingService.setCurrentColor(color);
  }
  setCurrentColorDefault() {
    this.routingService.setCurrentColorDefault();
  }

  getColorClass(color: Color) {
    if (color === this.routingService.currentColor) {
      return 'list-group-item btn active';
    } else {
      return 'list-group-item btn';
    }
  }
}
