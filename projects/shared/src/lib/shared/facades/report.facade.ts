import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { ReportRequestDto } from '@api/model/report-request-dto';
import { ReportModalConfig } from '@shared/ui/report-modal/report-modal';
import { environment } from '@env/environment';
import {PublicReportService} from '@core/services/report/public-report.service';

@Injectable({ providedIn: 'root' })
export class ReportFacade {

  visible = false;
  config: ReportModalConfig | null = null;
  fieldErrors: Record<string, string> = {};

  constructor(
    private reportService: PublicReportService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  open(config: ReportModalConfig): boolean {
    if (!this.authService.getAccessToken()) {
      window.location.href = `${environment.authUrl}/login`;
      return false;
    }

    this.config = config;
    this.fieldErrors = {};
    this.visible = true;
    return true;
  }

  submit(report: ReportRequestDto, onSuccess?: () => void): void {
    this.reportService.createReport(report).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Report submitted successfully. Thank you for helping improve StoneMark!'
        );
        this.close();
        onSuccess?.();
      },
      error: (err) => {
        if (err?.status === 400 && typeof err.error === 'object') {
          this.fieldErrors = err.error;
          return;
        }

        this.notificationService.showError(
          'Failed to submit report. Please try again.'
        );
        this.close();
      }
    });
  }

  close(): void {
    this.visible = false;
    this.config = null;
    this.fieldErrors = {};
  }
}
