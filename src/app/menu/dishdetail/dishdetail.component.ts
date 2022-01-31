import {Component , Inject , OnInit} from '@angular/core';
import {DishService} from 'src/app/Service/dish.service';
import { Injectable } from '@angular/core';
import {ActivatedRoute , Params} from '@angular/router';
import {Location} from '@angular/common';
import {Dish} from '../shared/dish';
import {map, switchMap} from 'rxjs/operators';

import {FormBuilder , FormGroup , Validators} from '@angular/forms';
import {Comment} from '../shared/comment';

@Injectable()
export class DataService {

 }
@Component({
  selector: 'app-dishdetail' ,
  templateUrl: './dishdetail.component.html' ,
  styleUrls: ['./dishdetail.component.scss'] ,

})
export class DishdetailComponent implements OnInit {

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
    author: '' ,
    rating: 5 ,
    comment: ''
  };
  validationMessages = {
    'author': {
      'required': 'Author is required.' ,
      'minlength': 'Author must be at least 2 characters long.'
    } ,
    'comment': {
      'required': 'comment is required.' ,
      'minlength': 'comment must be at least 2 characters long.'
    } ,
  };


  constructor(private dishservice: DishService ,
              private route: ActivatedRoute ,
              private location: Location ,
              private fb: FormBuilder ,
              ) {
    this.createForm();

  }

  ngOnInit(): void{
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.dishservice.getDish(params['id']);
    }))
      .subscribe(dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        } ,
        (        errmess: any) => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  private createForm(): void {
    this.commentForm = this.fb.group({
      author: ['' , [Validators.required , Validators.minLength(2)]] ,
      rating: 5 ,

      comment: ['' , [Validators.required , Validators.minLength(2)]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data) ,
        errmess => this.errMess = <any>errmess);

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
    map((dish: Dish) => {

          this.dish = dish;
          this.dishcopy = dish;
        } ,
        (        errmess: any) => {
          this.dish =
          this.dishcopy =
          this.errMess = <any>errmess;
        });
    this.commentForm.reset({
      author: '' ,
      rating: 5 ,
      comment: ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)

        const control = form.get(field);
        if (control && control.dirty && !control.valid) {

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {

            }
          }
        }
      }
    }
  }
}
