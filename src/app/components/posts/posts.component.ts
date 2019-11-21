import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { CreatePostComponent } from './modal/create-post.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './posts.service';

interface Post {
  id: number;
  amount: number;
  price: number;
  partyEdition;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  idSalesman: number;
  dataSource: MatTableDataSource<object>;
  displayedColumns = ['partyEdition', 'amount', 'price', 'action'];

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private postsService: PostsService) { }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    this.route.params.subscribe(params => {
      this.idSalesman = params.idSalesman;
      this.postsService.getSalesmanPosts(this.idSalesman).subscribe((posts: Post[]) => {
        posts = posts.map(
          ({partyEdition, ...post}) =>
          ({...post, partyEdition: partyEdition.name})
        );

        this.dataSource = new MatTableDataSource(posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newPost(): void {
    const modalRef = this.dialog.open(CreatePostComponent, { data: {
        create: true,
        idSalesman: this.idSalesman
      }
    });
    modalRef.afterClosed().subscribe(() => this.getPageData());
  }

  details(post): void {
      const modalRef = this.dialog.open(CreatePostComponent, {
        data: {
          idPost: post.id,
          partyEdition: post.partyEdition,
          amount: post.amount,
          price: post.price,
          idSalesman: this.idSalesman,
        },
      });
      modalRef.afterClosed().subscribe(() => this.getPageData());
  }

  delete(post): void {
    this.postsService.delete(post.id).subscribe(() => {
      this.getPageData();
    });
  }
}
