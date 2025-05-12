import { Component, Prop, h } from '@stencil/core';

/**
 * Course card component that displays course details including dates, instructors, and pricing
 */
@Component({
  tag: 'nng-course-card',
  styleUrl: 'nng-course-card.scss',
  shadow: false,
})
export class NngCourseCard {
  /** Course information including dates, instructors, location and pricing */
  @Prop() course: any;

  /** Whether this course selection is required */
  @Prop() required: boolean;

  /** Mapping of timezone IDs to display names */
  #timeZoneMappings = {
    'America/New_York': 'New York City',
    // Ajoutez d'autres correspondances si nécessaire
  };

  /**
   * Formats a Unix timestamp into day of week and month/day format
   * @param timestamp - Unix timestamp in seconds
   * @returns Object containing formatted day and month/day strings
   */
  #formatDate = timestamp => {
    const date = new Date(timestamp * 1000);
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
    const monthDayFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' });

    return {
      day: dayFormatter.format(date),
      monthDay: monthDayFormatter.format(date),
    };
  };

  /**
   * Formats a Unix timestamp into 12-hour time format with AM/PM
   * @param timestamp - Unix timestamp in seconds
   * @returns Formatted time string
   */
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
