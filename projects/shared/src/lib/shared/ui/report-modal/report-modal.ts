import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportRequestDto } from '@api/model/report-request-dto';

export interface ReportModalConfig {
  targetId: number;
  targetType: ReportRequestDto.TargetTypeEnum;
  targetName?: string;
}

interface ReportReason {
  value: ReportRequestDto.ReasonEnum;
  label: string;
  description: string;
  icon: string;
  applicableTo?: ReportRequestDto.TargetTypeEnum[];
}

@Component({
  selector: 'app-report-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-modal.html',
  styleUrls: ['./report-modal.scss']
})
export class ReportModalComponent {
  @Input() visible = false;
  @Input() config: ReportModalConfig | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() reportSubmit = new EventEmitter<ReportRequestDto>();

  selectedReason: ReportRequestDto.ReasonEnum | null = null;
  description = '';
  isSubmitting = false;
  currentStep: 1 | 2 = 1; // Step 1: Select reason, Step 2: Write description

  private readonly allReasons: ReportReason[] = [
    {
      value: ReportRequestDto.ReasonEnum.IncorrectInformation,
      label: 'Incorrect Information',
      description: 'The information provided is inaccurate or misleading',
      icon: 'bi-exclamation-triangle'
    },
    {
      value: ReportRequestDto.ReasonEnum.WrongLocation,
      label: 'Wrong Location',
      description: 'The location or coordinates are incorrect',
      icon: 'bi-geo-alt'
    },
    {
      value: ReportRequestDto.ReasonEnum.Duplicate,
      label: 'Duplicate',
      description: 'This content is a duplicate of another entry',
      icon: 'bi-files'
    },
    {
      value: ReportRequestDto.ReasonEnum.DamagedMark,
      label: 'Damaged Mark',
      description: 'The mark is damaged, unclear, or no longer visible',
      icon: 'bi-shield-x',
      // Only show for MARK and MARK_OCCURRENCE
      applicableTo: [
        ReportRequestDto.TargetTypeEnum.Mark,
        ReportRequestDto.TargetTypeEnum.MarkOccurrence
      ]
    },
    {
      value: ReportRequestDto.ReasonEnum.InappropriateContent,
      label: 'Inappropriate Content',
      description: 'Content is offensive, spam, or violates guidelines',
      icon: 'bi-flag'
    },
    {
      value: ReportRequestDto.ReasonEnum.Other,
      label: 'Other',
      description: 'Another issue not listed above',
      icon: 'bi-chat-dots'
    }
  ];

  get reasons() {
    if (!this.config) return this.allReasons;

    return this.allReasons.filter(reason => {
      if ('applicableTo' in reason && Array.isArray(reason.applicableTo)) {
        return reason.applicableTo.includes(this.config!.targetType);
      }
      return true;
    });
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.reset();
  }

  selectReason(reason: ReportRequestDto.ReasonEnum): void {
    this.selectedReason = reason;
    // Automatically advance to step 2 after selecting reason
    setTimeout(() => {
      this.currentStep = 2;
    }, 300); // Small delay for smooth transition
  }

  goToStep1(): void {
    this.currentStep = 1;
  }

  goToStep2(): void {
    if (this.selectedReason) {
      this.currentStep = 2;
    }
  }

  canSubmit(): boolean {
    return !!(this.selectedReason && this.description.trim().length >= 10);
  }

  submit(): void {
    if (!this.config || !this.selectedReason || !this.canSubmit()) {
      return;
    }

    this.isSubmitting = true;

    const report: ReportRequestDto = {
      targetId: this.config.targetId,
      targetType: this.config.targetType,
      reason: this.selectedReason,
      description: this.description.trim()
    };

    this.reportSubmit.emit(report);
  }

  reset(): void {
    this.selectedReason = null;
    this.description = '';
    this.isSubmitting = false;
    this.currentStep = 1;
  }

  getSelectedReasonLabel(): string {
    if (!this.selectedReason) return '';
    const reason = this.reasons.find(r => r.value === this.selectedReason);
    return reason ? reason.label : '';
  }

  getTargetTypeLabel(): string {
    if (!this.config) return '';

    const labels: Record<ReportRequestDto.TargetTypeEnum, string> = {
      MONUMENT: 'Monument',
      MARK: 'Mark',
      MARK_OCCURRENCE: 'Mark Occurrence',
      GUILD: 'Guild',
      MASON: 'Mason',
      USER: 'User',
      PROPOSAL: 'Proposal'
    };

    return labels[this.config.targetType] || 'Content';
  }
}

