import { Component, OnInit } from '@angular/core';
import { TagsHttpService } from '../_services/tags-http.service';
import { TagDto } from '../_models/tags';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: TagDto[];

  constructor(private tagsHttpService: TagsHttpService) { }

  ngOnInit() {
    this.tagsHttpService.readAll()
      .subscribe(tags => this.tags = tags);
  }

}
