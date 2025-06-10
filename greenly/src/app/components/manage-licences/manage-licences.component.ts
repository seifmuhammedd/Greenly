import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../../core/services/licence.service';
import { ILicence } from '../../core/interfeces/i-licence';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-licences',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './manage-licences.component.html',
  styleUrls: ['./manage-licences.component.css']
})
export class ManageLicencesComponent implements OnInit {

  constructor(
    private _LicenceService: LicenceService,
    private _ToastrService: ToastrService
  ) {}

  licencesData!: ILicence[];

  ngOnInit(): void {
    this.getAllRequests(); // Load all licences on init
  }

  getAllRequests(): void {
    this._LicenceService.getAllRequests().subscribe({
      next: (res) => {
        this.licencesData = res;
      },
      error: (err) => {
        console.error('Error fetching all licences:', err);
        this._ToastrService.error('Failed to load all licenses', 'Error');
      }
    });
  }

  filterLicencesByStatus(status: string): void {
    this._LicenceService.getLicencseByStatus(status).subscribe({
      next: (res) => {
        this.licencesData = res;
      },
      error: (err) => {
        console.error(`Error fetching ${status} licenses:`, err);
        this._ToastrService.error(`Failed to load ${status} licenses`, 'Error');
      }
    });
  }
}