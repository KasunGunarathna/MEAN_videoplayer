import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs:['videos']
})
export class VideoListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
