import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ErrorRequestResult } from '@ngneat/elf-requests/src/lib/requests-result';
import { Observable } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, ProgressSpinnerModule, SkeletonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponentComponent implements OnInit {
    @Input({ required: true }) loadingObservable$!: Observable<boolean>;
    @Input({ required: true }) errorObservable$!: Observable<ErrorRequestResult<any>>;

    ngOnInit(): void {
    }
}
