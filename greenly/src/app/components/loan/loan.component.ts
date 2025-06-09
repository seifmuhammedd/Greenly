import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '../../core/services/loan.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnDestroy {

  loanSub!: Subscription;

  // Define the reactive form
  loanForm: FormGroup = this._FormBuilder.group({
    Gender: [null, Validators.required],
    Married: [null, Validators.required],
    Dependents: [null, Validators.required],
    Education: [null, Validators.required],
    Self_Employed: [null, Validators.required],
    ApplicantIncome: [null, Validators.required],
    CoApplicantIncome: [null, Validators.required],
    LoanAmount: [null, Validators.required],
    Loan_Amount_Term: [null, Validators.required],
    Credit_History: [null, Validators.required],
    Property_Area: [null, Validators.required]
  });

  constructor(
    private _FormBuilder: FormBuilder,
    private _LoanService: LoanService,
    private _ToastrService: ToastrService
  ) {}

  private _PLATFORM_ID = inject(PLATFORM_ID);

  onSubmit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem("userToken")) {
        if (this.loanForm.valid) {
          this.showAlert();
        } else {
          this.loanForm.markAllAsTouched();
        }
      } else {
        // 🔔 ONLY TOASTR USED IN THE WHOLE FILE
        this._ToastrService.info('Please log in first', 'Greenly');
      }
    }
  }

  showAlert(): void {
    const swalWithLoader = Swal.mixin({
      icon: 'info',
      title: 'Important Notice',
      html: `
        <ul class="text-start ps-4 mt-3">
          <li>By submitting this loan application, you agree that you will not be able to submit another application for the next 30 days.</li>
          <li>This is an AI evaluation. If accepted, we will contact you as soon as possible.</li>
          <li>We take a 5% commission on approved loans.</li>
        </ul>
        <div class="mt-4 text-center d-none" id="loaderSection">
          <p id="timerText">Processing your request... Please wait <strong>5</strong> seconds</p>
          <div class="spinner-border text-success" role="status"></div>
        </div>
        <div class="d-flex justify-content-center gap-3 mt-4" id="buttonSection">
          <button id="proceedBtn" class="btn btn-success">Proceed</button>
          <button id="cancelBtn" class="btn btn-secondary">Cancel</button>
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    swalWithLoader.fire();

    const proceedBtn = document.getElementById('proceedBtn') as HTMLButtonElement;
    const cancelBtn = document.getElementById('cancelBtn') as HTMLButtonElement;
    const loaderSection = document.getElementById('loaderSection') as HTMLElement;
    const buttonSection = document.getElementById('buttonSection') as HTMLElement;
    const timerText = document.getElementById('timerText');

    let interval: any;

    proceedBtn?.addEventListener('click', () => {
      loaderSection.classList.remove('d-none');
      buttonSection.classList.add('d-none');

      let timeLeft = 5;

      interval = setInterval(() => {
        if (timeLeft > 0 && timerText) {
          timerText.innerHTML = `Processing your request... Please wait <strong>${timeLeft}</strong> seconds`;
          timeLeft--;
        } else {
          clearInterval(interval);
          Swal.close(); // Close alert
          this.onSubmitLoan(); // Submit form after delay
        }
      }, 1000);
    });

    cancelBtn?.addEventListener('click', () => {
      Swal.close(); // Just close modal
    });
  }

  onSubmitLoan(): void {
    if (this.loanForm.valid) {
      const payload = { data: this.loanForm.value };

      this.loanSub = this._LoanService.submitLoanApplication(payload).subscribe({
        next: (res) => {
          if (res.loan_status === 'Approved') {
            Swal.fire({
              icon: 'success',
              title: 'Congratulations!',
              text: 'Your loan has been approved! We will contact you as soon as possible.',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Application Rejected',
              text: 'Unfortunately, your loan was not approved. You can try again after 30 days.',
              confirmButtonText: 'OK'
            });
          }
        },
        error: (err) => {
          Swal.close(); // Close loading alert

          // 🔍 Check for specific backend restriction
          if (err?.error?.message?.includes('once per month')) {
            Swal.fire({
              icon: 'error',
              title: 'Submission Not Allowed',
              text: 'You can only apply for a loan once every 30 days.',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong',
              text: 'Failed to submit loan. Please try again later.',
              confirmButtonText: 'OK'
            });
          }

          console.error('Submission failed:', err);
        }
      });
    } else {
      this.loanForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.loanSub?.unsubscribe();
  }
}