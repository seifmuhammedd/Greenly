import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { IBlog } from '../../core/interfeces/i-blog';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  private readonly _BlogService = inject(BlogService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _ToastrService = inject(ToastrService)

  blogData !: IBlog[]
  activeReplyForm: string | null = null;

  ngOnInit(): void {
    this.getAllPosts()
  }

  createPostForm : FormGroup = this._FormBuilder.group({
    content: [null, [Validators.required, Validators.max(5000)]]
  })

  addReplyForm : FormGroup = this._FormBuilder.group({
    content: [null, [Validators.required, Validators.max(5000)]]
  })

  toggleReplyForm(postId: string): void {
    if (this.activeReplyForm === postId) {
      this.activeReplyForm = null;
    } else {
      this.activeReplyForm = postId;
      this.addReplyForm.reset();
    }
  }

  getAllPosts(){
    this._BlogService.getAllPosts().subscribe({
      next: (res)=>{
        console.log(res)
        this.blogData = res.data
      },
      error: (err)=>{
        console.log(err.error.message)
      }
    })
  }

  createPost():void{
    if(this.createPostForm.valid){
      if(isPlatformBrowser(this._PLATFORM_ID)){
        if(localStorage.getItem("userToken")){
          this._BlogService.createPost(this.createPostForm.value).subscribe({
            next: (res)=>{
              this.createPostForm.reset()
              this.getAllPosts()
            },
            error: (err)=>{
              console.log(err.message)
            }
          })
        }else{
          this._ToastrService.error("You must be logged in to create a post", "Error")
        }
      }
    }else{
      this.createPostForm.markAllAsTouched()
    }
  }

  addReply(postID: string):void{
    if(this.addReplyForm.valid){
      this._BlogService.addReply(postID, this.addReplyForm.value).subscribe({
        next: (res)=>{
          console.log(res)
          this._ToastrService.success("Reply added successfully", "Greenly", {timeOut: 1000})
          this.addReplyForm.reset()
          this.activeReplyForm = null;
          this.getAllPosts()
        },
        error: (err)=>{
          console.log(err)
        }
      })
    }
  }

  // 🔐 Check ownership safely using isPlatformBrowser
  isOwner(authorId: string): boolean {
    if (!isPlatformBrowser(this._PLATFORM_ID)) return false;

    const userId = localStorage.getItem('userId');
    return userId === authorId;
  }

  deletePost(postID: string): void {
  const isConfirmed = confirm('Are you sure you want to delete this post?');

  if (isConfirmed) {
    this._BlogService.deletePost(postID).subscribe({
      next: (res) => {
        this.blogData = res.data;

        this._ToastrService.success('Post deleted successfully', 'Success');
      },
      error: (err) => {
        console.error(err);

        this._ToastrService.error('Failed to delete post', 'Error');
      }
    });
  } else {
    this._ToastrService.info('Deletion canceled', 'Info');
  }
}

deleteReply(post_id: string, replyId: string): void {
  const isConfirmed = confirm('Are you sure you want to delete this reply?');

  if (isConfirmed) {
    this._BlogService.deleteReply(post_id, replyId).subscribe({
      next: () => {
        this.getAllPosts();
        this._ToastrService.success('Reply deleted successfully', 'Success');
      },
      error: (err) => {
        console.error(err);
        this._ToastrService.error('Failed to delete reply', 'Error');
      }
    });
  } else {
    this._ToastrService.info('Deletion canceled', 'Info');
  }
}
}