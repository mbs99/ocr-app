import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { FileEvent } from '../pdfpage/file.event';
import { PdfpageComponent } from '../pdfpage/pdfpage.component';
import { PdfEvent } from './pdf.event';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pdfdoc',
  templateUrl: './pdfdoc.component.html',
  styleUrls: ['./pdfdoc.component.css'],
})
export class PdfdocComponent implements OnInit, OnDestroy {
  @ViewChild('pages', { read: ViewContainerRef }) target!: ViewContainerRef;

  pages: ComponentRef<PdfpageComponent>[] = [];

  subscriptions: Subscription[] = [];

  @Output() createPdf = new EventEmitter<PdfEvent>();

  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({});
  isLinear = true;

  @ViewChild('progress') progressBar!: MatProgressBar;

  @ViewChild('stepper') stepper!: MatStepper;

  @Input('showProgress') showProgress = false;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {}

  onAddPage() {
    let page = this.target?.createComponent(PdfpageComponent);

    this.subscriptions.push(
      page.instance.deleted.subscribe((page) => this.onDeletePage(page))
    );

    this.subscriptions.push(
      page.instance.fileSelected.subscribe((event) =>
        this.onFileSelected(event)
      )
    );

    this.pages.push(page);
  }

  onDeletePage(page: PdfpageComponent) {
    const pageToRemove = this.pages.filter(
      (current) => current.instance == page
    )[0];

    const pos = this.target.indexOf(pageToRemove.hostView);
    if (-1 != pos) {
      this.target.remove(pos);
    }

    this.pages = this.pages.filter((current) => current != pageToRemove);
  }

  onCreatePdf() {
    const files = this.pages
      .map((page) => page.instance!)
      .map((component) => component.file!);

    this.showProgress = true;

    this.createPdf.emit({
      title: '',
      tags: [],
      files: files,
    });
  }

  onFileSelected(event: FileEvent): void {}

  onReset() {
    this.stepper.reset();

    this.showProgress = false;
  }
}
