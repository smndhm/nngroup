import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'nng-course-card',
  styleUrl: 'nng-course-card.scss',
  shadow: false,
})
export class NngCourseCard {
  @Prop() course: any;

  @Prop() required: boolean;

  #timeZoneMappings = {
    'America/New_York': 'New York City',
    // Ajoutez d'autres correspondances si nécessaire
  };

  // Fonction pour formater une date en jour de la semaine et mois/jour
  #formatDate = timestamp => {
    const date = new Date(timestamp * 1000);
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
    const monthDayFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' });

    return {
      day: dayFormatter.format(date),
      monthDay: monthDayFormatter.format(date),
    };
  };

  // Fonction pour formater une heure en format 12 heures
  #formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: this.course.location.timezone,
      hour12: true,
    });

    return timeFormatter.format(date);
  };

  render() {
    const formattedDates = this.course.dates.map(([start, end]) => {
      const startDate = this.#formatDate(start);
      const endDate = this.#formatDate(end);
      const startTime = this.#formatTime(start);
      const endTime = this.#formatTime(end);

      return {
        startDate,
        endDate,
        startTime,
        endTime,
      };
    });
    // Construire la chaîne de caractères finale pour les dates
    const days = formattedDates.map(date => date.startDate.day).join(' & ');
    const monthDays = formattedDates.map(date => date.startDate.monthDay).join(' & ');
    const dateResult = `${days}, ${monthDays}`;

    // Construire la chaîne de caractères finale pour les heures
    const firstStartTime = formattedDates[0].startTime;
    const lastEndTime = formattedDates[formattedDates.length - 1].endTime;
    const timeResult = `${firstStartTime} - ${lastEndTime}`;

    return (
      <label class="nng-course-card">
        <div class="nng-course-card__infos">
          <input type="radio" class="nng-course-card__radio" name="plan" value={this.course.id} required={this.required} />
          <span>
            <div class="nng-course-card__info-position">Virtual Course</div>
            <div class="nng-course-card__info-times">
              <div class="nng-course-card__info-dates">{dateResult}</div>
              <div class="nng-course-card__info-hours">{timeResult}</div>
              <div class="nng-course-card__info-timezone">{this.#timeZoneMappings[this.course.location.timezone]} Time</div>
            </div>
            <div class="nng-course-card__info-price">
              <strong>{new Intl.NumberFormat('en', { style: 'currency', currency: this.course.pricing.currency }).format(this.course.pricing.amount)}</strong> Until{' '}
              {this.#formatDate(this.course.pricing.valid_until).monthDay}
            </div>
          </span>
        </div>
        <ul role="list" class="nng-course-card__instructors">
          {this.course.instructors.map((instructor: any) => (
            <li class="nng-course-card__instructor">
              <img src={instructor.portrait_image} alt="" />
              Instructor: {instructor.first_name} {instructor.last_name}
            </li>
          ))}
        </ul>
      </label>
    );
  }
}
