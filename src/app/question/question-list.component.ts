import { Component, OnInit, Input } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';

// const q = new Question(
//   '¿Cómo reutilizo un componente en Android?',
//   'Miren, esta es mi pregunta...',
//   new Date(),
//   'none'
//   // 'devicon-android-plain'
// );

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styles: [`
    i {
      font-size: 48px;
    }
    i.help {
      width: 48px !important;
      height: 48px !important;
      padding: 0 !important;
      font-size: 48px !important;
    }
  `]
})
export class QuestionListComponent implements OnInit {
  // questions: Question[] = new Array(10).fill(q);
  constructor(private questionService: QuestionService) {}

  @Input() sort = '-createdAt';
  questions: Question[];
  loading = true;

  ngOnInit() {
    // this.questionService
    //     .getQuestions()
    //     .then((questions: Question[]) => {
    //       this.loading = false;
    //       this.questions = questions;
    //     });
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions(this.sort)
        .subscribe(questions => {
          this.questions = questions;
          this.loading = false;
        });
  }
}
