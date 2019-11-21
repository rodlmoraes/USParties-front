import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'usparties-front';
  paramsLength;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPageData();
  }

  ngOnChanges() {
    this.getPageData();
  }

  getPageData() {}
}
