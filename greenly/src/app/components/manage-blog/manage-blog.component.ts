import { Component, inject } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { IBlog } from '../../core/interfeces/i-blog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-blog',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './manage-blog.component.html',
  styleUrl: './manage-blog.component.css',
})
export class ManageBlogComponent {
  private readonly _BlogService = inject(BlogService);
  private readonly _ToastrService = inject(ToastrService);

  blogData!: IBlog[];

  ngOnInit(): void {
    this._BlogService.getAllPosts().subscribe({
      next: (res) => {
        this.blogData = res.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  deletePost(postID: string): void {
    this._BlogService.deletePost(postID).subscribe({
      next: (res) => {
        console.log(res)
        this.blogData = res.data
        this._ToastrService.success( res.message, "Greenly")
      },
      error: (err) => {
        this._ToastrService.error(err.error.message);
      },
    });
  }
}
