import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { IBlog } from '../../core/interfeces/i-blog';
import { DatePipe, isPlatformBrowser, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  blogData !: IBlog[]

  ngOnInit(): void {
    this._BlogService.getAllPosts().subscribe({
      next: (res)=>{
        console.log(res.data)
        this.blogData = res.data
        console.log(this.blogData)
      },
      error: (err)=>{
        console.log(err.error.message)
      }
    })
  }

  createPostForm : FormGroup = this._FormBuilder.group({
    content: [null, [Validators.required, Validators.max(5000)]]
  })

  createPost():void{
    if(this.createPostForm.valid){
      if(isPlatformBrowser(this._PLATFORM_ID)){
        if(localStorage.getItem("userToken")){
          this._BlogService.createPost(this.createPostForm.value).subscribe({
            next: ()=>{window.location.reload();},
            error: (err)=>{
              console.log(err.message)
            }
          })
        }
      }
    }else{
      this.createPostForm.markAllAsTouched()
    }
  }
}
