import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../core/services/loan.service';
import { NgClass } from '@angular/common';
import { ILoans } from '../../core/interfeces/i-loans';

@Component({
  selector: 'app-manage-loans',
  standalone: true,
  imports: [NgClass],
  templateUrl: './manage-loans.component.html',
  styleUrl: './manage-loans.component.css'
})
export class ManageLoansComponent implements OnInit {

  constructor (private _LoanService: LoanService) {}

  ngOnInit(): void {
    this.getAllLoans()
  }

  loansData!: ILoans[]

  getAllLoans():void{
    this._LoanService.getAllLoans().subscribe({
      next: (res)=>{
        this.loansData = res
        console.log(res)
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

}
