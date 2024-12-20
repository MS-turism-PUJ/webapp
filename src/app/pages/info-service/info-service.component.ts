import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { WeatherComponent } from '../../components/weather/weather.component';
import { AddToCartComponent } from '../../components/add-to-cart/add-to-cart.component';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';
import { GoToDashboardComponent } from '../../components/go-to-dashboard/go-to-dashboard.component';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content';
import { RatingService } from '../../services/rating.service';
import { Rating } from '../../models/rating';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question';
import { StarsComponent } from '../../components/stars/stars.component';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role';



@Component({
  selector: 'app-info-service',
  standalone: true,
  imports: [CommonModule, WeatherComponent, AddToCartComponent, GoogleMapsComponent, GoToDashboardComponent, StarsComponent],
  templateUrl: './info-service.component.html',
  styleUrl: './info-service.component.css'
})
export class InfoServiceComponent {
  content: Content = {
    contentId: '',
    name: '',
    description: '',
    user: {
      userId: 0,
      name: '',
      email: '',
      username: ''
    },
    photo: ''
  };
  photo: string = '';

  myRating: Rating = {
    rating: 0,
    comment: ''
  };

  contentId: string = '';

  questions: Question[] = [];

  ratings: Rating[] = [];

  cityName: string = '';

  role: Role | null = null;

  showRatingsPopup: boolean = false;

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  selectedDay: any = null;
  selectedDayExit: any = null;
  monthSelect: any[] | undefined;
  dateSelect: any;
  dateValue: any;
  monthSelectExit: any[] | undefined;
  dateSelectExit: any;
  dateValueExit: any;

  reviewsCountReceived: number = 0;
  averageRatingReceived: number = 0;
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private ratingService: RatingService,
    private questionService: QuestionService,
    private authService: AuthService
  ) {}


  async ngOnInit(): Promise<void> {
    this.getDaysFromDate(4, 2024)
    this.getDaysFromDateExit(4, 2024)

    this.role = this.authService.getRole();

    this.contentId = this.route.snapshot.paramMap.get('contentId') || '';

    if (this.contentId) {
      this.contentService.getPhoto(this.contentId).then((photo) => {
        this.photo = photo;
      });
      await this.fetchContent(this.contentId);
      this.ratingService.getAverageRating().subscribe((averageRating) => {
        this.averageRatingReceived = averageRating;
      });
      this.ratingService.syncAverageRating(this.content.service?.serviceId || '');
      this.ratingService.getMyRating(this.content.service?.serviceId || '').then((myRating) => {
        this.myRating = myRating;
      });
      this.ratingService.getQuantityRating().subscribe((quantityRating) => {
        this.reviewsCountReceived = quantityRating;
      });
      this.ratingService.syncQuantityRating(this.content.service?.serviceId || '');
      this.questionService.getQuestions(this.contentId || '').then((questions) => {
        this.questions = questions;
      });
      this.ratingService.getRatings().subscribe((ratings) => {
        this.ratings = ratings;
      });
      this.ratingService.syncRatings(this.content.service?.serviceId || '');

    } else {
      console.error('No se encontró el ID del contenido en la URL.');
    }
  }

  async fetchContent(contentId: string): Promise<void> {
    try {
      this.content = await this.contentService.getContentById(contentId) || this.content;
      if (this.content?.service?.city) {
        this.cityName = this.content.service.city;
      } else {
        console.warn('El contenido no tiene una ciudad asociada.');
      }
    } catch (error) {
      console.error('Error al obtener el contenido:', error);
    }
  }

  onAverageRatingChange(newAverage: number) {
    this.averageRatingReceived = newAverage;
  }
  onReviewsCountChange(newCount: number) {
    this.reviewsCountReceived = newCount;
  }
  getDaysFromDate(month: number, year: number) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }
  getDaysFromDateExit(month: number, year: number) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelectExit = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelectExit = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: any) {
    this.selectedDay = day;
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
  }
  changeMonthExit(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelectExit.clone().subtract(1, "month");
      this.getDaysFromDateExit(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelectExit.clone().add(1, "month");
      this.getDaysFromDateExit(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDayExit(day: any) {
    this.selectedDayExit = day;
    const monthYear = this.dateSelectExit.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValueExit = objectDate;
  }

  setChecked(value: number) {
    if (!this.content.service) {
      return;
    }
    this.myRating = new Rating(value, this.myRating.comment);

    this.ratingService.rateService(this.content.service?.serviceId, this.myRating);

    this.ratingService.syncQuantityRating(this.content.service?.serviceId || '');
  }

  async onChangeComment() {
    const target = document.getElementById('comment') as HTMLInputElement;

    if (!this.content.service) {
      return;
    }

    this.myRating = new Rating(this.myRating.rating, target.value);

    this.ratingService.rateService(this.content.service?.serviceId, this.myRating);
  }

  publishQuestion() {
    if (!this.content.service) {
      return;
    }

    const input = document.getElementById('question') as HTMLInputElement;

    const question = new Question(input.value);

    this.questionService.createQuestion(this.contentId, question).then(() => {
      this.questions.push(question);
    });
  }

  showRatings() {
    this.showRatingsPopup = true;
  }

}


