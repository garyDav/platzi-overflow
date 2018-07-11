import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
  providers: [QuestionService]
})

export class QuestionDetailComponent implements OnInit, OnDestroy {
  // question: Question = new Question(
  //   'Esta es una nueva pregunta sobre Android',
  //   'Miren, tengo una duda con una aplicación que estoy escribiendo para Android...',
  //   new Date,
  //   'devicon-android-plain'
  // );
  // constructor() {
  //   console.log(this.question);
  // }
  question?: Question;
  loading = true;
  sub: any;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.questionService
    //       .getQuestion(params.id)
    //       .then((question: Question) => {
    //         this.loading = false;
    //         this.question = question;
    //         // console.log(this.question, this.loading);
    //       });
    // });
    this.getQuestion();
  }
  getQuestion(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.questionService.getQuestion(id)
      .subscribe(question => {
        this.question = question;
        this.loading = false;
        // console.log(this.question, this.loading);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
