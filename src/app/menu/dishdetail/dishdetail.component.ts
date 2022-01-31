import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { Comment } from './shared/comment';
import { DishService } from 'src/app/Service/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],


})


export class DishdetailComponent implements OnInit {
  @Input()

  dish!: Dish;
  dishcopy!: Dish;

  dishIds!: number[];
  prev!: number;
  next!: number;

  errMess!: string;
  visibility = 'shown';

  commentForm!: FormGroup;
  comment!: Comment;

  formErrors = {
    'rating': 5,
    'comment': '',
    'author': '',

  };

  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
    },
    'comment': {
      'required': 'Comment is required.',
    },
  };
  commentFormDirective: any;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder,

  ) {
    this.createForm();
  }


  ngOnInit() {
    this.dishService.getDishIds().subscribe(
      dishIds => {
        this.dishIds = dishIds;
      },
      errmess => this.errMess = <any>errmess
    );

    this.route.params.pipe(
      switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDish(params['id']);
      }))
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        (        errmess: any) => this.errMess = <any>errmess
        );

  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);

    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack() : void {
    this.location.back();
  }



  createForm() {
    this.commentForm = this.fb.group({
      rating: [5, [Validators.required,] ],
      comment: ['', [Validators.required] ],
      author: ['', [Validators.required, Validators.minLength(2)] ],
    });

    this.commentForm.valueChanges
       .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.data= new Date().toISOString();

    this.dishcopy.comments.push(this.comment);

    this.dishService.putDish(this.dishcopy).subscribe(
      (      dish: Dish) => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      (      errmess: any) => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = <any>errmess
      }
    );

    this.commentFormDirective.resetForm();

    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
    });
  }

}
