import { Component, OnInit } from '@angular/core';
import { TagsHttpService } from '../_services/tags-http.service';
import { TagDto } from '../_models/tags';
import { SearchService } from '../_services/search.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: TagDto[];

  constructor(private tagsHttpService: TagsHttpService,
              public searchService: SearchService) {
  }

  ngOnInit() {
    this.tagsHttpService.readAll()
      .subscribe(tags => this.tags = tags);
  }

}
