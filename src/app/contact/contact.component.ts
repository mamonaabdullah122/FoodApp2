import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../menu/shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback!: Feedback;
  contactType = ContactType;
  @ViewChild('fform')
  feedbackFormDirective!:any;

  formErrors = {
    firstname: '',
    lastname: '',
    phone: '',
    email: ''
  };

  validationMessages = {
    firstname: {
      required: 'First name is required.',
      minlength: 'First name must be at least 2 characters long.',
      maxlength: 'Max nb of chars are 25.'
    },
    lastname: {
      required: 'Last name is required.',
      minlength: 'Last name must be at least 2 characters long.',
      maxlength: 'Max nb of chars are 25.'
    },
    phone: {
      required: 'Phone number is required.',
      pattern: 'Phone number must contain only numbers.'
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.'
    }
  };

  constructor(
    private formBuilder: FormBuilder
    // private formGroup: FormGroup,
    // private validator: Validator
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      phone: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }

    const form = this.feedbackForm;


            }


  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
}
