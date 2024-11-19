import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { WeatherComponent } from '../../components/weather/weather.component';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { AddToCartComponent } from '../../components/add-to-cart/add-to-cart.component';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';
import { GoToDashboardComponent } from '../../components/go-to-dashboard/go-to-dashboard.component';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../models/content';



@Component({
  selector: 'app-info-service',
  standalone: true,
  imports: [CommonModule, WeatherComponent, AddToCartComponent, GoogleMapsComponent, GoToDashboardComponent],
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

  cityName: string = '';

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
    private contentService: ContentService
  ) { }


  ngOnInit(): void {
    this.getDaysFromDate(4, 2024)
    this.getDaysFromDateExit(4, 2024)

    const contentId = this.route.snapshot.paramMap.get('contentId');

    if (contentId) {
      this.fetchContent(contentId);
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



}


